/* The shop's own facts, in one place. Address, phone and map all carried
   over from the pre-rebuild site (commit 2897892) rather than retyped, so
   a digit cannot drift. Navbar, Location and Footer all read from here. */

export const SITE = {
    name: "5th Ave Bagelry",
    /* Longer form for the footer and metadata, where the city matters. */
    fullName: "5th Avenue Bagelry Long Beach",

    address: {
        street: "247 Pine Ave",
        city: "Long Beach",
        state: "CA",
        zip: "90802",
        /* From the map link on the old site. Used for the LocalBusiness
           structured data on the Location section. */
        lat: 33.770266,
        lng: -118.1925514,
    },

    phone: {
        display: "(562) 499-6889",
        /* E.164 for the tel: href — what a phone actually dials. */
        href: "tel:+15624996889",
    },

    /* The embed the old site used, kept verbatim so the pin lands on the
       shop rather than an approximate address lookup. */
    mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.6282742037674!2d-118.19512632404899!3d33.77027043256631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80dd31384adcbd45%3A0x51d981123a6e6ee7!2s5th%20Ave%20Bagelry!5e0!3m2!1sen!2sus!4v1695173895407!5m2!1sen!2sus",

    mapLinkUrl:
        "https://www.google.com/maps/place/5th+Ave+Bagelry/@33.770266,-118.192551,16z/data=!4m6!3m5!1s0x80dd31384adcbd45:0x51d981123a6e6ee7!8m2!3d33.770266!4d-118.1925514!16s%2Fg%2F11bx1yv_fq",

    /* Supplied by Brandon — nothing in this repo or the pre-rebuild site
       recorded opening hours, so these are not checkable from anything here
       and are worth confirming against the shopfront before launch. Wrong
       hours on a shopfront page cost someone a wasted trip.

       The `| null` in the annotation is load-bearing: Location guards on
       `SITE.hours &&` and drops the block entirely rather than rendering an
       empty one, and without the annotation setting this back to null would
       be a type error. */
    hours: [
        { days: "Mon-Sun", opens: "6:00AM", closes: "3:00PM" },
    ] as { days: string; opens: string; closes: string }[] | null,

    /* Explicit rather than new Date().getFullYear(): on a statically built
       page that call freezes at build time anyway, so a named constant is
       at least greppable when it needs bumping. */
    copyrightYear: 2026,
};

export type SocialLink = {
    name: string;
    href: string;
    /* Shown under the name — the actual handle where there is one. */
    handle?: string;
    blurb: string;
    /* Same rule as the review platforms: official asset or nothing. No
       redrawn Instagram glyph or Yelp Burst. Drop the real files in
       public/brand/ and set these. */
    logo: string | null;
    logoWidth: number;
    logoHeight: number;
};

const INSTAGRAM: SocialLink = {
    name: "Instagram",
    href: "https://www.instagram.com/5thavebagelrylongbeach",
    handle: "@5thavebagelrylongbeach",
    blurb: "Follow us for specials and updates!",
    logo: null,
    logoWidth: 24,
    logoHeight: 24,
};

const YELP: SocialLink = {
    name: "Yelp",
    href: "https://www.yelp.com/biz/5th-ave-bagelry-long-beach",
    blurb: "Reviews, photos, and hours from the people who go.",
    logo: null,
    logoWidth: 24,
    logoHeight: 24,
};

/* Everywhere the shop can be found. Footer uses the whole list. */
export const SOCIALS: SocialLink[] = [INSTAGRAM, YELP];

/* The one platform you actually follow. Yelp is a review site — it belongs
   in the Reviews section and the footer, not in a follow prompt, which is
   what made the old two-card social section read as filler. */
export const FOLLOW = INSTAGRAM;
