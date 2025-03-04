"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UserContext from "@/context/UserContext";

const Hero2 = () => {
    const [showNoBg, setShowNoBg] = useState(false);
    const router = useRouter();
    const userCtx = useContext(UserContext);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowNoBg((prev) => !prev);
        }, 3000); // Toggle every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-one py-16">
            <div className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left Content */}
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                        We Serve Lot Of <br />
                        <span className="text-purple-600">Services For Customers</span>
                    </h1>
                    <p className="text-gray-600 mt-4">
                        An enim nullam tempor sapien gravida donec enim ipsum porta justo
                        congue magna at.
                    </p>
                    <Button className="mt-6 px-6 py-3 text-lg button2 " onClick={() => userCtx?.authRedirect(() => router.push('/edit/remove-object'))}>Remove the object Now</Button>
                </div>

                {/* Right Content - Image Grid */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="relative col-span-2 bg-gray-200 rounded-xl overflow-hidden">
                        <div className="w-full h-full relative">
                            <Image
                                src="/images/women.png"
                                alt="Business"
                                width={400}
                                height={400}
                                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${showNoBg ? "opacity-0" : "opacity-100"
                                    }`}
                            />
                            <Image
                                src="/images/women-nobg.jpg"
                                alt="Business No BG"
                                width={400}
                                height={400}
                                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${showNoBg ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        </div>

                    </div>

                    <div className="grid grid-rows-2 gap-4">
                        <div className="relative bg-gray-200 rounded-xl overflow-hidden">
                            <Image
                                src="/images/bird.webp"
                                alt="Bird"
                                width={200}
                                height={200}
                                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${showNoBg ? "opacity-0" : "opacity-100"
                                    }`}
                            />
                            <Image
                                src="/images/bird-removed.png"
                                alt="Bird No BG"
                                width={200}
                                height={200}
                                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${showNoBg ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        </div>

                        <div className="relative bg-gray-200 rounded-xl overflow-hidden">
                            <Image
                                src="/images/bags.jpg"
                                alt="Business"
                                width={200}
                                height={200}
                                className="w-full h-full object-cover"
                            />
                            <p className="absolute bottom-2 left-4 text-white font-semibold rotate-[-90deg]">
                                Business
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero2;
