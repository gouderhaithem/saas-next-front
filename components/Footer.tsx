import React from "react";

import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    PhoneCall,
    X,
} from "lucide-react";
const Footer = () => {
    return (
        <footer className="bg-[#F0F0F0] py-8 px-8 sm:px-20  items-center w-full ">
            <center>
                Logo
            </center>

            <div className="text-[#2D2C2B] flex justify-between flex-wrap  gap-4 border border-t-black pt-4 mt-4 ">
                {/* Reach Us Section */}
                <div className="w-full sm:w-[200px]">
                    <p
                        className="font-bold  font-[
Poppins] text-lg text pb-3"
                    >
                        Reach us
                    </p>
                    <ul className="text-[#2D2C2B] text-sm flex flex-col gap-4  ">
                        <li className="flex items-center gap-4">
                            <span className="mr-2 ">
                                <PhoneCall
                                    fill="true"
                                    className="text-[#2D2C2B]"
                                    color="#2D2C2B"
                                />{" "}
                            </span>{" "}
                            +213 3456 789
                        </li>
                        <li className="flex items-center gap-4">
                            <span className="mr-2">
                                <Mail fill="true" />
                            </span>{" "}
                            Lassist@gmail.com
                        </li>
                        <li className="flex items-center gap-4">
                            <span className=" mr-2">
                                <MapPin fill="true" />
                            </span>{" "}
                            Algeria
                        </li>
                    </ul>
                </div>
                {/* Company Section */}
                <div className="w-full sm:w-[200px]">
                    <p
                        className="font-bold  font-[
Poppins] text-lg text pb-3"
                    >
                        Company
                    </p>
                    <ul className="text-[#2D2C2B] text-sm flex flex-col gap-4 ">
                        <li className="">About</li>
                        <li className="">Contact</li>
                        <li className="">Service</li>
                    </ul>
                </div>
                {/* Legal Section */}
                <div className="w-full sm:w-[200px]">
                    <p
                        className="font-bold  font-[
Poppins] text-lg text pb-3"
                    >
                        Legal
                    </p>
                    <ul className="text-[#2D2C2B] text-sm flex flex-col gap-4 ">
                        <li className="">Privacy Policy</li>
                        <li className="">Terms & Services</li>
                        <li className="">Terms of Use</li>
                        <li>Refund Policy</li>
                    </ul>
                </div>
                <div className="w-full sm:w-[200px]">
                    <p
                        className="font-bold  font-[
Poppins] text-lg text pb-3"
                    >
                        Quick Links
                    </p>
                    <ul className="text-[#2D2C2B] text-sm flex  gap-2 ">
                        <li className="border border-black rounded-full p-2 w-fit opacity-50">
                            <Facebook />
                        </li>
                        <li className="border border-black rounded-full p-2 w-fit opacity-50">
                            {" "}
                            <Instagram />
                        </li>
                        <li className="border border-black rounded-full p-2 w-fit opacity-50">
                            <X />{" "}
                        </li>
                        <li className="border border-black rounded-full p-2 w-fit opacity-50">
                            <Linkedin />
                        </li>
                    </ul>
                </div>
                <div className="hidden w-[304px] bg-black rounded-xl text-white h-[184px] p-4 flex-col justify-between">
                    {/* Title */}
                    <p className="font-size-paragraph2">Join Our Newsletter</p>

                    {/* Input and Button */}
                    <div className="flex ">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className=" bg-white text-black rounded-l-[4px] px-3 py-2 focus:outline-none w-[172px]"
                        />
                        <button className="bg-[#2D2C2B] text-white px-4 py-2 rounded-r-[4px] font-medium w-[105px]">
                            Subscribe
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm mt-2 opacity-50">
                        * Will send you weekly updates for your better tool management.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;