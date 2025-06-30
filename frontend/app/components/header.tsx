"use client";
import { DarkThemeToggle } from "flowbite-react";
import {
    Navbar,
    NavbarToggle,
    NavbarCollapse,
} from "flowbite-react";

import {
    Search,
} from "flowbite-react-icons/outline";
import { useState } from "react";
import HeaderMenu from "./headerMenu";
import SearchModal from "./searchModal";
import ProfileComponent from "./ProfileComponent";
import ProductCategories from "./headerCategories";
import HeaderCart from "./HeaderCart";
import { useWebContext } from "../context/Context";
import AuthModal from "./Auth";
import Link from "next/link";



export default function Header() {
    const [isOpenSearch, setOpenSearch] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLogin } = useWebContext();

    return (
        <>
            <Navbar
                fluid
  className="fixed top-0 left-0 right-0 z-50 w-full border-b-2 px-4 py-3 dark:bg-gray-800"
            >
                <div className="flex w-full flex-wrap items-center justify-between">
                    <div className="flex items-center">
                        <Link href={"/HomePage"}>
                            <i className="bi bi-shop ms-5 dark:text-white text-primary-600 text-3xl"></i>
                            <i className="font-bold text-xl text-primary-600 dark:text-white">Shop</i>
                        </Link>

                    </div>

                    {/* Mobile toggle button */}
                    <div className="flex items-center md:order-2">
                        <button
                            onClick={() => setOpenSearch(!isOpenSearch)}
                            className="mr-2 inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        >
                            <span className="sr-only">Search</span>
                            <Search className="size-5" />
                        </button>
                        <DarkThemeToggle className="mr-2" />
                        <HeaderCart className="mr-2" />
                        {isLogin ? (
                            <ProfileComponent className="mr-2" />
                        ) : (

                            <AuthModal />

                        )}

                        <NavbarToggle
                            className="ml-3"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        />
                    </div>
                    <NavbarCollapse className={`w-full md:block md:w-auto ${isMenuOpen ? '' : 'hidden'}`}>
                        <div className="mt-4 flex flex-col md:mt-0 md:flex-row md:items-center">
                            <HeaderMenu />
                        </div>
                    </NavbarCollapse>
                </div>

                <div className={`mt-2 w-full ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                    <ProductCategories />
                </div>
            </Navbar>

            <div className="h-24 md:h-28">

            </div>

            <SearchModal isOpen={isOpenSearch} onClose={() => setOpenSearch(false)} />

        </>


    );
}