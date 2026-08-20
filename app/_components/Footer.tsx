import Link from "next/link";
import BrandMark from "./BrandMark";
import { SITE, SOCIALS } from "../_data/site";

/* Lives in app/layout.tsx, not on a page, so it appears on / and /menu
   and on anything added later without being wired up each time.

   Links are root-relative ("/#order", not "#order") for the same reason
   the navbar's are: a bare hash does nothing on /menu. */
const FOOTER_LINKS = [
    { href: "/menu", label: "Menu" },
    { href: "/#order", label: "Order" },
    { href: "/#location", label: "Location" },
];

export default function Footer() {
    return (
        <footer className="bg-brand-brown px-4 py-12 text-brand-cream sm:py-14">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <p className="font-display text-xl text-brand-cream">
                            {SITE.name}
                        </p>
                        <address className="mt-3 text-sm text-brand-cream/80 not-italic">
                            {SITE.address.street}
                            <br />
                            {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                        </address>
                        <a
                            href={SITE.phone.href}
                            className="-my-2 mt-2 inline-flex min-h-11 items-center text-sm text-brand-cream/80 underline decoration-brand-tan/50 underline-offset-4 hover:text-brand-cream hover:decoration-brand-tan"
                        >
                            {SITE.phone.display}
                        </a>
                    </div>

                    <nav aria-label="Footer">
                        <p className="font-display text-sm tracking-widest text-brand-tan uppercase">
                            Explore
                        </p>
                        <ul role="list" className="mt-3 space-y-1">
                            {FOOTER_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="-mx-2 inline-flex min-h-11 items-center px-2 text-sm text-brand-cream/80 hover:text-brand-cream"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <p className="font-display text-sm tracking-widest text-brand-tan uppercase">
                            Follow
                        </p>
                        <ul role="list" className="mt-3 space-y-1">
                            {SOCIALS.map((social) => (
                                <li key={social.name}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="-mx-2 inline-flex min-h-11 items-center gap-2 px-2 text-sm text-brand-cream/80 hover:text-brand-cream"
                                    >
                                        {social.logo && (
                                            <BrandMark
                                                name=""
                                                logo={social.logo}
                                                logoWidth={social.logoWidth}
                                                logoHeight={16}
                                            />
                                        )}
                                        {social.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <p className="mt-10 border-t border-brand-cream/15 pt-6 text-sm text-brand-cream/80">
                    &copy; {SITE.copyrightYear} {SITE.fullName}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
