import Link from "next/link";
import MenuSlideshow, { type Slide } from "./MenuSlideshow";

/* Five plates, taking turns. This was one photo, then briefly four floating
   cards around it — the cards read as clutter beside a copy block, so the
   same photos now rotate in a single frame instead of competing for space
   around it. Each is a different part of the menu, which is exactly the
   point this section is making. */
const SLIDES: Slide[] = [
    {
        src: "/images/sausage-bacon-egg-cheese-croissant.jpg",
        alt: "A 5th Ave Bagelry sausage bacon egg and cheese croissant.",
    },
    {
        src: "/images/heavenly-veggie-sandwich.jpg",
        alt: "A heavenly veggie sandwich at 5th Ave Bagelry",
    },
    {
        src: "/images/ham-egg-cheese-jalapeno-bagel.jpg",
        alt: "Ham, egg and cheese on a jalapeno bagel from 5th Ave Bagelry",
    },
    {
        src: "/images/turkey-veggie-egg-sandwich.jpg",
        alt: "A turkey, veggie, and egg sandwich at 5th Ave Bagelry",
    },
    {
        src: "/images/prosciutto.jpeg",
        alt: "A prosciutto sandwich at 5th Ave Bagelry",
    },
];

/* The homepage's pointer at /menu. The full menu is 119 items across five
   boards, which is why it lives on its own route — this section's whole job
   is to make that worth a click, not to reproduce any of it.

   Photo left, copy right, mirroring the Hero's copy-left/photo-right so the
   two read as a pair rather than the same block twice. */
export default function MenuCta() {
    return (
        <section
            id="menu"
            /* Clears the 80px sticky header when linked to by anchor. */
            className="scroll-mt-20 bg-brand-cream px-4 py-16 sm:py-20 lg:py-24"
        >
            {/* Copy leads in the DOM so it reads first to a screen reader,
                while flex-col-reverse still paints the photo on top when
                the layout stacks — the same trick the Hero uses. */}
            <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-8 lg:flex-row-reverse lg:gap-12">
                <div className="w-full text-center lg:w-1/2 lg:text-left">
                    <p className="font-display text-base text-brand-red sm:text-lg">
                        The Full Menu
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-brand-charcoal sm:text-4xl lg:text-5xl">
                        Everything On The Boards
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-brand-brown sm:mt-6 sm:text-lg lg:mx-0">
                        Twenty-five bagels and thirteen spreads. Ten sandwiches on
                        Boar&apos;s Head. Coffee, teas, smoothies, and juice pressed
                        to order.
                    </p>

                    <Link
                        href="/menu"
                        /* Same pill recipe as the Hero, Navbar and Order CTAs.
                           No `transition` utility on purpose — it would override
                           the components-layer --bite-radius transition and kill
                           the notch. */
                        className="bite-hover mt-6 inline-flex min-h-12 items-center rounded-full bg-brand-red px-6 py-3 text-brand-cream sm:mt-8"
                    >
                        See the full menu
                    </Link>
                </div>

                {/* Capped while stacked. Left uncapped the frame hit 681x511
                    at 728px wide and pushed the section to 939px tall — too
                    much weight for a pointer at another page. */}
                <div className="w-full max-w-md lg:w-1/2 lg:max-w-none">
                    <MenuSlideshow slides={SLIDES} />
                </div>
            </div>
        </section>
    );
}
