/* Customer reviews, quoted from Google Business Profile and Yelp.

   Everything here must be REAL and VERBATIM. These are other people's
   words about a real business, published under their names — the one
   place on this site where inventing plausible-sounding copy would be
   dishonest rather than just wrong. `Reviews.tsx` renders nothing while
   REVIEWS is empty, so the section cannot ship with placeholder text.

   Where to get them legitimately:

   1. Copy them by hand. As the business's developer you can read them in
      the Google Business Profile dashboard and on the Yelp page. Fine for
      a handful that rarely change, which is what this section wants.
   2. Google Places API — Place Details returns up to five reviews. Google
      requires the reviewer's name and the "Powered by Google" attribution
      be shown alongside, and forbids caching the text long-term.
   3. Yelp Fusion API — /businesses/{id}/reviews returns three review
      EXCERPTS, not full text, plus the reviewer name and a link. Yelp
      requires the Yelp logo and a link back to the review.

   Both APIs need a key, which means an env var and a server-side fetch —
   at which point this file becomes a fetcher instead of a constant, and
   the page stops being fully static. Worth doing only if the reviews
   should update on their own. */

export type ReviewSource = "google" | "yelp";

export type Review = {
   /* Verbatim. Trim only at a sentence boundary, and never edit wording,
      spelling, or punctuation — it stops being their review if you do. */
   quote: string;
   /* The reviewer's display name exactly as the source shows it. Both
      platforms require attribution; neither permits anonymising. */
   author: string;
   source: ReviewSource;
   /* Deep link to the review where possible, otherwise the business
      profile. Required by both platforms' display terms. */
   url: string;
   /* As given, 1–5. */
   rating: number;
   /* ISO date the review was posted, for ordering and for "reviewed in
      March 2026" style context. */
   date: string;
};

/* Aggregate figures drift every time someone reviews the shop, so record
   when each was last confirmed rather than implying it is live. */
export type ReviewSummary = {
   source: ReviewSource;
   rating: number;
   count: number;
   url: string;
   checkedOn: string;
};

/* Attribution. Both platforms want credit and a link back when their
   reviews appear elsewhere, so that lives here and a review entry only
   has to name its source.

   `logo` is null until the OFFICIAL asset sits in public/brand/. I have
   deliberately not drawn these — a hand-made approximation of the Google
   wordmark or the Yelp Burst is a wrong logo, and a wrong logo is worse
   than no logo, both visually and as a trademark matter. Download them:

     Google — about.google/brand-resource-center
              Full-colour "Google" wordmark for light backgrounds. Clear
              space around the mark equals the height of the capital G.
     Yelp   — yelp.com/brand
              The Yelp logo / Burst. Yelp sets a minimum display size and
              forbids recolouring, rotating or distorting the mark.

   Check both pages before shipping; these notes were written 2026-08-19
   and brand terms change.

   Until those files exist the component falls back to the plain platform
   name as text. That is legitimate on its own — naming the source of a
   quote is nominative use and needs no logo. */
export type SourceMeta = {
   label: string;
   /* The shop's real profile, carried over from the pre-rebuild site
      (commit 2897892). */
   profileUrl: string;
   /* Path under public/. Set logoWidth and logoHeight to the asset's own
      aspect ratio when you add it, or next/image will distort it. */
   logo: string | null;
   logoAlt: string;
   logoWidth: number;
   logoHeight: number;
};

export const SOURCE_META: Record<ReviewSource, SourceMeta> = {
   google: {
      label: "Google",
      profileUrl:
         "https://www.google.com/maps/place/5th+Ave+Bagelry/@33.770266,-118.192551,16z/data=!4m6!3m5!1s0x80dd31384adcbd45:0x51d981123a6e6ee7!8m2!3d33.770266!4d-118.1925514!16s%2Fg%2F11bx1yv_fq",
      logo: null,
      logoAlt: "Google",
      logoWidth: 74,
      logoHeight: 24,
   },
   yelp: {
      label: "Yelp",
      profileUrl: "https://www.yelp.com/biz/5th-ave-bagelry-long-beach",
      logo: null,
      logoAlt: "Yelp",
      logoWidth: 64,
      logoHeight: 24,
   },
};

/* Empty on purpose. Populate from the real profiles — see the note above.
   The section stays hidden until this has entries. */
