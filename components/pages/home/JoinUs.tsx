import React from "react";

import { Mail } from "lucide-react";


const RightArrow = () => {
    return (
        <div>
            <svg
                width="203"
                height="60"
                viewBox="0 0 203 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="m-0 absolute right-[280px] top-8 bottom-0 hidden min-[1115px]:block"
            >
                <g clipPath="url(#clip0_462_5191)">
                    <path
                        d="M-1.52588e-05 60C8.98547 37.4893 56.9563 7.53412 91.1591 2.21663C128.116 -3.6326 149.42 1.33038 192.898 26.3226C192.318 22.7776 191.594 19.9416 191.304 17.2828C190.869 14.2696 190.434 11.0791 190.579 8.06587C190.579 7.17962 191.883 5.58437 192.753 5.40712C193.623 5.22987 195.072 6.47062 195.362 7.35687C197.97 15.8649 200.289 24.3728 202.753 33.0581C203.478 35.8941 202.608 38.021 200.144 38.9073C190.724 41.7433 181.304 44.7565 171.739 47.4153C169.565 47.947 166.956 47.238 164.057 47.238C166.376 39.6163 171.594 40.5025 175.362 38.5528C179.275 36.4258 183.478 35.1851 188.55 33.0581C176.521 23.1321 164.347 16.9283 151.449 13.0289C104.203 -1.50561 60.7245 10.5474 20.5797 42.8068C15.3623 47.0608 10.5797 52.0238 5.50725 56.455C3.91306 57.3413 2.46375 58.2275 -1.52588e-05 60Z"
                        fill="white"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_462_5191">
                        <rect
                            width="203"
                            height="60"
                            fill="white"
                            transform="matrix(1 0 0 -1 0 60)"
                        />
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

const JoinUs = () => {
    return (
        <section className="m-8 rounded-3xl lg:px-20 container">
            <div
                className="gap-0 min-h-[238px] mb-14 relative  flex flex-col md:flex-row items-center justify-between text-white p-8  rounded-3xl shadow-lg space-y-4"
                style={{
                    backgroundColor: "#FF553E",
                    backgroundImage: ` url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23DDDDDD'/%3E%3Cstop offset='1' stop-color='%239333EA'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%239333EA' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%239333EA' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",





                }}
            >
                <div className="text-center pl-4 md:text-left">
                    <h2 className="mb-2 text-4xl">Join Us and Grow Your Business</h2>
                    <p className="text-[#525252] text-base md:text-lg">
                        Lorem ipsum dolor sit amet consectetur. Nulla egestas amet dui
                        pellentesque et elit.
                    </p>
                </div>
                <RightArrow />
                <button className="lg:relative lg:right-9 bg-white text-black px-6 py-3 flex gap-2 rounded-full font-medium hover:bg-gray-200 transition duration-300 shadow-lg ">
                    <Mail />
                    Join Us Now For Free
                </button>

            </div>
        </section>
    );
};

export default JoinUs;