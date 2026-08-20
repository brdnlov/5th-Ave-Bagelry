"use client";

import { useState } from "react";
import Image from "next/image";
import {
    REVIEWS,
    REVIEW_SUMMARY,
    SOURCE_META,
    type Review,
    type ReviewSource,
} from "../_data/reviews";

/* How many cards show before the toggle. Three fills one row at lg and
   keeps the section from swamping the page. */
const INITIAL_VISIBLE = 3;

/* Stars are decoration; the rating is announced as text alongside so a
   screen reader gets the number rather than five identical shapes. */
function Stars({ rating }: { rating: number }) {
    return (
        <span className="inline-flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <svg
                    key={i}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className={`h-4 w-4 ${i < Math.round(rating) ? "fill-brand-red" : "fill-brand-charcoal/15"}`}
                >
                    <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z" />
                </svg>
            ))}
            <span className="sr-only">{rating} out of 5</span>
        </span>
    );
}

/* The platform's official logo once the asset exists, its name as plain
   text until then. Never a redrawn approximation — see the note in
   _data/reviews.ts. */
function SourceMark({ source }: { source: ReviewSource }) {
    const meta = SOURCE_META[source];
    if (!meta.logo) return <span>{meta.label}</span>;
    return (
        <Image
            src={meta.logo}
            alt={meta.logoAlt}
            width={meta.logoWidth}
            height={meta.logoHeight}
            /* Height-constrained so each brand's own proportions survive
               regardless of the file's intrinsic size. */
            className="inline-block w-auto"
            style={{ height: meta.logoHeight }}
        />
    );
}

/* Deterministic at build time — toLocaleDateString would vary with the
   builder's locale, which a static page should not inherit.

   Handles both precisions on purpose. Yelp shows an exact day; Google only
   shows "2 months ago", so those entries are recorded as YYYY-MM. Assuming
   YYYY-MM-DD printed "undefined Jul 2026" for all three Google reviews. */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(iso: string) {
    const [year, month, day] = iso.split("-").map(Number);
    if (!month) return String(year);
    return day ? `${day} ${MONTHS[month - 1]} ${year}` : `${MONTHS[month - 1]} ${year}`;
}