export const REVIEWS: Review[] = [
   {
      quote: "The cashier was so nice! It wasn't very busy on an afternoon and me and my friend were indecisive on what to order. The cashier didn't seem to mind and when we did order he offered to cut our bagels in half so we could share. He also gave us water cups with ice. I'm not close to Long Beach but if I'm in the area again I would buy their containers of different flavored cream cheese.",
      author: "June V.", source: "yelp", url: "https://www.yelp.com/biz/5th-ave-bagelry-long-beach?hrid=SGFb8YUjxL7Os8yG3VgOlA&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)",
      rating: 5, date: "2026-07-12"
   },
   {
      quote: "Came in before a watch party for the World Cup and enjoyed it! Pricing is fair! Food is great! Service is great and the timing for the food is good. They have tons of options for bagel and different spreads. I'll be back before other World Cup games for sure!",
      author: "Juan M.", source: "yelp", url: "https://www.yelp.com/biz/5th-ave-bagelry-long-beach?hrid=arbHg4xovuUiM7pA1o9fBw&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)",
      rating: 5, date: "2026-06-18"
   },
   {
      quote: "Picture this: You're getting on a cruise ship in 4 hours, but the hotel you're staying at doesn't have a breakfast buffet. Besides, for the next (insert the duration of your cruise here) days you'll be eating at the buffet a least once a day. No need to start Buffeting it up before you step foot on the Lido deck.That's what brought us to 5th Ave Bagelry. Located less than 1/2 mile from our hotel, it was an easy walk down the surprisingly un-busy streets of Long Beach, CA at 9:00 on a Thursday morning. 5th Ave Bagelry has A LOT of varieties of bagels. To put a number to it, about 25 different varieties of bagels, all made fresh on site daily. Add to that, 8 different flavours of cream cheese and you've got nearly endless bagel-and-cream-cheese options. To be fair, you're not limited to bagel & cream cheese. They also offer breakfast bagel sandwiches and non-breakfast bagel sandwiches and a few specialty items. Even though it was 9:00 in the morning I was tempted to try a pizza bagel but I resisted. The siren song of a jalapeño bagel with jalapeño cream cheese wins out every time. (This is a proven statistic. Just ask me.) They also offer an endless variety of coffees in just about every possible fashion (latte, espresso, iced, iced blended). Smoothies, juices, and soft drinks round out a very impressive selection of offerings. The staff at 5th Ave Bagelry appeared to be very focused. While they weren't swamped when we visited, they did have a steady influx of customers. It's an order-at-the-counter-and-we'll-call-your-number-when-it's-ready arrangement which seems to work well for them. All food is delivered in a paper bag. Our food delivery was about 10 minutes and everything was hot and accurate. My iced vanilla latte was exactly the go-juice I needed to jump start embarkation day. My jalapeño bagel with jalapeño cream cheese? Chef's kiss. I love jalapeño bagels that present a little spicy heat. The jalapeño cream cheese managed to round out my `\"Jim loves spicy food for breakfast\"` life choices. During our roughly 1/2 hour there I didn't see anyone come out from behind the counter to tidy up the dining room, which was needed. I'm assuming they had a pretty intense breakfast rush and just hadn't fully recovered yet, as one of the two trash bins was full. In a perfect world I'd be able to visit enough to try all of the bagels, but home isn't in Long Beach.",
      author: "Jim F.", source: "yelp", url: "https://www.yelp.com/biz/5th-ave-bagelry-long-beach?hrid=2N9DeO7TLABlPMQ1euXMEA&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)",
      rating: 4, date: "2026-05-27"
   },
   {
      quote: "5th Ave Bagelry brings a vibrant blast of fresh-baked, traditional comfort straight to Downtown Long Beach. This high-energy morning staple pairs a fast-paced, aromatic counter service with exceptionally warm, welcoming hospitality that has made it a community favorite for decades. The kitchen delivers bold, scratch-made flavor, kettle-boiling and baking their signature dense, chewy bagels fresh every day. Guests can pile them high with a variety of house-made cream cheeses, or opt for loaded breakfast sandwiches, hearty lunch melts, and fresh-squeezed juices perfect for starting the day right.",
      author: "Sean C.", source: "google", url: "https://share.google/Er5JGd65eql5Q5n73",
      rating: 5, date: "2026-07"
   },
   {
      quote: "They have so many good smoothie combinations they can't even fit them all on the menu. This one in the picture is the mango, passion, and dragon fruit smoothie so good. 10x better than erwhon!!!",
      author: "Jordan R.", source: "google", url: "https://share.google/sta2NpwgVzyiV5nfu",
      rating: 5, date: "2026-06"
   },
   {
      quote: "Great food and price reasonable and clean.",
      author: "Pearl D.", source: "google", url: "https://share.google/VknGkXdeCW7YiomQc",
      rating: 5, date: "2026-05"
   }
];

export const REVIEW_SUMMARY: ReviewSummary[] = [
   { source: "google", rating: 4.3, count: 504, url: "https://example.com", checkedOn: "2026-08-19" },
   { source: "yelp", rating: 4.0, count: 679, url: "https://example.com", checkedOn: "2026-08-19" },
];
