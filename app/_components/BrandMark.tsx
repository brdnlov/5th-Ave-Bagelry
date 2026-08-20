import Image from "next/image";

/* Renders a platform's OFFICIAL logo file, or its name as text until that
   file exists.

   The fallback is not laziness — I will not hand-draw the Instagram glyph
   or the Yelp Burst. A reproduction from memory gets the corner radii,
   proportions and gradient subtly wrong, and "subtly wrong" is the worst
   possible outcome for a trademark: it looks cheap and it is a misuse.
   The real files take a minute to fetch, and the moment they land in
   public/brand/ every usage below picks them up with no code change.

   Where to get them:
     Instagram — about.meta.com/brand/resources/instagram  (the glyph, in
                 black or white; Meta forbids recolouring or reshaping it)
     Yelp      — yelp.com/brand  (logo and Burst, with minimum sizes)
     Google    — about.google/brand-resource-center

   simpleicons.org also carries official single-colour paths for all three
   if you want a monochrome set that tints with currentColor. */
export default function BrandMark({
    name,
    logo,
    logoWidth,
    logoHeight,
    className = "",
}: {
    name: string;
    logo: string | null;
    logoWidth: number;
    logoHeight: number;
    className?: string;
}) {
    if (!logo) return <span className={className}>{name}</span>;

    return (
        <Image
            src={logo}
            /* Empty alt when the name is already adjacent in text; the
               caller passes a name-bearing label in that case. */
            alt={name}
            width={logoWidth}
            height={logoHeight}
            /* Height-constrained so each brand keeps its own proportions
               whatever the file's intrinsic size. */
            className={`inline-block w-auto ${className}`}
            style={{ height: logoHeight }}
        />
    );
}
