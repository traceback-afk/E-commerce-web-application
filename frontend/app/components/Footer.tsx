import { Footer } from "flowbite-react";
import Link from "next/link";

export function FooterSection() {
  return (
    <div className="w-full border-t-2 bg-white">
      <Footer className="w-full rounded-none p-4 sm:p-6">
        <div className="mx-auto w-full max-w-none">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
            <div className="flex items-center">
                        <Link href={"/HomePage"}>
                            <i className="bi bi-shop ms-5 dark:text-white text-primary-600 text-3xl"></i>
                            <i className="font-bold text-xl text-primary-600 dark:text-white">Shop</i>
                        </Link>

                    </div>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
              <div>
                <Footer.Title title="IMPORTANT LINKS" className="text-gray-800" />
                <Footer.LinkGroup
                  className="text-base text-gray-600 dark:text-gray-400"
                  col
                >
                  <Footer.Link href="/HomePage">Home</Footer.Link>
                  
                  <Footer.Link href="/ContactUs">Contact Us</Footer.Link>
                 <Footer.Link href="/AboutUs">About Us</Footer.Link>
                 <Footer.Link href="/AllProducts">Products</Footer.Link>


                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Legal" className="text-gray-800" />
                <Footer.LinkGroup
                  className="text-base text-gray-600 dark:text-gray-400"
                  col
                >
                  <Footer.Link href="#">Privacy Policy</Footer.Link>
                  <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              by="E-commerce™. All Rights Reserved."
              href=""
              year={2025}
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  className="size-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* Other social media icons */}
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}