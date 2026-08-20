"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type Slide = { src: string; alt: string };

const INTERVAL_MS = 4000;

/* A crossfade rotator for the menu CTA. Kept as its own client island so
   MenuCta itself stays a Server Component — the only thing here that needs
   the browser is the timer.

   All five images stay in the DOM rather than mounting one at a time:
   opacity does not remove an element from the accessibility tree, so a
   screen reader gets all five alt descriptions in order and never has to
   wait on the animation to hear them. */
export default function MenuSlideshow({ slides }: { slides: Slide[] }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    /* Set from matchMedia after mount, so the server and the first client
       render agree and hydration does not mismatch. */
    const [reducedMotion, setReducedMotion] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const sync = () => setReducedMotion(query.matches);
        sync();
        query.addEventListener("change", sync);
        return () => query.removeEventListener("change", sync);
    }, []);

    useEffect(() => {
        /* Someone who asked for less motion gets a still image, and the
           timer stops entirely while hovered or focused so a reader is not
           fighting the rotation. */
        if (reducedMotion || paused || slides.length < 2) return;
        const id = window.setInterval(
            () => setIndex((i) => (i + 1) % slides.length),
            INTERVAL_MS,
        );
        return () => window.clearInterval(id);
    }, [reducedMotion, paused, slides.length]);

    return (
        <div
            ref={containerRef}
            onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
            onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
        >
            {/* Fixed 4:3 crop so a portrait source cannot make this section
                taller than the Hero above it, and so all five slides occupy
                exactly the same box while crossfading. */}
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg">
                {slides.map((slide, i) => (
                    <Image
                        key={slide.src}
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        sizes="(min-width: 1024px) 34rem, 28rem"
                        className={`object-cover transition-opacity duration-700 ${
                            i === index ? "opacity-100" : "opacity-0"
                        }`}
                        /* Only the first is worth fetching eagerly; the rest
                           are behind a 4 second timer. */
                        loading={i === 0 ? "eager" : "lazy"}
                    />
                ))}
            </div>

            {slides.length > 1 && (
                <div /* Centred at every width, including lg where the copy column is
                       left-aligned: the dots belong to the image, not the text. */
                    className="mt-4 flex justify-center gap-1">
                    {slides.map((slide, i) => (
                        <button
                            key={slide.src}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Show photo ${i + 1} of ${slides.length}`}
                            aria-current={i === index}
                            /* The dot is 8px but the button is 44px — the
                               target has to be tappable even though the mark
                               is small. */
                            className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                        >
                            <span
                                className={`block h-2 w-2 rounded-full transition-colors ${
                                    i === index
                                        ? "bg-brand-red"
                                        : "bg-brand-charcoal/25"
                                }`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
