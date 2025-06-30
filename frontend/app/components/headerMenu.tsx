import Link from "next/link";
import AllHeaderCategories from "./allHeaderCategories";

export default function HeaderMenu() {

    return (
        <div className="md:flex md:items-center md:justify-center">
            <div className="relative items-center justify-center rounded-lg sm:flex sm:gap-4 sm:bg-gray-100 sm:p-2 sm:dark:bg-gray-700">
                <AllHeaderCategories />
                <ul className="flex items-center space-x-4">
                    <li>
                        <Link
                            href={`/HomePage`}
                            title=""
                            className="hidden items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 sm:inline-flex"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/AboutUs"
                            title=""
                            className="hidden items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 sm:inline-flex"
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/ContactUs"
                            title=""
                            className="hidden items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 sm:inline-flex"
                        >
                            Contact Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/AllProducts"
                            title=""
                            className="hidden items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500 md:inline-flex"
                        >
                            Products
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
