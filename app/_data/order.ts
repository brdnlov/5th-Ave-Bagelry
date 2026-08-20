/* The three ways to get food from 5th Ave, in one place.

   These links live here rather than inside Order.tsx because two
   surfaces now use them: the homepage Order panel and the CTA at the
   bottom of /menu. A partner URL changing is exactly the kind of edit
   that gets made once and missed in the second file. */

export type OrderOption = {
    name: string;
    tagline: string;
    href: string;
    /* null for phone pickup, which draws an inline icon instead. */
    image: string | null;
    cta: string;
    external: boolean;
};

export const ORDER_OPTIONS: OrderOption[] = [
    {
        name: "UberEats",
        tagline: "Delivered to your door",
        href: "https://www.ubereats.com/store/5th-ave-bagelry/WRQNxV4HUHOKokgABkwyng",
        image: "/images/ubereats-logo.jpg",
        cta: "Order on UberEats",
        external: true,
    },
    {
        name: "DoorDash",
        tagline: "Delivered to your door",
        href: "https://www.doordash.com/store/5th-ave-bagelry-long-beach-23145319/",
        image: "/images/doordash-logo.jpg",
        cta: "Order on DoorDash",
        external: true,
    },
    {
        name: "Pickup",
        tagline: "Call ahead, skip the line",
        href: "tel:+15624996889",
        image: null,
        cta: "Call (562) 499-6889",
        external: false,
    },
];
