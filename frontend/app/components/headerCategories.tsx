import { Dropdown, theme } from "flowbite-react";
import { ChevronDown, Clipboard, ShoppingBag, ArrowRight, Lightbulb, DesktopPc, Play, Book, Headphones, Store, Dna, Truck } from "flowbite-react-icons/outline";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import {

    ComputerSpeaker,
    Fingerprint,
    Keyboard,
    Printer,
    Tablet,
    Tag
} from "flowbite-react-icons/outline";
import { CATEGORIES } from "../models/Categories";
import Link from "next/link";

export default function ProductCategories() {
     const [hoveredCategory, setHoveredCategory] = useState<string | null>("Computer & Office");
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
                <span className="inline-flex w-full flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto sm:border-0 md:flex-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 sm:dark:bg-gray-600 sm:dark:hover:bg-gray-500">
                    <Clipboard className="me-2 size-5" />
                    <span>All categories</span>
                    <ChevronDown className="size-6" />
                </span>
            }
            theme={{
                content: twMerge(
                    theme.dropdown.content,
                    "space-y-4 rounded-lg p-0 dark:bg-gray-700",
                ),
                floating: {
                    base: twMerge(
                        theme.dropdown.floating.base,
                        "mt-2 w-[96vw] rounded-lg p-0 xl:w-[1280px]",
                    ),
                },
                inlineWrapper: twMerge(
                    theme.dropdown.inlineWrapper,
                    "mt-3 w-[96vw] sm:hidden",
                ),
            }}>
            <div className="sm:flex sm:items-stretch">
<div className="w-full shrink-0 space-y-4 px-2 py-4 sm:max-w-sm sm:p-6 md:max-w-md max-h-96 overflow-y-auto">
                    {CATEGORIES.map((category) => {
                        const Icon = categoryIcons[category.name as keyof typeof categoryIcons] || Tag;
                        const isSelected = selectedCategory === category.name;
                        const isHovered = hoveredCategory === category.name;

                        return (
                            <Link
                                key={category.name}
                                href={`/products-by-category/${category.id}`}
                                title=""
                                className={`group flex items-center gap-4 rounded-lg p-2 ${isSelected
                                    ? 'bg-gray-100 dark:bg-gray-600'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-600'
                                    } sm:px-4`}
                                onMouseEnter={() => setHoveredCategory(category.name)}
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

                            </Link>
                        );
                    })}
                </div>

                
            </div>
        </Dropdown>
    );
}