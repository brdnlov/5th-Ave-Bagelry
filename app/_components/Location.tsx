import InstagramIcon from "./icons/InstagramIcon";
import { SITE, FOLLOW } from "../_data/site";

/* Structured data for the shop itself. First-party facts only — name,
   address, phone, geo, and the profiles that are demonstrably the same
   business. Deliberately no aggregateRating: Google's policy forbids
   marking up ratings you collected from Google, and self-serving review
   markup on your own business is a manual-action risk. */
const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: SITE.fullName,
    telephone: SITE.phone.display,
    address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.state,
        postalCode: SITE.address.zip,
        addressCountry: "US",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: SITE.address.lat,
        longitude: SITE.address.lng,
    },
    hasMap: SITE.mapLinkUrl,
    /* Spread rather than set to undefined: JSON.stringify would drop an
       undefined value anyway, but an explicit absence keeps the shape
       honest when hours are null. */
    ...(SITE.hours
        ? {
              openingHoursSpecification: SITE.hours.map((slot) => ({
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: slot.dayOfWeek,
                  opens: slot.opensISO,
                  closes: slot.closesISO,
              })),
          }
        : {}),
};

export default function Location() {
    return (
        <section
            id="location"
            /* Clears the 80px sticky header — the navbar links straight here. */
            className="scroll-mt-20 bg-brand-cream px-4 py-16 sm:py-20 lg:py-24"
        >
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    /* Escaping `<` is the sanitisation Next's JSON-LD guide
                       calls for, cheap insurance even on our own data. */
                    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
                }}
            />

            <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:gap-12">
                <div className="w-full text-center lg:w-2/5 lg:text-left">
                    <p className="font-display text-base text-brand-red sm:text-lg">
                        Where To Find Us
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-brand-charcoal sm:text-4xl lg:text-5xl">
                        Come See Us
                    </h2>

                    {/* A real postal address, marked up as one. */}
                    <address className="mt-6 text-base text-brand-brown not-italic sm:text-lg">
                        {SITE.address.street}
                        <br />
                        {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                    </address>

                    {/* Rendered only when hours actually exist. Wrong hours on a
                        shopfront page cost someone a wasted trip. */}
                    {SITE.hours && (
                        <dl className="mt-6 space-y-1 text-brand-brown">
                            {SITE.hours.map((slot) => (
                                <div
                                    key={slot.days}
                                    className="flex justify-center gap-3 lg:justify-start"
                                >
                                    <dt className="text-brand-charcoal">{slot.days}</dt>
                                    <dd>
                                        {slot.opens} &ndash; {slot.closes}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:items-start lg:justify-start">
                        <a
                            href={SITE.mapLinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            /* Same pill recipe as the Hero, Navbar and Order CTAs.
                               No `transition` utility on purpose — it would
                               override the components-layer --bite-radius
                               transition and kill the notch. */
                            className="bite-hover inline-flex min-h-12 items-center rounded-full bg-brand-red px-6 py-3 text-brand-cream"
                        >
                            Get directions
                        </a>
                        <a
                            href={SITE.phone.href}
                            className="inline-flex min-h-12 items-center rounded-full bg-brand-charcoal/5 px-6 py-3 text-brand-brown transition-colors hover:bg-brand-red hover:text-brand-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                        >
                            Call {SITE.phone.display}
                        </a>
                    </div>

                    {/* Folded in from what used to be a standalone social
                        section. "Come see us" and "follow us" are the same
                        thought, so the handle belongs beside the address
                        rather than in a block of its own. Yelp is not here on
                        purpose — it is a review site, and it already appears
                        in Reviews and the footer. */}
                    <div className="mt-8 border-t border-brand-charcoal/10 pt-6">
                        <p className="text-brand-brown">{FOLLOW.blurb}</p>
                        <a
                            href={FOLLOW.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="-mx-2 mt-1 inline-flex min-h-11 items-center gap-2 px-2 text-brand-charcoal underline decoration-brand-red/40 underline-offset-4 hover:text-brand-red hover:decoration-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                        >
                            <InstagramIcon className="h-5 w-5 shrink-0" />
                            {FOLLOW.handle}
                        </a>
                    </div>
                </div>

                <div className="w-full lg:w-3/5">
                    {/* lazy: the map is below the fold on every width, and an
                        embedded map is the heaviest thing on the page. */}
                    <div className="aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg sm:aspect-16/9 lg:h-full lg:aspect-auto">
                        <iframe
                            src={SITE.mapEmbedUrl}
                            title={`Google Map showing ${SITE.name} at ${SITE.address.street}, ${SITE.address.city}`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                            className="h-full w-full border-0"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
