import Image from "next/image";

const DELIVERY_OPTIONS = [
    {
        name: "UberEats",
        href: "https://www.ubereats.com/store/5th-ave-bagelry/WRQNxV4HUHOKokgABkwyng",
        image: "/images/pic8.jpg",
        alt: "UberEats logo",
    },
    {
        name: "DoorDash",
        href: "https://www.doordash.com/store/5th-ave-bagelry-long-beach-23145319/",
        image: "/images/pic9.jpg",
        alt: "DoorDash logo",
    },
];

export default function Order() {
    return (
        <section id="order" className="bg-brand-cream px-4 py-20">
            <div className="mx-auto max-w-4xl text-center">
                <p className="font-display text-lg text-brand-red">Quick &amp; Easy Ordering</p>
                <h2 className="mt-2 text-4xl text-brand-charcoal">Delivery Services</h2>

                <div className="mt-12 grid gap-8 sm:grid-cols-2">
                    {DELIVERY_OPTIONS.map((option) => (
                        <div
                            key={option.name}
                            className="group overflow-hidden rounded-[2rem] bg-brand-charcoal transition-transform duration-300 hover:scale-[1.03]"
                        >
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={option.image}
                                    alt={option.alt}
                                    fill
                                    sizes="(min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-4 p-6">
                                <a
                                    href={option.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bite-hover rounded-full bg-brand-red inline-flex min-h-12 items-center px-6 py-3 text-brand-cream"
                                >
                                    Order Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}