function ReviewCard({ review, hidden }: { review: Review; hidden: boolean }) {
    return (
        <li
            /* `hidden` rather than not rendering: the text stays in the DOM
               for crawlers, and display:none already drops it out of the tab
               order and the accessibility tree. */
            hidden={hidden}
            className="flex h-full flex-col rounded-2xl bg-brand-charcoal/5 p-6 ring-1 ring-brand-charcoal/10 ring-inset"
        >
            <Stars rating={review.rating} />

            {/* blockquote/cite, not a styled <p> — these are someone else's
                words and the markup should say so. */}
            {/* line-clamp hides lines, it does not alter the text: the full
                quote stays in the DOM and the source link below reaches the
                original. Without it the longest review here (1,986 characters
                against 41 for the shortest) stretches its whole grid row and
                leaves its neighbours mostly whitespace. */}
            <blockquote
                className="mt-4 line-clamp-8 flex-1 text-brand-brown"
                cite={review.url}
            >
                {review.quote}
            </blockquote>

            <footer className="mt-5 text-sm">
                <cite className="font-display text-base text-brand-charcoal not-italic">
                    {review.author}
                </cite>
                {/* /80 not /70: the card's charcoal/5 tint drops muted text to
                    4.52:1, clearing AA by 0.02. Not a margin worth keeping. */}
                <span className="mt-1 flex flex-wrap items-center gap-1.5 text-brand-brown/80">
                    <a
                        href={review.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        /* py-3 -my-3 lifts this to a 44px target without
                           moving the line. Safe here specifically: nothing
                           adjacent in the footer is a link, so the expanded
                           box cannot overlap another one. The credit links
                           in the section footer below deliberately do NOT
                           get this — stacked, their padded boxes would
                           overlap each other, and both destinations are
                           already reachable at full size from the summary
                           row at the top. */
                        className="inline-flex items-center gap-1.5 py-3 -my-3 underline decoration-brand-red/40 underline-offset-4 hover:text-brand-red hover:decoration-brand-red"
                    >
                        <span>Reviewed on</span>
                        <SourceMark source={review.source} />
                    </a>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={review.date}>{formatDate(review.date)}</time>
                </span>
            </footer>
        </li>
    );
}

export default function Reviews() {
    const [showAll, setShowAll] = useState(false);

    /* Nothing to show, nothing to render. The guard is what keeps invented
       testimonials off the page — there is no placeholder copy in this
       file to forget to remove. Ratings alone are enough to render: an
       aggregate score is a checkable fact, unlike a quote. */
    if (REVIEWS.length === 0 && REVIEW_SUMMARY.length === 0) return null;

    const hasQuotes = REVIEWS.length > 0;
    const isTruncatable = REVIEWS.length > INITIAL_VISIBLE;
    const sourcesUsed = [
        ...new Set(
            hasQuotes
                ? REVIEWS.map((r) => r.source)
                : REVIEW_SUMMARY.map((r) => r.source),
        ),
    ];

    return (
        <section
            id="reviews"
            className="scroll-mt-20 bg-brand-cream px-4 py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-6xl">
                <div className="text-center">
                    <p className="font-display text-base text-brand-red sm:text-lg">
                        From The Neighborhood
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-brand-charcoal sm:text-4xl lg:text-5xl">
                        What People Say
                    </h2>
                </div>

                {REVIEW_SUMMARY.length > 0 && (
                    <ul
                        role="list"
                        className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
                    >
                        {REVIEW_SUMMARY.map((summary) => (
                            <li key={summary.source}>
                                <a
                                    href={summary.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 flex-wrap items-center gap-2 text-sm text-brand-brown hover:text-brand-red"
                                >
                                    <Stars rating={summary.rating} />
                                    <span className="inline-flex items-center gap-1.5">
                                        {/* toFixed(1) or 4.0 renders as "4", which reads like a
                                            different score than the one on Yelp. */}
                                        <span>{summary.rating.toFixed(1)} on</span>
                                        <SourceMark source={summary.source} />
                                        <span className="text-brand-brown/80">
                                            ({summary.count} reviews)
                                        </span>
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}

                {hasQuotes && (
                    <>
                        <ul
                            id="review-list"
                            role="list"
                            className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {REVIEWS.map((review, index) => (
                                <ReviewCard
                                    key={`${review.source}-${review.author}-${review.date}`}
                                    review={review}
                                    hidden={!showAll && index >= INITIAL_VISIBLE}
                                />
                            ))}
                        </ul>

                        {isTruncatable && (
                            <div className="mt-8 text-center">
                                <button
                                    type="button"
                                    onClick={() => setShowAll((open) => !open)}
                                    aria-expanded={showAll}
                                    aria-controls="review-list"
                                    className="inline-flex min-h-12 items-center rounded-full bg-brand-charcoal/5 px-6 py-3 text-sm text-brand-brown transition-colors hover:bg-brand-red hover:text-brand-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                                >
                                    {showAll
                                        ? "Show fewer reviews"
                                        : `See all ${REVIEWS.length} reviews`}
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Platform credit, stated once for the section. Both brands
                    ask for a link back; this is that link. The wording changes
                    with what is actually on the page — claiming quotes when
                    only ratings are shown would be inaccurate. */}
                <p className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-brand-brown/80">
                    <span>{hasQuotes ? "Quoted as posted on" : "Ratings from"}</span>
                    {sourcesUsed.map((source, i) => (
                        <span key={source} className="inline-flex items-center gap-2">
                            <a
                                href={SOURCE_META[source].profileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center underline decoration-brand-red/40 underline-offset-4 hover:text-brand-red hover:decoration-brand-red"
                            >
                                <SourceMark source={source} />
                            </a>
                            {i < sourcesUsed.length - 1 && <span>and</span>}
                        </span>
                    ))}
                    {REVIEW_SUMMARY.length > 0 && (
                        <span className="w-full text-brand-brown/80">
                            Ratings last checked{" "}
                            <time dateTime={REVIEW_SUMMARY[0].checkedOn}>
                                {formatDate(REVIEW_SUMMARY[0].checkedOn)}
                            </time>
                            .
                        </span>
                    )}
                </p>
            </div>
        </section>
    );
}
