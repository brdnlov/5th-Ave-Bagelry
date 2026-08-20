"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* Root-relative hrefs, not bare hashes. A bare "#order" does nothing on
   /menu — there is no such section on that page. "/#order" scrolls in
   place on the homepage and navigates home from anywhere else. */
const NAV_LINKS = [
    { href: "/#home", label: "Home" },
    { href: "/#order", label: "Delivery" },
    { href: "/menu", label: "Menu" },
    { href: "/#location", label: "Location" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
                <Link
                    href="/#home"
                    className="flex items-center gap-3"
                    onClick={() => setIsOpen(false)}
                >
                    <Image
                        src="/5thavelogo.jpg"
                        alt="5th Ave Bagelry Logo"
                        width={48}
                        height={48}
                        className="rounded-full"
                        priority
                    />
                </Link>
                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                /* px-3 -mx-3 widens the hit area without moving anything:
                                   "Menu" measured only 42px wide at the 768px
                                   breakpoint where this desktop nav appears. */
                                className="-mx-3 inline-block px-3 py-3 text-brand-brown transition-colors hover:text-brand-red"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <a
                    href="tel:+15624996889"
                    className="bite-hover hidden min-h-12 items-center rounded-full bg-brand-red px-6 py-3 text-brand-cream md:block"
                >
                    Call Now
                </a>

                {/* Mobile Navigation */}
                <button
                    className="-mr-2 flex min-h-12 min-w-12 flex-col items-center justify-center gap-1.5 p-2 md:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                    onClick={() => setIsOpen((open) => !open)}
                >
                    <span
                        className={`h-0.5 w-6 bg-brand-charcoal transition-transform ${isOpen ? "translate-y-2 rotate-45" : ""}`}
                    />
                    <span
                        className={`h-0.5 w-6 bg-brand-charcoal transition-opacity ${isOpen ? "opacity-0" : ""}`}
                    />
                    <span
                        className={`h-0.5 w-6 bg-brand-charcoal transition-transform ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className="absolute inset-x-0 top-full flex flex-col items-center gap-6 bg-brand-cream py-8 shadow-lg md:hidden">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="block px-6 py-2 text-lg text-brand-brown"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <a
                            href="tel:+15624996889"
                            className="inline-flex min-h-12 items-center px-6 py-3 rounded-full bg-brand-red text-brand-cream"
                        >
                            Call Now
                        </a>
                    </li>
                </ul>
            )}
        </header>
    );
}
