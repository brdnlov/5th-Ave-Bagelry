/* The menu as transcribed from the five painted boards in the shop.
   Prices are deliberately omitted — UberEats and DoorDash carry those,
   and the Order section above links to both.

   Each category keeps a `board` pointer back to the photo it came from,
   so when a board gets repainted you know which JPG to re-shoot and
   which block to edit. */

export type MenuItem = {
    name: string;
    /* Ingredients as written on the board. Omitted where the board
       lists the item on its own. */
    description?: string;
    /* The shop numbers its sandwiches and smoothies, and customers
       order by number ("a number 3"). Worth preserving. */
    number?: number;
};

export type MenuGroup = {
    name: string;
    /* Board footnotes — what a whole group is served on or with. */
    note?: string;
    items: MenuItem[];
};

export type MenuCategory = {
    slug: string;
    name: string;
    blurb: string;
    /* null where no photo exists yet. Forces the UI to handle it
       rather than 404. */
    image: string | null;
    imageAlt: string;
    board: string;
    groups: MenuGroup[];
};

export const MENU: MenuCategory[] = [
    {
        slug: "bagels-and-spreads",
        name: "Bagels & Spreads",
        blurb: "Twenty-five kinds, thirteen spreads.",
        image: "/images/lox-catering-platter.jpg",
        imageAlt: "A catering platter of lox, red onion, sprouts and cream cheese tubs",
        board: "/images/bagels_spreads.jpg",
        groups: [
            {
                name: "Healthy Bagels",
                note: "Regular",
                items: [
                    { name: "8 Grain" },
                    { name: "Egg" },
                    { name: "Rye" },
                    { name: "Water" },
                    { name: "Sourdough" },
                    { name: "Whole Wheat" },
                ],
            },
            {
                name: "Savory Bagels",
                note: "Regular",
                items: [
                    { name: "Garlic" },
                    { name: "Salt" },
                    { name: "Jalapeño" },
                    { name: "Sesame" },
                    { name: "Onion" },
                    { name: "Poppy" },
                    { name: "Sundried Tomato" },
                ],
            },
            {
                name: "Savory Bagels",
                note: "Gourmet",
                items: [
                    { name: "Asiago" },
                    { name: "Asiago-Spinach" },
                    { name: "Jalapeño-Cheddar" },
                    { name: "Spinach-Parmesan" },
                    { name: "Gourmet Jalapeño" },
                    { name: "Works" },
                    { name: "Wheat Works" },
                ],
            },
            {
                name: "Sweet Bagels",
                note: "Regular",
                items: [
                    { name: "Blueberry" },
                    { name: "Chocolate" },
                    { name: "Cinnamon Raisin" },
                    { name: "Cinnamon Sugar" },
                    { name: "Cranberry" },
                ],
            },
            {
                name: "Spreads",
                note: "Served on a regular bagel. Gourmet bagel or croissant also available.",
                items: [
                    { name: "Cream Cheese" },
                    { name: "Butter" },
                    { name: "Honey" },
                    { name: "Peanut Butter" },
                    { name: "Jelly" },
                    { name: "Peanut Butter & Jelly" },
                    { name: "Garlic Herb" },
                    { name: "Honey Walnut" },
                    { name: "Jalapeño" },
                    { name: "Strawberry" },
                    { name: "Vegetable" },
                    { name: "Blueberry" },
                    { name: "Lox Cream Cheese" },
                ],
            },
        ],
    },

    {
        slug: "breakfast-and-lunch",
        name: "Breakfast & Lunch",
        blurb: "Eggs off the griddle, and ten sandwiches on Boar's Head.",
        image: "/images/heavenly-veggie-sandwich.jpg",
        imageAlt: "The Heavenly Veggie sandwich with sprouts, avocado, tomato and cucumber",
        board: "/images/breakfast_lunch.jpg",
        groups: [
            {
                name: "Breakfast",
                items: [
                    { name: "Just Egg" },
                    { name: "Egg & Cheese" },
                    { name: "Egg & Cheese with Sausage, Ham, or Bacon" },
                    { name: "Egg & Cheese with Turkey" },
                ],
            },
            {
                name: "Omelet Sandwiches",
                items: [
                    { name: "Cheese Omelet" },
                    { name: "Veggie Omelet" },
                    { name: "Ham & Cheese Omelet" },
                    {
                        name: "NY Omelet",
                        description: "Two eggs, ham, bell peppers, onion, cheese",
                    },
                    {
                        name: "Denver Omelet",
                        description: "Two eggs, bacon, avocado, tomatoes",
                    },
                    {
                        name: "Eggwich Deluxe",
                        description: "Two eggs, ham, provolone, mushrooms, spinach",
                    },
                ],
            },
            {
                name: "Sandwiches",
                note: "Served on a regular bagel. Gourmet bagel or croissant also available. Numbers 6–10 come with lettuce, tomato, red onion, sprouts, jalapeño, cheddar or provolone, mayo, and mustard.",
                items: [
                    {
                        number: 1,
                        name: "Fifth Avenue",
                        description: "Lox, cream cheese, capers, tomato, sprouts",
                    },
                    {
                        number: 2,
                        name: "Heavenly Veggie",
                        description: "Sprouts, tomato, red onion, cucumber, avocado, cream cheese",
                    },
                    {
                        number: 3,
                        name: "Turkey or Chicken with Bacon & Tomato",
                        description: "Cheddar or provolone",
                    },
                    {
                        number: 4,
                        name: "Chicken Salad",
                        description: "Lettuce, tomato, red onion, cucumber",
                    },
                    {
                        number: 5,
                        name: "Tuna Salad",
                        description: "Lettuce, tomato, red onion, cucumber",
                    },
                    { number: 6, name: "Turkey or Chicken" },
                    { number: 7, name: "Black Forest Ham" },
                    { number: 8, name: "Prosciutto" },
                    { number: 9, name: "Roast Beef" },
                    { number: 10, name: "Pastrami" },
                ],
            },
            {
                name: "More Sandwiches",
                items: [
                    { name: "BLT" },
                    { name: "Pizza Bagel" },
                    {
                        name: "Veggie Deluxe",
                        description: "Avocado, tomato, onion, cream cheese, lemon-pepper, cucumber",
                    },
                ],
            },
            {
                name: "On the Side",
                items: [
                    { name: "Hard Boiled Eggs" },
                    { name: "Fruit Salad" },
                    { name: "Yogurt Parfait" },
                ],
            },
        ],
    },

    {
        slug: "coffee",
        name: "Coffee",
        blurb: "Drip, espresso, and the Vietnamese house special.",
        image: "/images/house-special-iced-coffee.jpg",
        imageAlt: "The house special Vietnamese iced coffee in a 5th Ave Bagelry cup",
        board: "/images/coffee.jpg",
        groups: [
            {
                name: "Brewed",
                items: [
                    { name: "Drip Coffee" },
                    { name: "Café au Lait" },
                    { name: "Espresso" },
                    { name: "Americano" },
                    { name: "Iced Coffee" },
                ],
            },
            {
                name: "House Special",
                items: [
                    { name: "Vietnamese Coffee", description: "24 oz" },
                ],
            },
            {
                name: "Espresso & Lattes",
                note: "Hot or cold. Available in 12oz, 16oz, or 24oz.",
                items: [
                    { name: "Latte" },
                    {
                        name: "Flavored Latte",
                        description: "Vanilla, hazelnut, caramel, or brown sugar",
                    },
                    { name: "Cappuccino" },
                    { name: "Café Mocha" },
                    { name: "Spiced Chai Latte" },
                    { name: "Caramel Macchiato" },
                    { name: "Matcha Latte" },
                ],
            },
            {
                name: "Make It Yours",
                items: [
                    { name: "Flavor Shot" },
                    { name: "Extra Shot of Espresso" },
                    {
                        name: "Milk Alternatives",
                        description: "Oat, almond, coconut, or soy",
                    },
                ],
            },
        ],
    },

    {
        slug: "teas",
        name: "Teas",
        /* TODO: no tea or boba photo exists in public/images. Needs one
           shot, or this card gets a non-photo treatment. */
        blurb: "Organic hot, iced, and ten sweet teas with boba.",
        image: null,
        imageAlt: "",
        board: "/images/teas.jpg",
        groups: [
            {
                name: "Organic Hot Tea",
                note: "Available in 12oz, 16oz, or 24oz.",
                items: [
                    { name: "Green" },
                    { name: "Black" },
                    { name: "Lemon-Ginger" },
                ],
            },
            {
                name: "Iced Tea",
                note: "Available only in 16oz or 24oz.",
                items: [{ name: "Green" }, { name: "Black" }],
            },
            {
                name: "Sweet Iced Tea",
                note: "Available only in 24oz.",
                items: [
                    { name: "Lychee" },
                    { name: "Passion Fruit" },
                    { name: "Pink Guava" },
                    { name: "Honey Dew" },
                    { name: "Mango" },
                    { name: "Organic Black Milk Tea" },
                    { name: "Jasmine Milk Tea" },
                    { name: "Thai Tea" },
                    { name: "Coconut Green Milk Tea" },
                    { name: "Taro Milk Tea" },
                ],
            },
            {
                name: "Add-Ins",
                note: "Choose your sweetness: 100%, 50%, or none.",
                items: [
                    { name: "Boba" },
                    { name: "Lychee Jelly" },
                    { name: "Passion Fruit Jelly" },
                ],
            },
        ],
    },

    {
        slug: "health-drinks",
        name: "Health Drinks",
        blurb: "Smoothies, ice blended, and juice pressed to order.",
        image: "/images/orange-juice.jpg",
        imageAlt: "A cup of fresh squeezed orange juice in a 5th Ave Bagelry cup",
        board: "/images/juice_smoothie.jpg",
        groups: [
            {
                name: "Smoothies",
                items: [
                    {
                        number: 1,
                        name: "Raspberry Jubilee",
                        description: "Raspberry juice, strawberry, banana, orange sherbet",
                    },
                    {
                        number: 2,
                        name: "Raspberry Banana Blast",
                        description: "Raspberry juice, raspberries, banana, vanilla yogurt",
                    },
                    {
                        number: 3,
                        name: "Tropical Freeze",
                        description: "Mango, pineapple, peach, pineapple sherbet",
                    },
                    {
                        number: 4,
                        name: "Strawberry Shortcake",
                        description: "Strawberry juice, strawberries, banana, vanilla yogurt",
                    },
                    {
                        number: 5,
                        name: "Summer Chills",
                        description: "Strawberry juice, banana, strawberries, orange sherbet",
                    },
                    {
                        number: 6,
                        name: "Very Berry Superberry",
                        description: "Cranberry, strawberries, raspberries, vanilla yogurt",
                    },
                    {
                        number: 7,
                        name: "True Blueberry",
                        description: "Apple juice, blueberries, banana",
                    },
                    {
                        number: 8,
                        name: "Exotic Excuse",
                        description: "Orange juice, banana, pineapple sherbet, vanilla yogurt",
                    },
                ],
            },
            {
                name: "Ice Blended",
                note: "Add a shot of espresso or substitute your milk.",
                items: [
                    { name: "Mocha" },
                    { name: "Cookies & Cream" },
                    { name: "Vanilla Latte" },
                    { name: "Vanilla Chai" },
                    { name: "Spiced Chai" },
                    { name: "Caramel" },
                ],
            },
            {
                name: "Healthy Juices",
                items: [
                    {
                        name: "Green Juice",
                        description: "Kale, spinach, apple, celery, cucumber",
                    },
                    {
                        name: "Beet Booster",
                        description: "Beet, apple, carrot, celery",
                    },
                    {
                        name: "Sunshine Juice",
                        description: "Orange, carrot, apple",
                    },
                    {
                        name: "High Octane",
                        description: "Carrot, orange, lemon, ginger",
                    },
                ],
            },
            {
                name: "Fresh Squeezed Juices",
                note: "Add ginger.",
                items: [
                    { name: "Orange" },
                    { name: "Carrot" },
                    { name: "Orange-Carrot" },
                ],
            },
        ],
    },
];
