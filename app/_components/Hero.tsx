import Image from "next/image";

interface AccentImage {
    src: string;
    alt: string;
    className: string;
    delayMs: number;
}

/* Food shots tucked onto the storefront photo's edges. Positions are
   hand-picked rather than random: they overlap brick, sidewalk and
   doorway, never the BAGELRY sign or the archway, and they steer clear
   of the bite notch in the top-right corner. The fourth appears only at
   `lg`, where the image column is wide enough to carry it. */
const ACCENT_IMAGES: AccentImage[] = [
    {
        src: "/images/lox.jpg",
        alt: "Lox bagel sandwich from 5th Ave Bagelry",
        className: "top-[90%] left-[12%] w-20 -rotate-6 md:w-24 lg:w-32",
        delayMs: 0,
    },
    {
        src: "/images/eggwich.jpg",
        alt: "Egg sandwich on a fresh bagel from 5th Ave Bagelry",
        className: "top-[10%] left-[88%] w-20 rotate-6 md:w-24 lg:w-32",
        delayMs: 700,
    },
    {
        src: "/images/turkey.jpeg",
        alt: "Turkey club sandwich from 5th Ave Bagelry",
        className: "top-[90%] left-[88%] w-20 rotate-3 md:w-24 lg:w-32",
        delayMs: 1400,
    },
    {
        src: "/images/house-special-iced-coffee.jpg",
        alt: "House special iced coffee from 5th Ave Bagelry",
        className: "top-[28%] left-0 hidden -rotate-3 lg:block lg:w-28",
        delayMs: 2100,
    },
];

export default function Hero() {
    return (
        <section
            id="home"
            className="relative mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-8 overflow-hidden bg-brand-cream px-4 py-8 sm:py-12 lg:flex-row lg:items-center lg:gap-12 lg:py-16"
        >
            {/* Copy first in the DOM so the h1 leads for screen readers and
                crawlers; `flex-col-reverse` still paints the photo on top
                below `lg`, where the layout stacks. */}
            <div className="relative z-10 w-full max-w-2xl text-center lg:w-1/2 lg:text-left">
                <h1 className="font-display text-4xl text-brand-charcoal sm:text-5xl md:text-6xl">
                    Your Day
                    <br />
                    Starts <span className="text-brand-red">Here</span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-base text-brand-brown sm:mt-6 sm:text-lg lg:mx-0">
                    Fresh-baked bagels, made with care and piled high with the good stuff. Welcome to 5th Avenue Bagelry Long Beach.
                </p>
                <a
                    href="#order"
                    className="bite-hover mt-6 inline-flex min-h-12 items-center rounded-full bg-brand-red px-6 py-3 text-brand-cream sm:mt-8"
                >
                    Order Now
                </a>
            </div>

            {/* Storefront anchor + the food accents laid over its edges. The
                accents are siblings of the masked photo, not children, so
                the bite notch doesn't clip them. */}
            <div className="relative w-full md:max-w-sm lg:w-1/2 lg:max-w-none">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                    <Image
                        src="/images/store-front.jpg"
                        alt="The 5th Avenue Bagelry storefront on Pine Avenue in Long Beach, with its blue awning and brick archway"
                        width={851}
                        height={750}
                        sizes="(min-width: 1024px) 34rem, (min-width: 768px) 24rem, 100vw"
                        preload
                        className="h-auto w-full"
                    />
                </div>

                {ACCENT_IMAGES.map((image) => (
                    <div
                        key={image.src}
                        className={`absolute animate-[float_6s_ease-in-out_infinite] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-4 border-brand-cream bg-brand-cream shadow-lg ${image.className}`}
                        style={{ animationDelay: `${image.delayMs}ms` }}
                    >
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="8rem"
                                className="object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
