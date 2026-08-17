"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { TouchEvent as ReactTouchEvent } from "react";

const SLIDES = [
    { src: "/images/slideshow_image_3.jpg", alt: "Fresh bagels on display at 5th Ave Bagelry" },
    { src: "/images/food1.jpg", alt: "A bagel sandwich from 5th Ave Bagelry" },
    { src: "/images/slideshow_image_4.jpg", alt: "Bagels and spreads at 5th Ave Bagelry" },
    { src: "/images/slideshow_image_5.jpg", alt: "Inside 5th Ave Bagelry" },
];

const SLIDE_DURATION_MS = 5000;
const SWIPE_THRESHOLD_PX = 50;

export default function Hero() {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((current) => (current + 1) % SLIDES.length);
        }, SLIDE_DURATION_MS);
        return () => clearInterval(id);
    }, []);

    const goToNext = () => setIndex((current) => (current + 1) % SLIDES.length);
    const goToPrevious = () =>
        setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);

    const handleTouchStart = (e: ReactTouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: ReactTouchEvent) => {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;

        if (deltaX > SWIPE_THRESHOLD_PX) {
            goToPrevious();
        } else if (deltaX < -SWIPE_THRESHOLD_PX) {
            goToNext();
        }

        touchStartX.current = null;
    };

    return (
        <section
            id="home"
            className="relative h-[60vh] min-h-[420px] max-h-[700px] w-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {SLIDES.map((slide, i) => (
                <Image
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className={`object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"
                        }`}
                />
            ))}

            {/* Gradient scrim so the headline stays readable over any photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/20 to-transparent" />

            {/* Headline + CTA */}
            <div className="absolute inset-x-0 bottom-16 flex flex-col items-center gap-4 px-4 text-center">
                <h1 className="font-display text-4xl text-brand-cream sm:text-5xl">
                    5th Ave Bagelry
                </h1>
                <p className="text-brand-cream/90">
                    Fresh bagels &amp; bites in Downtown Long Beach
                </p>
                <a
                    href="#order"
                    className="bite-hover rounded-full bg-brand-red px-6 py-2 text-brand-cream"                >
                    Order Now
                </a>
            </div>

            {/* Manual navigation dots */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
                {SLIDES.map((slide, i) => (
                    <button
                        key={slide.src}
                        aria-label={`Show slide ${i + 1}`}
                        aria-current={i === index}
                        onClick={() => setIndex(i)}
                        className={`h-3 w-3 rounded-full border-2 border-brand-cream transition-colors ${i === index ? "bg-brand-cream" : "bg-transparent"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
