"use client";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { Product } from "../models/Product";
import Header from "../components/header";
import { FooterSection } from "../components/Footer";
import Link from "next/link";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { CartPlus } from "flowbite-react-icons/outline";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categories, setCategories] = useState([]);
    const { cart, removeFromCart, addToCart, changeQuantity } = useCart();


    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await axios.get(
                    "/api/product/",
                );
                if (response.status == 200) {
                    setProducts(response.data);
                    setFilteredProducts(response.data)
                } else {
                    console.log("category fetch failed.")
                }
            } catch (error) {
                console.error("Failed to load products:", error);
            }
        };

        const loadCategories = async () => {
            try {
                const response = await axios.get(
                    "/api/product/categories/",
                );
                if (response.status == 200) {
                    setCategories(response.data)
                } else {
                    console.log("category fetch failed.")
                }
            } catch {
                console.log("category fetch failed.")
            }
        }


        loadCategories();
        loadProducts();
    }, []);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);

        if (category === "") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.category === category
            );
            setFilteredProducts(filtered);
        }
    };

    return (
        <div className="dark:bg-gray-500">
            <Header />

            {/* Title */}
            <div className="px-3 pb-4 pt-8 text-center dark:bg-gray-500">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Explore Our Products
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Find the best items curated just for you
                </p>
            </div>

            {/* Filter Dropdown (Moved to the left with background color) */}
            <div className="mx-auto mt-4 flex w-3/4 justify-start p-4">
                <Dropdown label="Filter by Category" color={"gray"} className="p-2" >
                    <Dropdown.Item onClick={() => handleCategoryChange("")}>
                        All Categories
                    </Dropdown.Item>
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <Dropdown.Item key={category.id} onClick={() => handleCategoryChange(category.name.toString())}>
                                {category.name}
                            </Dropdown.Item>
                        ))
                    ) : (
                        <span className="loading loading-spinner loading-md"></span>
                    )}

                </Dropdown>
            </div>

            {/* Products Grid */}
            <div className="mx-auto grid w-3/4 grid-cols-1 gap-6 px-5 pb-2 dark:bg-gray-500 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                    <div

                        key={product.id}
                        className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Link  href={`/products/${product.id}`} className="overflow-hidden rounded">

                                <img className="mx-auto size-44 img-fluid object-cover" src={product.images[0].image} alt={product.name} />


                        </Link>
                        <div>
                            <Link
                                href={`/products/${product.id}`}
                                className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                            >
                                {product.name}
                            </Link>
                            <p>
                                {Array.from({ length: product.score }, (_, i) => (
                                    <i key={`filled-${i}`} className="bi bi-star-fill me-1 text-orange-500 text-sm"></i>
                                ))}
                                {Array.from({ length: 5 - product.score }, (_, i) => (
                                    <i key={`empty-${i}`} className="bi bi-star me-1 text-gray-400 text-sm"></i>
                                ))}
                            </p>

                            <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                                {product.description}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                <span className="line-through">
                                    ${product.old_price}
                                </span>
                            </p>
                            <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
                                ${product.new_price}
                            </p>
                        </div>
                        <div className="mt-6 flex items-center gap-2.5">
                            {/* <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                Add to favourites
                            </button> */}
                            <button onClick={() => addToCart(product)} className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <CartPlus className="-ms-2 me-2 size-5" />
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <FooterSection />
        </div>
    );
}