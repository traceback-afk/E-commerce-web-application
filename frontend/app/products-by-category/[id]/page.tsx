"use client";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { Product } from "@/app/models/Product";
import Header from "@/app/components/header";
import { FooterSection } from "@/app/components/Footer";
import Link from "next/link";
import axios from "axios";
import { useCart } from "@/app/context/CartContext";
import { CartPlus } from "flowbite-react-icons/outline";
import { useParams } from "next/navigation";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState();
    const { addToCart } = useCart();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/product/categories/${id}`,
                );
                if (response.status == 200) {
                    setCategory(response.data);
                } else {
                    console.log("category fetch failed.")
                }
            } catch (error) {
                console.error("category fetch failed.", error);
            }
        }
        const loadProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/product/?category_id=${id}`,
                );
                if (response.status == 200) {
                    setProducts(response.data);
                    setLoading(false);
                } else {
                    console.log("Failed to load products.")
                    setLoading(false);
                }
            } catch (error) {
                console.error("Failed to load products:", error);
                setLoading(false);
            }
        };
        loadCategory()
        loadProducts();
    }, []);                                                                             


    return (
        <div className="dark:bg-gray-500">
            <Header />

            {/* Title */}
            <div className="px-3 pb-4 pt-8 text-center dark:bg-gray-500">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Explore Our Products
                </h1>
                {category && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Category: {category.name}
                    </p>
                )}

            </div>

            {/* Products Grid */}
            <div className="mx-auto grid w-3/4 grid-cols-1 gap-6 px-5 pb-2 dark:bg-gray-500 sm:grid-cols-2 lg:grid-cols-4 mt-14">
                {loading ? (
                    <div className="col-span-full flex flex-row justify-center my-10">
                        <span className="loading loading-spinner loading-md"></span>
                    </div>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="h-[500px] flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                        >
                            {/* Image Section - Fixed Height */}
                            <Link href={`/products/${product.id}`} className="flex-shrink-0 overflow-hidden rounded mb-4">
                                <img
                                    className="mx-auto h-44 w-44 object-cover"
                                    src={product.images[0].image}
                                    alt={product.name}
                                />
                            </Link>
                            
                            {/* Content Section - Flexible */}
                            <div className="flex flex-col flex-grow">
                                {/* Product Name and Rating */}
                                <div className="mb-3">
                                    <Link
                                        href={`/products/${product.id}`}
                                        className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white line-clamp-2"
                                    >
                                        {product.name}
                                    </Link>
                                    <div className="mt-1">
                                        {Array.from({ length: product.score }, (_, i) => (
                                            <i
                                                key={`filled-${i}`}
                                                className="bi bi-star-fill me-1 text-orange-500 text-sm"
                                            ></i>
                                        ))}
                                        {Array.from({ length: 5 - product.score }, (_, i) => (
                                            <i
                                                key={`empty-${i}`}
                                                className="bi bi-star me-1 text-gray-400 text-sm"
                                            ></i>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Description - Takes available space */}
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400 flex-grow line-clamp-3 mb-4">
                                    {product.description}
                                </p>
                                
                                {/* Price Section - Fixed at bottom */}
                                <div className="mt-auto">
                                    <div className="mb-4">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            <span className="line-through">${product.old_price}</span>
                                        </p>
                                        <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                                            ${product.new_price}
                                        </p>
                                    </div>
                                    
                                    {/* Add to Cart Button */}
                                    <div className="flex items-center gap-2.5">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        >
                                            <CartPlus className="-ms-2 me-2 size-5" />
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 dark:text-gray-300 my-10">
                        No products found.
                    </div>
                )}
            </div>

            <FooterSection />
        </div>
    );
}