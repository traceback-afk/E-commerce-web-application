import { Dropdown, theme } from "flowbite-react";
import { useState, useEffect } from "react";
import {
    ChevronDown,
    Clipboard,
    ArrowRight,
    ComputerSpeaker,
    DesktopPc,
    Fingerprint,
    Headphones,
    Keyboard,
    Printer,
    Tablet,
    Tag
} from "flowbite-react-icons/outline";
import { twMerge } from "tailwind-merge";
import { CATEGORIES } from "../models/Categories";
import Link from "next/link";

export default function AllHeaderCategories() {
    // const [hoveredCategory, setHoveredCategory] = useState<string | null>("Computer & Office");
    const [selectedCategory, setSelectedCategory] = useState<string | null>("Computer & Office");
    // const [categories, setCategories] = useState([]);

    // useEffect(() => {
    //     const loadCategories = async () => {
    //         try {
    //             const response = await axios.get(
    //                 "http://127.0.0.1:8000/api/product/categories/",
    //             );
    //             if (response.status == 200) {
    //                 setCategories(response.data)
    //             } else {
    //                 console.log("category fetch failed.")
    //             }
    //         } catch {
    //             console.log("category fetch failed.")
    //         }
    //     }
    //     loadCategories();
    // }, [])

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
        <Dropdown
            arrowIcon={false}
            inline
            label={
                <>
                    <Clipboard className="-ms-0.5 me-2 size-4" />
                    All categories
                    <ChevronDown className="-me-0.5 ms-2 size-4" />
                </>
            }
            theme={{
                content: twMerge(theme.dropdown.content, "py-0"),
                floating: {
                    base: twMerge(
                        theme.dropdown.floating.base,
                        "-ms-64 w-[672px] border-none",
                    ),
                },
                inlineWrapper: twMerge(
                    theme.dropdown.inlineWrapper,
                    "hidden w-full flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sm:w-auto sm:border-0 sm:dark:bg-gray-600 sm:dark:hover:bg-gray-500 md:flex-none lg:inline-flex",
                ),
            }}
        >
            <div className="sm:flex sm:items-stretch">
                <div className="w-full shrink-0 space-y-4 px-2 py-4 sm:max-w-sm sm:p-6 md:max-w-md">
                    {CATEGORIES.map((category) => {
                        const Icon = categoryIcons[category.name as keyof typeof categoryIcons] || Tag;
                        const isSelected = selectedCategory === category.name;

                        return (
                            <Link
                                key={category.name}
                                href={`/products-by-category/${category.id}`}
                                title=""
                                className={`group flex items-center gap-4 rounded-lg p-2 ${isSelected
                                    ? 'bg-gray-100 dark:bg-gray-600'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                                    } sm:px-4`}
                                
                                onClick={() => setSelectedCategory(category.name)}
                            >
                                <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white shadow dark:bg-gray-600">
                                    <Icon className="size-4 text-gray-900 dark:text-white" />
                                </div>

                                <div className="min-w-0 flex-1 space-y-0.5">
                                    <p className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white">
                                        {category.name}
                                    </p>
                                </div>

                                <div className="-translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                                    <ArrowRight className="size-4 text-gray-900 dark:text-white" />
                                </div>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </Dropdown>
    );
}