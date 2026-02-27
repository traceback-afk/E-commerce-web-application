import { Modal, theme, TextInput, Button, Rating } from "flowbite-react";
import { Search } from "flowbite-react-icons/outline";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [results, setResults] = useState([]);
    const [searchParam, setSearchParam] = useState("");



    useEffect(() => {
    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/product/?search=${searchParam}`);
            if (response.status === 200) {
                setResults(response.data);
            } else {
                console.log(response.data);
            }
        } catch (error: any) {
            // Axios errors store the response here
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log(error.message);
            }
        }
    };

    handleSearch();
}, [searchParam]);
    return (
        <Modal
            onClose={onClose}
            show={isOpen}
            popup
            theme={{
                content: {
                    inner: twMerge(theme.modal.content.inner, "dark:bg-gray-800"),
                },
            }}>
            <Modal.Header className="m-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Advanced search
                </h3>
            </Modal.Header>
            <Modal.Body>
                <form className="mx-auto mb-4 w-full border-b border-gray-200 pb-4 dark:border-gray-700">
                    <label htmlFor="default-search" className="sr-only">
                        Search
                    </label>
                    <TextInput
                        icon={() => (
                            <Search className="size-5 text-gray-500 dark:text-gray-400" />
                        )}
                        id="default-search"
                        name="default-search"
                        placeholder="Search in all categories"
                        required
                        rightIcon={() => <Button type="submit">Search</Button>}
                        size={72}
                        type="search"
                        className="[&_input]:py-4"
                        onChange={(e) => setSearchParam(e.target.value)}
                    />
                </form>
                <div className="mb-4">
                    <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                        Suggested results
                    </h3>
                    {results.length > 0 && searchParam.trim() !== "" && (
                        <ul className="space-y-2 text-sm font-normal text-gray-500 dark:text-gray-400 justify-between">
                            {results.map(result => (
                                <div>
                                    <li className="flex items-center my-1">

                                        <svg
                                            className="me-1 size-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-width="2"
                                                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                            />
                                        </svg>

                                        <Link href={`/products/${result.id}`} className="hover:underline">
                                            {result.name}
                                        </Link>
                                        <img className="size-6 ms-auto" src={result.images[0].image} alt="" />


                                    </li>
                                    <hr />
                                </div>

                            ))}


                        </ul>
                    )}

                </div>
                <div>
                    <h3 className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                        All categories
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">


                        <Link
                            href={'/products-by-category/7'}
                            className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="me-2 size-4 shrink-0 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Books & Media
                            </span>
                        </Link>
                        <Link
                            href={'/products-by-category/3'}
                            className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="me-2 size-4 shrink-0 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Fashion
                            </span>
                        </Link>
                        <Link
                            href={'/products-by-category/6'}
                            className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="me-2 size-4 shrink-0 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-width="2"
                                    d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Sports & Outdoors
                            </span>
                        </Link>

                        <Link
                            href={'/products-by-category/1'}
                            className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="me-2 size-4 shrink-0 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Electronics
                            </span>
                        </Link>
                        <Link
                            href={'/products-by-category/2'}
                            className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="me-2 size-4 shrink-0 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Home & Kitchen
                            </span>
                        </Link>

                        <Link
                            href={'/products-by-category/9'}
                            className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="me-2 size-4 shrink-0 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15.041 13.862A4.999 4.999 0 0 1 17 17.831V21M7 3v3.169a5 5 0 0 0 1.891 3.916M17 3v3.169a5 5 0 0 1-2.428 4.288l-5.144 3.086A5 5 0 0 0 7 17.831V21M7 5h10M7.399 8h9.252M8 16h8.652M7 19h10"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Beauty & Personal Care
                            </span>
                        </Link>

                        <Link
                            href={'/products-by-category/5'}
                            className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="me-2 size-4 shrink-0 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="square"
                                    stroke-width="2"
                                    d="M8 15h7.01v.01H15L8 15Z"
                                />
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="square"
                                    stroke-width="2"
                                    d="M20 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z"
                                />
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="square"
                                    stroke-width="2"
                                    d="M6 9h.01v.01H6V9Zm0 3h.01v.01H6V12Zm0 3h.01v.01H6V15Zm3-6h.01v.01H9V9Zm0 3h.01v.01H9V12Zm3-3h.01v.01H12V9Zm0 3h.01v.01H12V12Zm3 0h.01v.01H15V12Zm3 0h.01v.01H18V12Zm0 3h.01v.01H18V15Zm-3-6h.01v.01H15V9Zm3 0h.01v.01H18V9Z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Toys & Games
                            </span>
                        </Link>
                        <Link
                            href={'/products-by-category/8'}
                            className="flex items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                        >
                            <svg
                                className="me-2 size-4 shrink-0 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                Automotive
                            </span>
                        </Link>

                    </div>
                </div>


            </Modal.Body>
        </Modal>
    );
}