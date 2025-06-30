import { Badge, Carousel } from "flowbite-react";
import { ArrowRight } from "flowbite-react-icons/outline";

export default function Slider() {
    return (
        <section className=" overflow-hidden bg-white antialiased">
            <div className="relative w-full">
                <Carousel indicators className="h-[512px] w-screen [&>div]:rounded-none">
                    <div className="absolute left-1/2 top-1/2 block size-full -translate-x-1/2 -translate-y-1/2 bg-[url('https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-image.jpg')] bg-cover bg-center bg-no-repeat">
                        <div className="absolute top-1/2 z-10 w-full max-w-[512px] -translate-y-1/2 px-4 sm:left-1/2 sm:-translate-x-1/2 lg:-translate-x-8 lg:px-0">
                            <a
                                href="#"
                                className="mb-5 inline-flex items-center justify-between rounded-full bg-white/10 p-1 pr-4 text-sm text-white hover:bg-white/20"
                                role="alert"
                            >
                                <span className="mr-3 rounded-xl bg-white/30 px-4 py-1 text-xs font-medium">
                                    Sale
                                </span>
                                <span className="mr-1 text-sm font-medium">
                                    Up to 30% OFF if you order today
                                </span>
                                <ArrowRight className="size-5" />
                            </a>
                            <h2 className="mb-3 text-3xl font-extrabold leading-none text-white lg:text-5xl">
                                Save today on your new iMac computer.
                            </h2>
                            <p className="mb-5 text-gray-200">
                                Reserve your new Apple iMac 27” today and enjoy exclusive
                            </p>

                        </div>
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="absolute left-1/2 top-1/2 block size-full -translate-x-1/2 -translate-y-1/2 bg-[url('/slide1.jpg')] bg-cover bg-center bg-no-repeat">
                        <div className="absolute top-1/2 z-10 w-full max-w-[512px] -translate-y-1/2 px-4 sm:right-1/2 sm:translate-x-1/2 lg:translate-x-8 lg:px-0">
                            <Badge color="yellow" className="mb-5 inline-block">
                                New arrival
                            </Badge>
                            <h2 className="mb-3 text-3xl font-extrabold leading-none text-white lg:text-5xl">
                                New arrivals picked just for you
                            </h2>
                            <p className="mb-5 text-gray-200">
                                Less is more never out of date.
                            </p>

                        </div>
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="absolute left-1/2 top-1/2 block size-full -translate-x-1/2 -translate-y-1/2 bg-[url('/slide2.png')] bg-cover bg-center bg-no-repeat">
                        <div className="absolute top-1/2 z-10 w-full max-w-[512px] -translate-y-1/2 px-4 sm:left-1/2 sm:-translate-x-1/2 lg:-translate-x-8 lg:px-0">
                            <a
                                href="#"
                                className="mb-5 inline-flex items-center justify-between rounded-full bg-white/10 p-1 pr-4 text-sm text-white hover:bg-white/20"
                                role="alert"
                            >
                                <span className="mr-3 rounded-xl bg-white/30 px-4 py-1 text-xs font-medium">
                                    Offer
                                </span>
                                <span className="mr-1 text-sm font-medium">
                                    Save $25 when you spend $250 In-Store or Online
                                </span>
                                <svg
                                    className="size-5"
                                    aria-hidden
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
                                        d="M19 12H5m14 0-4 4m4-4-4-4"
                                    />
                                </svg>
                            </a>
                            <h2 className="mb-3 text-3xl font-extrabold leading-none text-white lg:text-5xl">
                                Gamers Favorites. Best Sellers.
                            </h2>
                            <p className="mb-5 text-gray-200">
                                The  largest retail gaming and trade-in destination for
                            </p>
                        </div>
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                </Carousel>
            </div>
        </section>
    );
}