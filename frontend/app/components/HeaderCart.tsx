"use client"

import { Dropdown, theme, Tooltip } from "flowbite-react";
import { Cart, Minus, Plus, TrashBin } from "flowbite-react-icons/outline";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useCart } from "../context/CartContext";
import Link from "next/link";

interface HeaderCartProps {
    className?: string;
}


export default function HeaderCart({ className }: HeaderCartProps) {

    const [total, setTotal] = useState(0);
    const { cart, removeFromCart, addToCart, changeQuantity } = useCart();

    useEffect(() => {
        const newTotal = cart.reduce((acc, curr) => {
            return acc + curr.item.new_price * curr.quantity;
        }, 0);
        setTotal(parseFloat(newTotal.toFixed(2)));

    }, [cart]);
    return (
        <div className={className}>
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    <span className="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                        <div className="relative sm:me-1.5">
                            <Cart className="size-5 lg:me-1" />
                            {cart.length > 0 && (<div className="absolute -end-1.5 -top-1.5 inline-flex size-4 items-center justify-center rounded-full bg-red-700 text-xs font-medium text-white dark:bg-red-600">
                                {cart.length}
                            </div>)}

                        </div>
                    </span>

                }
                theme={{
                    content: twMerge(
                        theme.dropdown.content,
                        "space-y-4 rounded-lg p-4 dark:bg-gray-700",
                    ),
                    floating: {
                        base: twMerge(
                            theme.dropdown.floating.base,
                            "divide-y rounded-lg dark:divide-gray-700",
                        ),
                    },
                }}
            >
                <div className="border-b border-gray-200 pb-4 dark:border-gray-600">
                    <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
                        Your shopping cart
                        <span className="ms-2 font-normal text-gray-500">
                            ({cart.length} items)
                        </span>
                    </p>
                </div>
                {cart.length > 0 && cart.map(item => (
                    <div key={JSON.stringify(item.id)} className="grid grid-cols-2 items-center border-b border-gray-200 pb-4 dark:border-gray-600">
                        <div className="flex items-center gap-2">
                            <a href="#" className="flex aspect-square size-9 shrink-0 items-center">
                                <img
                                    className="h-auto max-h-full w-full dark:hidden"
                                    src={item.item.images[0].image}
                                    alt={item.item.name}
                                />
                                <img
                                    className="hidden h-auto max-h-full w-full dark:block"
                                    src={item.item.images[0].image}
                                    alt={item.item.name}
                                />
                            </a>
                            <div>
                                <a href="#" className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white">
                                    {item.item.name}
                                </a>
                                <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                                    ${item.item.new_price}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <div>
                                <label htmlFor="counter-input" className="sr-only">
                                    Choose quantity:
                                </label>
                                <div className="relative flex items-center">
                                    <button
                                        onClick={() => changeQuantity(item.item.id, item.quantity - 1)}
                                        className="inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                    >
                                        <Minus className="size-2.5 text-gray-900 dark:text-white" />
                                    </button>
                                    <input
                                        type="text"
                                        className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                                        value={item.quantity}
                                        readOnly
                                    />
                                    <button
                                        onClick={() => changeQuantity(item.item.id, item.quantity + 1)}
                                        className="inline-flex size-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                                    >
                                        <Plus className="size-2.5 text-gray-900 dark:text-white" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <Tooltip content="Remove">
                                    <TrashBin
                                        className="mb-1 size-4 cursor-pointer text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                                        onClick={() => removeFromCart(item.item.id)}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                ))}


                <div className="space-y-4">
                    <dl className="flex w-full items-center justify-between">
                        <dt className="font-semibold leading-none text-gray-900 dark:text-white">
                            Total
                        </dt>
                        <dd className="font-semibold leading-none text-gray-900 dark:text-white">
                            ${total}
                        </dd>
                    </dl>
                    <Link
                        href="/checkout"
                        onClick={(e) => {
                            if (cart.length === 0) e.preventDefault();
                        }}
                        className={`mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium
    ${cart.length === 0
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-gray-300 text-white hover:bg-gray-500"}
    focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800`}
                    >
                        Checkout
                    </Link>

                </div>
            </Dropdown>
        </div>
    );
}