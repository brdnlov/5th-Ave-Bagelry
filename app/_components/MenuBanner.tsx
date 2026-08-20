import Link from "next/link";
import { MENU } from "../_data/menu";

/* A band of category pills directly under the Hero.

   Its job is range, not persuasion. A shop called "Bagelry" also pouring
   Thai tea, taro boba, pressed beet juice and eight smoothies is the one
   thing the Hero can't say, and five named categories say it faster than
   a sentence does. Each pill deep-links into /menu, so someone who came
   for boba never has to scroll past 38 bagels.

   Built from MENU, so the labels and the anchors cannot drift from the
   page they point at. */
export default function MenuBanner() {
    return (
        <nav
            aria-label="Menu categories"
            className="border-y border-brand-tan/30 bg-brand-tan/15 px-4 py-5 sm:py-6"
        >
            <ul
                role="list"
                className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 sm:gap-3"
            >
                {MENU.map((category) => (
                    <li key={category.slug}>
                        <Link
                            href={`/menu#${category.slug}`}
                            /* min-h-12 keeps every pill a full 48px target, which
                               is the whole reason these are pills and not links
                               in a line of text. */
                            className="inline-flex min-h-12 items-center rounded-full bg-brand-cream px-5 py-3 text-sm text-brand-brown transition-colors hover:bg-brand-red hover:text-brand-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                        >
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
