"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ORDER_OPTIONS } from "../_data/order";


export default function Order() {
    /* Which option has revealed its link. Mouse users get it on hover;
       touch and keyboard users toggle it by activating the option. */
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    /* Tapping anywhere outside the panel dismisses the reveal. Touch has no
       pointerleave to close it the way a mouse does, so without this a
       revealed option would stay open until the user tapped it again.
       Escape does the same for keyboard users. Listeners are only attached
       while something is actually open. */
    useEffect(() => {
        if (openIndex === null) return;

        const handlePointerDown = (event: PointerEvent) => {
            if (!panelRef.current?.contains(event.target as Node)) setOpenIndex(null);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpenIndex(null);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openIndex]);

    return (
        <section id="order" className="scroll-mt-20 bg-brand-cream px-4 py-16 sm:py-20 lg:py-24">
            {/* max-w-6xl matches the Hero so both sections share the same
                content edges down the page. */}
            <div className="mx-auto max-w-6xl text-center">
                <p className="font-display text-base text-brand-red sm:text-lg">Quick &amp; Easy Ordering</p>
                <h2 className="mt-2 text-3xl text-brand-charcoal sm:text-4xl lg:text-5xl">Order Your Way</h2>

                {/* One uniform panel. The three options are equal grid columns
                    inside it, separated by hairlines rather than being their own
                    cards. overflow-hidden keeps the dividers and the hover tint
                    inside the rounded corners. */}
                <div ref={panelRef} className="mt-10 overflow-hidden rounded-[2rem] bg-brand-brown bg-radial-[at_50%_0%] from-brand-tan/15 to-transparent to-70% ring-1 ring-inset ring-brand-tan/20 sm:mt-12">
                    <div className="grid divide-y divide-brand-cream/15 md:grid-cols-3 md:divide-x md:divide-y-0">
                        {ORDER_OPTIONS.map((option, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={option.name}
                                    className="relative"
                                    onPointerEnter={(event) => {
                                        if (event.pointerType === "mouse") setOpenIndex(index);
                                    }}
                                    onPointerLeave={(event) => {
                                        if (event.pointerType === "mouse") setOpenIndex(null);
                                    }}
                                >
                                    {/* The whole column is the trigger. Its contents are
                                        spans rather than an h3/p pair because a button
                                        may only contain phrasing content. */}
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="flex h-full w-full flex-col items-center gap-4 p-6 transition-colors duration-300 hover:bg-brand-cream/5 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-red lg:gap-5 lg:p-8"
                                    >
                                        <span
                                            className={`flex flex-col items-center gap-4 transition duration-300 lg:gap-5 ${isOpen ? "scale-95 opacity-40 blur-sm" : ""
                                                }`}
                                        >
                                            {option.image ? (
                                                <Image
                                                    src={option.image}
                                                    alt=""
                                                    width={112}
                                                    height={112}
                                                    className="h-24 w-24 rounded-2xl object-contain lg:h-28 lg:w-28"
                                                />
                                            ) : (
                                                <span className="flex h-24 w-24 items-center justify-center rounded-2xl bg-brand-red text-brand-cream lg:h-28 lg:w-28">
                                                    <svg
                                                        viewBox="0 0 64 64"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={4}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        aria-hidden="true"
                                                        className="h-12 w-12 lg:h-14 lg:w-14"
                                                    >
                                                        <path d="M14 22h36l-3 33a5 5 0 0 1-5 4.5H22a5 5 0 0 1-5-4.5z" />
                                                        <path d="M24 26v-9a8 8 0 0 1 16 0v9" />
                                                    </svg>
                                                </span>
                                            )}

                                            <span className="block">
                                                <span className="block font-display text-lg text-brand-cream lg:text-xl">
                                                    {option.name}
                                                </span>
                                                <span className="mt-1 block text-sm text-brand-cream/70">
                                                    {option.tagline}
                                                </span>
                                            </span>
                                        </span>
                                    </button>

                                    {/* Sibling of the button, not a child — a link inside a
                                        button is invalid and browsers will unnest it. The
                                        hidden state also drops it from the tab order.
                                        The link is centred by a full-size flex overlay
                                        rather than left-1/2, which would shrink-wrap it to
                                        half the column and wrap the longer labels. */}
                                    <div
                                        className={`absolute inset-0 flex items-center justify-center p-3 transition duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                                            }`}
                                    >
                                        {/* Same pill recipe as the Hero and Navbar CTAs.
                                            The bite is driven by `isOpen` rather than
                                            :hover so it also fires on a mobile tap, where
                                            there is no hover state to trigger it. */}
                                        <a
                                            href={option.href}
                                            target={option.external ? "_blank" : undefined}
                                            rel={option.external ? "noopener noreferrer" : undefined}
                                            tabIndex={isOpen ? undefined : -1}
                                            aria-hidden={!isOpen}
                                            className={`bite-hover inline-flex min-h-12 items-center rounded-full bg-brand-red px-6 py-3 text-brand-cream ${isOpen ? "[--bite-radius:1.3rem]" : ""
                                                }`}
                                        >
                                            {option.cta}
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
