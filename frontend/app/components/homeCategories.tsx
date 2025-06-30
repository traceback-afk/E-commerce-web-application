"use client";
import {
    ComputerSpeaker,
    DesktopPc,
    Fingerprint,
    Headphones,
    Keyboard,
    Printer,
    Tablet,
    Tag,
} from "flowbite-react-icons/outline";
import { CATEGORIES } from "../models/Categories";
import Link from "next/link";

export default function HomeCategories() {

    const categoryIcons = {
        "Electronics": ComputerSpeaker,
        "Home & Kitchen": DesktopPc,
        "Toys & Games": Tablet,
        "Beauty & Personal Care": Headphones,
        "Sports & Outdoors": Printer,
        "Fashion": Keyboard,
        "Automotive": Fingerprint,
        "Books & Media": Tag
    };

    return (
        <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <div className="sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                        Product Categories
                    </p>
                    
                </div>
                <div className="mb-4 mt-6 grid grid-cols-1 gap-4 text-center sm:mt-8 sm:grid-cols-2 lg:mb-0 lg:grid-cols-4 xl:gap-8">
                    {CATEGORIES.map((category) => {
                        const Icon = categoryIcons[category.name as keyof typeof categoryIcons] || Tag;
                        return (
                            <Link
                                key={category.id}
                                href={`/products-by-category/${category.id}`}
                                className="grid place-content-center space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                            >
                                <Icon className="mx-auto size-14 text-gray-400 dark:text-gray-500" />
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {category.name}
                                </p>
                            </Link>
                        );
                    })}
                </div>
               
            </div>
        </section>
    );
}