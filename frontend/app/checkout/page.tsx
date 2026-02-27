"use client";
import { useState, useEffect } from "react";
import Header from "../components/header";
import { FooterSection } from "../components/Footer";
import { useCart } from "../context/CartContext";
import { Minus, Plus, TrashBin } from "flowbite-react-icons/outline";
import { redirect } from 'next/navigation';
import axios from "axios";
import { Tooltip } from "flowbite-react";

export default function Checkout() {
    const { cart, removeFromCart, clearCart, changeQuantity } = useCart();
    const [user, setUser] = useState();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(0);

    const placeOrder = async () => {
        if (cart.length == 0) {
            redirect('/AllProducts')
        }
        try {
            const token = localStorage.getItem('token')
            const purchase_items = cart.map(cartItem => {
                const quantity = cartItem.quantity;
                const price = parseFloat(cartItem.item.new_price);
                const subtotal = (quantity * price).toFixed(2);

                return {
                    quantity: quantity,
                    price_at_purchase: price.toString(),
                    subtotal: subtotal,
                    product: cartItem.item.id

                };
            });
            const requestBody = {
                user: user.id,
                is_completed: true,
                shipping_address: user.shipping_address,
                total: total.toString(),
                purchase_items: purchase_items
            };
            const response = await axios.post(
                "/api/shop/purchases/", requestBody,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status == 201) {
                clearCart();
                redirect('/');
            } else {
                console.log(response.data)
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            redirect('/');
        }

        const fetchUser = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get(
                    "/api/user/me/",
                    {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    }
                );
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        const newTotal = cart.reduce((acc, curr) => {
            return acc + curr.item.new_price * curr.quantity;
        }, 0);

        const totalSaved = cart.reduce((acc, curr) => {
            const oldPrice = curr.item.old_price || curr.item.new_price; // fallback in case old_price is missing
            return acc + (oldPrice - curr.item.new_price) * curr.quantity;
        }, 0);

        setTotal(parseFloat(newTotal.toFixed(2)));
        setSaved(parseFloat(totalSaved.toFixed(2)));
    }, [cart]);

    return loading ? (
        <span className="loading loading-spinner loading-md"></span>
    ) : (
        <div className="dark:bg-gray-500">
            <Header />

            {/* Title */}
            < div className="px-3 pb-4 pt-8 text-center dark:bg-gray-500" >
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Checkout
                </h1>
            </div >

            {/* Filter Dropdown (Moved to the left with background color) */}


            {/* Products Grid */}
            <div className="flex flex-col mx-auto w-3/4 grid-cols-1 gap-6 px-5 pb-2 dark:bg-gray-500 sm:grid-cols-2 lg:grid-cols-4">
                {cart.length > 0 && cart.map(item => (
                    <div key={JSON.stringify(item.id)} className="grid grid-cols-2 items-center border-b border-gray-200 pb-4 dark:border-gray-600">
                        <div className="flex items-center gap-2">
                            <a href="#" className="flex aspect-square size-20 shrink-0 items-center">
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
                                <a href="#" className="truncate text-lg font-semibold leading-none text-gray-900 hover:underline dark:text-white">
                                    {item.item.name}
                                </a>
                                <div className="flex flex-row align-middle items-center gap-1">
                                    <p className="text-sm text-gray-400 dark:text-white font-sm m-0">
                                        <span className="line-through">
                                            ${item.item.old_price}
                                        </span>
                                    </p>
                                    <p className="mt-0.5 font-bold font-lg truncate text-lg text-gray-500 dark:text-gray-400 m-0">
                                        ${item.item.new_price}
                                    </p>
                                </div>

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
                <dl className="flex w-full items-center justify-between">
                    <dt className=" leading-none text-gray-400 dark:text-gray-200">
                        Total money saved
                    </dt>
                    <dd className=" leading-none text-gray-400 dark:text-gray-200">
                        ${saved}
                    </dd>
                </dl>
                <dl className="flex w-full items-center justify-between">
                    <dt className="font-semibold leading-none text-gray-900 dark:text-white">
                        Total
                    </dt>
                    <dd className="font-semibold leading-none text-gray-900 dark:text-white">
                        ${total}
                    </dd>
                </dl>
                <hr />
                <div className="flex flex-row justify-between">
                    {
                        user.shipping_address ? (
                            <div className="flex flex-col text-black dark:text-white ">
                                <div className="mb-2">
                                    Shipping Address:
                                </div>
                                <div>
                                    {user.shipping_address}
                                </div>

                            </div>
                        ) : (<p>no shipping address</p>)
                    }
                    {cart.length === 0 ? (
                        <div className="badge badge-soft badge-warning">Your cart is currently empty.</div>
                    ) : (<button disabled={cart.length === 0} onClick={() => placeOrder()} className="inline-flex w-1/2 items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <i className="bi bi-credit-card text-lg me-3"></i>
                        Proceed to Payment
                    </button>)}

                </div>

            </div>



            <FooterSection />
        </div >)
}

