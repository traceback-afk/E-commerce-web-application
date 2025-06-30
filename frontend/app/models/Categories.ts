export const CATEGORIES = [
    {
        id: 1,
        name: "Electronics",
        subcategories: [
            "Smartphones",
            "Laptops",
            "Tablets",
            "Cameras",
            "Headphones",
            "Smart Watches",
            "Gaming Consoles"
        ]
    },
    {
        id: 3,
        name: "Fashion",
        subcategories: [
            "Women's Clothing",
            "Men's Clothing",
            "Kids' Clothing",
            "Shoes",
            "Accessories",
            "Jewelry",
            "Watches"
        ]
    },
    {
        id: 2,
        name: "Home & Kitchen",
        subcategories: [
            "Furniture",
            "Kitchen Appliances",
            "Home Decor",
            "Bedding",
            "Cookware",
            "Lighting",
            "Storage Solutions"
        ]
    },
    {
        id: 9,
        name: "Beauty & Personal Care",
        subcategories: [
            "Skincare",
            "Makeup",
            "Hair Care",
            "Fragrances",
            "Men's Grooming",
            "Bath & Body",
            "Tools & Accessories"
        ]
    },
    {
        id: 6,
        name: "Sports & Outdoors",
        subcategories: [
            "Fitness Equipment",
            "Outdoor Gear",
            "Cycling",
            "Camping",
            "Hiking",
            "Team Sports",
            "Athletic Wear"
        ]
    },
    {
        id: 7,
        name: "Books & Media",
        subcategories: [
            "Books",
            "eBooks",
            "Magazines",
            "Movies",
            "Music",
            "Video Games",
            "Audiobooks"
        ]
    },
    {
        id: 5,
        name: "Toys & Games",
        subcategories: [
            "Board Games",
            "Puzzles",
            "Action Figures",
            "Educational Toys",
            "Outdoor Toys",
            "Dolls",
            "Video Games"
        ]
    },
    {
        id: 8,
        name: "Automotive",
        subcategories: [
            "Car Accessories",
            "Tools",
            "Car Care",
            "Motorcycle Gear",
            "Tires & Wheels",
            "Electronics",
            "Performance Parts"
        ]
    }
];

// Flat list of category names for easier navigation
export const CATEGORY_NAMES = CATEGORIES.map(category => category.name);

// Utility function to find subcategories by main category
export const getSubcategoriesByCategory = (categoryName: string) => {
    const category = CATEGORIES.find(cat => cat.name === categoryName);
    return category ? category.subcategories : [];
};