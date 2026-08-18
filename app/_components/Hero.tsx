import Image from "next/image";

interface FloatingImage {
    src: string;
    alt: string;
    className: string;
    delayMs: number;
}

const FLOATING_IMAGES: FloatingImage[] = [
    {
        src: "/images/eggwich.jpg",
        alt: "Eggwich sandwich from 5th Ave Bagelry",
        className: "top-[18%] left-[13%] -translate-x-1/2 -translate-y-1/2 w-16 -rotate-6 sm:top-[27%] sm:w-44 md:w-52",
        delayMs: 0,
    },
    {
        src: "/images/lox.jpg",
        alt: "Lox sandwich from 5th Ave Bagelry",
        className: "top-[15%] left-[71%] -translate-x-1/2 -translate-y-1/2 w-16 rotate-3 sm:w-40 md:w-48",
        delayMs: 300,
    },
    {
        src: "/images/turkey.jpeg",
        alt: "Turkey club sandwich from 5th Ave Bagelry",
        className: "top-[64%] left-[8%] -translate-x-1/2 -translate-y-1/2 w-16 rotate-2 sm:w-36 md:w-44",
        delayMs: 600,
    },
    {
        src: "/images/tuna-salad.jpeg",
        alt: "Tuna salad sandwich from 5th Ave Bagelry",
        className: "top-[80%] left-[80%] hidden -translate-x-1/2 -translate-y-1/2 -rotate-4 sm:block sm:w-24 md:w-36 lg:w-40",
        delayMs: 900,
    },
    {
        src: "/images/prosciutto.jpeg",
        alt: "Prosciutto sandwich from 5th Ave Bagelry",
        className: "top-[10%] left-1/2 hidden -translate-x-1/2 -translate-y-1/2 w-24 rotate-6 md:block lg:w-28",
        delayMs: 1200,
    },
    {
        src: "/images/house-special-iced-coffee.jpg",
        alt: "House special iced coffee from 5th Ave Bagelry",
        className: "top-[23%] left-[58%] hidden -translate-x-1/2 -translate-y-1/2 w-16 rotate-3 md:block lg:w-20",
        delayMs: 1350,
    },
    {
        src: "/images/orange-juice.jpg",
        alt: "Fresh orange juice from 5th Ave Bagelry",
        className: "top-[15%] left-[29%] hidden -translate-x-1/2 -translate-y-1/2 w-20 -rotate-3 md:block lg:w-24",
        delayMs: 1500,
    },
    {
        src: "/images/sausage-bacon-egg-cheese-croissant.jpg",
        alt: "Sausage, bacon, egg, and cheese croissant from 5th Ave Bagelry",
        className: "top-[45%] left-[5%] hidden -translate-x-1/2 -translate-y-1/2 w-24 rotate-6 md:block lg:w-28",
        delayMs: 1800,
    },
    {
        src: "/images/cinnamon-roll.jpg",
        alt: "Frosted cinnamon roll from 5th Ave Bagelry",
        className: "top-[27%] left-[87%] hidden -translate-x-1/2 -translate-y-1/2 w-24 -rotate-3 md:block lg:w-28",
        delayMs: 2100,
    },
    {
        src: "/images/heavenly-veggie-sandwich.jpg",
        alt: "Heavenly veggie sandwich from 5th Ave Bagelry",
        className: "top-[80%] left-[20%] hidden -translate-x-1/2 -translate-y-1/2 w-36 rotate-2 lg:block lg:w-44",
        delayMs: 2400,
    },
    {
        src: "/images/lox-catering-platter.jpg",
        alt: "Lox catering platter from 5th Ave Bagelry",
        className: "top-[45%] left-[95%] hidden -translate-x-1/2 -translate-y-1/2 w-36 -rotate-3 lg:block lg:w-44",
        delayMs: 2700,
    },
    {
        src: "/images/ham-egg-cheese-croissant.jpg",
        alt: "Ham, egg, and cheese croissant from 5th Ave Bagelry",
        className: "top-[89%] left-[39%] hidden -translate-x-1/2 -translate-y-1/2 w-28 rotate-2 md:block lg:w-32",
        delayMs: 3000,
    },
    {
        src: "/images/turkey-veggie-egg-sandwich.jpg",
        alt: "Turkey veggie egg sandwich from 5th Ave Bagelry",
        className: "top-[64%] left-[92%] hidden -translate-x-1/2 -translate-y-1/2 w-28 -rotate-2 md:block lg:w-32",
        delayMs: 3300,
    },
    {
        src: "/images/ham-egg-cheese-jalapeno-bagel.jpg",
        alt: "Ham, egg, cheese, and jalapeño bagel sandwich from 5th Ave Bagelry",
        className: "top-[89%] left-[61%] hidden -translate-x-1/2 -translate-y-1/2 w-28 rotate-4 sm:block lg:w-32",
        delayMs: 3600,
    },
    {
        src: "/images/parfait.jpg",
        alt: "Yogurt parfait from 5th Ave Bagelry",
        className: "top-[96%] left-[31%] hidden -translate-x-1/2 -translate-y-1/2 w-16 -rotate-6 md:block lg:w-20",
        delayMs: 3900,
    },
    {
        src: "/images/heavenly-veggie-sandwich.jpg",
        alt: "Heavenly veggie sandwich from 5th Ave Bagelry",
        className: "top-[85%] left-[82%] -translate-x-1/2 -translate-y-1/2 w-16 rotate-2 sm:hidden",
        delayMs: 4200,
    },
];

export default function Hero() {
    return (
        <section
            id="home"
            className="relative mx-auto flex min-h-[55vh] w-full max-w-6xl items-center justify-center overflow-hidden bg-brand-cream px-4 py-12"
        >
            {FLOATING_IMAGES.map((image, index) => (
                <div
                    key={`${image.src}-${index}`}
                    className={`absolute animate-[float_6s_ease-in-out_infinite] rounded-2xl border-4 border-brand-cream bg-brand-cream shadow-lg ${image.className}`}
                    style={{ animationDelay: `${image.delayMs}ms` }}
                >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(min-width: 768px) 14rem, 10rem"
                            className="object-cover"
                        />
                    </div>
                </div>
            ))}

            <div className="relative z-10 mx-auto max-w-2xl text-center">
                <h1 className="font-display text-4xl text-brand-charcoal sm:text-5xl md:text-6xl">
                    Your Day Starts Here
                </h1>
                <p className="mx-auto mt-6 max-w-xl text-lg text-brand-brown">
                    Fresh-baked bagels, made with care and piled high with the good stuff. Welcome to 5th Avenue Bagelry Long Beach.
                </p>
                <a
                    href="#order"
                    className="bite-hover mt-8 inline-block rounded-full bg-brand-red px-6 py-2 text-brand-cream"
                >
                    Order Now
                </a>
            </div>
        </section>
    );
}
