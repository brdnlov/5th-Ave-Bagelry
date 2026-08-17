"use client";

import { useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
    { href: "#home", label: "Home" },
    { href: "#order", label: "Delivery" },
    { href: "#menu", label: "Menu" },
    { href: "#location", label: "Location" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-brand-cream/95 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
                <a
                    href="#home"
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
                </a>
                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-8 md:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-brand-brown transition-colors hover:text-brand-red"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a
                    href="tel:+15624996889"
                    className="bite-hover hidden rounded-full bg-brand-red px-5 py-2 text-brand-cream md:block"
                >
                    Call Now
                </a>

                {/* Mobile Navigation */}
                <button
                    className="flex flex-col gap-1.5 md:hidden"
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
                <ul className="flex flex-col items-center gap-6 bg-brand-cream py-8 md:hidden">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-lg text-brand-brown"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="tel:+15624996889"
                            className="rounded-full bg-brand-red px-5 py-2 text-brand-cream"
                        >
                            Call Now
                        </a>
                    </li>
                </ul>
            )}
        </header>
    );
}
