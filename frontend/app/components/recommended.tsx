"use client";
import { useState, useEffect } from "react";
import { Tooltip } from "flowbite-react";
import { CartPlus } from "flowbite-react-icons/outline";
import { Heart, ArrowRight, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Recommended({ product_id }) {
  const [products, setProducts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(
          `/api/product/recommendations/${product_id}/`,
        );
        if (response.status == 200) {
          setProducts(response.data);
        } else {
          console.log("category fetch failed.");
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, [product_id]);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between p-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recommended Products
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            onClick={nextSlide}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            disabled={currentIndex + itemsPerPage >= products.length}
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex space-x-4 overflow-x-hidden p-2 px-3">
        {products
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map((product) => (
            <div
              key={product.id}
              className="flex-1 space-y-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            >
              <Link
                href={`/products/${product.id}`}
                className="overflow-hidden rounded"
              >
                <img
                  className="mx-auto h-48 w-96 object-contain dark:hidden"
                  src={product.images[0].image}
                  alt={product.name}
                />
                <img
                  className="mx-auto hidden h-48 w-96 object-contain dark:block"
                  src={product.images[0].image}
                  alt={product.title}
                />
              </Link>
              <div>
                <Link
                  href={`/products/${product.id}`}
                  className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                >
                  {product.name}
                </Link>
                <p>
                  {Array.from({ length: product.score }, (_, i) => (
                    <i
                      key={`filled-${i}`}
                      className="bi bi-star-fill me-1 text-sm text-orange-500"
                    ></i>
                  ))}
                  {Array.from({ length: 5 - product.score }, (_, i) => (
                    <i
                      key={`empty-${i}`}
                      className="bi bi-star me-1 text-sm text-gray-400"
                    ></i>
                  ))}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  <span className="line-through">${product.old_price}</span>
                </p>
                <p className="text-md font-bold leading-tight text-red-600 dark:text-red-500">
                  ${product.new_price}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                {/* <Tooltip content="Add to favourites">
                                    <button className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                        <Heart className="size-5" />
                                    </button>
                                </Tooltip> */}
                <button
                  onClick={() => addToCart(product)}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <CartPlus className="-ms-2 me-2 size-5" />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
