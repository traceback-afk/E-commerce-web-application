"use client";

import { Button, Carousel, theme } from "flowbite-react";

import { twMerge } from "tailwind-merge";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // or `useRouter` if older
import { Product } from "../../models/Product"; // adjust the import path if needed
import Header from "@/app/components/header";
import { FooterSection } from "@/app/components/Footer";
import Recommended from "@/app/components/recommended";
import axios from "axios";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const {addToCart} = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://app:8000/api/product/${id}/`);
      if (res.status == 200) {
        setProduct(res.data);
      } else {
        console.log("Fetch product detail failed.");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  return (
    <div className="dark:bg-gray-500">
      <Header />
      <section className="dark: bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:py-16">
          <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 dark:text-white md:text-2xl">
            {product.name}
          </h2>
          <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 dark:text-white md:text-2xl">
            {product.new_price} $
          </p>
          <div className="mb-4 grid gap-4 sm:mb-5 sm:grid-cols-3 sm:gap-6 md:gap-12">
            <div className="sm:col-span-2">
              <Carousel
                indicators={false}
                theme={{
                  control: {
                    base: twMerge(
                      theme.carousel.control.base,
                      "bg-gray-200 group-hover:bg-gray-300 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-600 dark:group-hover:bg-gray-500 dark:group-focus:ring-gray-800/70",
                    ),
                    icon: twMerge(
                      theme.carousel.control.icon,
                      "text-gray-500 dark:text-white",
                    ),
                  },
                }}
                className="mb-4 h-56 lg:h-96"
              >
                {product.images.map((image) => (
                  <div
                    key={image.id}
                    className="flex h-full items-center justify-center bg-gray-100 object-contain dark:bg-gray-700"
                  >
                    <img
                      alt="iMac side"
                      src={image.image}
                      className="object-contain"
                    />
                  </div>
                ))}
              </Carousel>
              <p className="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
                {product.description}
              </p>
              <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Colors
                </dt>
                <dd className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <div className="size-6 rounded-full bg-purple-600"></div>
                  <div className="size-6 rounded-full bg-indigo-400"></div>
                  <div className="size-6 rounded-full bg-primary-600"></div>
                  <div className="size-6 rounded-full bg-pink-400"></div>
                  <div className="size-6 rounded-full bg-teal-300"></div>
                  <div className="size-6 rounded-full bg-green-300"></div>
                </dd>
              </dl>
            </div>
            <div>
              <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Product State
                </dt>
                <dd className="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
                  {product.is_in_stock ? (
                    <p className="text-green-400">In Stock</p>
                  ) : (
                    <p className="text-gray-400">Not Available</p>
                  )}
                </dd>

                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Rating
                </dt>
                <dd className="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
                  {Array.from({ length: product.score }, (_, i) => (
                    <i
                      key={`filled-${i}`}
                      className="bi bi-star-fill me-1 text-orange-500"
                    ></i>
                  ))}
                  {Array.from({ length: 5 - product.score }, (_, i) => (
                    <i
                      key={`empty-${i}`}
                      className="bi bi-star me-1 text-gray-400"
                    ></i>
                  ))}
                </dd>

                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Category
                </dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  {product.category}
                </dd>
              </dl>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              color="gray"
              size="lg"
              className="dark:bg-gray-800 [&>span]:text-sm"
              onClick={() => addToCart(product)}
            >
              add to cart
            </Button>
          </div>
        </div>
      </section>
      <Recommended product_id={product.id}/>
      <FooterSection />
    </div>
  );
}
