import type { Metadata } from "next";
import Link from "next/link";
import { MENU, type MenuGroup } from "../_data/menu";

/* Static `metadata`, not `generateMetadata` — this route has no dynamic
   data. Next's docs reserve generateMetadata for routes that fetch. */
export const metadata: Metadata = {
    title: "Menu | 5th Ave Bagelry Long Beach",
    description:
        "Bagels and spreads, breakfast and lunch sandwiches, coffee, teas, smoothies and fresh juices at 5th Ave Bagelry on Pine Ave in Downtown Long Beach.",
};

/* Structured data so search engines read this as a menu rather than a
   wall of text. schema.org/Menu nests sections, which maps exactly onto
   our category -> group -> item shape. */
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "5th Ave Bagelry Menu",
    hasMenuSection: MENU.map((category) => ({
        "@type": "MenuSection",
        name: category.name,
        description: category.blurb,
        hasMenuSection: category.groups.map((group) => ({
            "@type": "MenuSection",
            name: group.name,
            hasMenuItem: group.items.map((item) => ({
                "@type": "MenuItem",
                name: item.name,
                ...(item.description ? { description: item.description } : {}),
            })),
        })),
    })),
};

/* The board's own rule, made structural: a group of short names reads as
   one flowing run, but anything carrying ingredients needs its own line.
   Content decides the layout, not the group's position on the page.

   The length cap is doing real work. "Egg & Cheese with Sausage, Ham, or
   Bacon" flowing into "Egg & Cheese with Turkey" is impossible to parse —
   at that length the asterisks stop reading as separators.

   24 is the deliberate line. It keeps the two longest flowing names in
   the menu — "Peanut Butter & Jelly" (21) and "Coconut Green Milk Tea"
   (22) — as runs, which is what collapses Spreads from 13 rows to a few
   lines and Sweet Iced Tea from 10. Breakfast still stacks: its longest
   item is 40 characters, well clear of the cap. */
const FLOW_NAME_MAX = 24;

function isFlowing(group: MenuGroup) {
    return group.items.every(
        (item) =>
            !item.description &&
            !item.number &&
            item.name.length <= FLOW_NAME_MAX,
    );
}

export default function MenuPage() {
    return (
        <div className="bg-brand-cream px-4 py-12 sm:py-16 lg:py-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    /* Escaping `<` is the sanitization Next's JSON-LD guide
                       calls for — cheap insurance even on our own data. */
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />

            <div className="mx-auto max-w-6xl">
                <Link
                    href="/"
                    className="inline-flex min-h-11 items-center text-sm text-brand-brown transition-colors hover:text-brand-red"
                >
                    &larr; Back to 5th Ave Bagelry
                </Link>

                <header className="mt-4 text-center">
                    <p className="font-display text-base text-brand-red sm:text-lg">
                        Baked Fresh Every Morning
                    </p>
                    <h1 className="mt-2 font-display text-4xl text-brand-charcoal sm:text-5xl lg:text-6xl">
                        Our Menu
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-base text-brand-brown sm:text-lg">
                        Everything on the boards at 247 Pine Ave. For prices, order
                        through UberEats or DoorDash.
                    </p>
                </header>

                {/* Jump list. The menu is long enough that landing at the top
                    with no way down is a dead end. */}
                <nav aria-label="Menu categories" className="mt-10">
                    <ul className="flex flex-wrap justify-center gap-3">
                        {MENU.map((category) => (
                            <li key={category.slug}>
                                <a
                                    href={`#${category.slug}`}
                                    className="inline-flex min-h-12 items-center rounded-full bg-brand-charcoal/5 px-5 py-3 text-sm text-brand-brown transition-colors hover:bg-brand-red hover:text-brand-cream"
                                >
                                    {category.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-14 space-y-16 sm:mt-16 lg:space-y-20">
                    {MENU.map((category) => (
                        <section
                            key={category.slug}
                            id={category.slug}
                            /* Matches the 80px sticky header, same reason
                               #order carries it. */
                            className="scroll-mt-24"
                        >
                            <h2 className="font-display text-2xl text-brand-charcoal sm:text-3xl lg:text-4xl">
                                {category.name}
                            </h2>
                            <p className="mt-2 text-brand-brown">{category.blurb}</p>

                            {/* CSS multi-column, not a grid. A two-column grid
                                fills row by row, so a long group like Spreads
                                leaves a matching hole beside it. Multi-column
                                balances the two columns by height instead, and
                                reads down-then-across the way the painted
                                boards do. */}
                            <div className="mt-8 gap-x-12 sm:columns-2">
                                {category.groups.map((group) => (
                                    /* break-inside-avoid keeps a group whole
                                       instead of splitting its heading from its
                                       items across the column break. Spacing is
                                       margin, not gap — multi-column has no
                                       row gap to set. */
                                    <div
                                        key={`${category.slug}-${group.name}-${group.note ?? ""}`}
                                        className="mb-10 break-inside-avoid"
                                    >
                                        <h3 className="text-sm tracking-widest text-brand-red uppercase">
                                            {group.name}
                                            {/* /70 is the floor for muted text on cream:
                                                /60 measures 3.59:1 and fails AA. */}
                                            {group.note && !group.note.includes(" ") && (
                                                <span className="text-brand-brown/70">
                                                    {" "}
                                                    &middot; {group.note}
                                                </span>
                                            )}
                                        </h3>

                                        {/* Long notes are sentences, so they read as prose
                                            under the heading rather than as a suffix. */}
                                        {group.note && group.note.includes(" ") && (
                                            <p className="mt-2 text-sm text-brand-brown/70">
                                                {group.note}
                                            </p>
                                        )}

                                        {isFlowing(group) ? (
                                            <ul
                                                role="list"
                                                className="menu-flow mt-3 text-brand-brown"
                                            >
                                                {group.items.map((item) => (
                                                    <li key={item.name}>{item.name}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <ul className="mt-3 space-y-3">
                                                {group.items.map((item) => (
                                                    <li key={item.name}>
                                                        <span className="text-brand-charcoal">
                                                            {item.number && (
                                                                <span className="text-brand-red">
                                                                    {item.number}.{" "}
                                                                </span>
                                                            )}
                                                            {item.name}
                                                        </span>
                                                        {item.description && (
                                                            <span className="mt-0.5 block text-sm text-brand-brown/80">
                                                                {item.description}
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <p className="mt-16 text-center text-sm text-brand-brown/70">
                    Menu items and availability can change.
                </p>
            </div>
        </div>
    );
}
