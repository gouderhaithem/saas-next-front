"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, UserCircle } from "lucide-react";
import UserContext from "@/context/UserContext";

const NavbarClient = ({ menuItems, services, pricing }) => {
    const router = useRouter();
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const userContext = useContext(UserContext);
    const user = userContext?.user;

    const handleLogout = () => {
        userContext?.logout();
        router.push("/");
    };

    return (
        <div className="hidden md:flex space-x-6 items-center">
            {menuItems.map((item) => (
                <Button
                    key={item.name}
                    variant="ghost"
                    className="text-gray-700 hover:text-[#9333ea] transition-colors font-semibold"
                    onClick={() => router.push(item.path)}
                >
                    {item.name}
                </Button>
            ))}

            {/* Pricing Dropdown */}
            <div className="relative">
                <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-[#9333ea] transition-colors flex items-center font-semibold"
                    onClick={() => setIsPricingOpen(!isPricingOpen)}
                >
                    Pricing <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
                {isPricingOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                        {pricing.map((price) => (
                            <div
                                key={price.name}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    router.push(price.path);
                                    setIsPricingOpen(false);
                                }}
                            >
                                {price.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
                <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-[#9333ea] transition-colors flex items-center font-semibold"
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                    Services <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
                {isServicesOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                        {services.map((service) => (
                            <div
                                key={service.name}
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    router.push(service.path);
                                    setIsServicesOpen(false);
                                }}
                            >
                                {service.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* User Menu */}
            {user ? (
                <div className="relative">
                    <div
                        className="flex items-center cursor-pointer space-x-2"
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    >
                        <UserCircle className="h-8 w-8 text-gray-700" />
                        <ChevronDown className="h-4 w-4 text-gray-700" />
                    </div>
                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
                            <div
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={() => router.push("/profile")}
                            >
                                Profile
                            </div>
                            <div
                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Button
                        variant="outline"
                        className="border-[#9333ea] text-[#9333ea] hover:bg-[#9333ea] hover:text-white transition-all"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </Button>
                    <Button
                        className="bg-[#9333ea] text-white hover:bg-[#1c1a72] transition-all"
                        onClick={() => router.push("/register")}
                    >
                        Register
                    </Button>
                </>
            )}

            {/* Mobile Menu */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="md:hidden">
                        <Menu className="h-6 w-6 text-gray-900" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white shadow-lg">
                    <div className="flex flex-col space-y-4 mt-6">
                        {menuItems.map((item) => (
                            <Button key={item.name} variant="ghost" className="w-full text-left" onClick={() => router.push(item.path)}>
                                {item.name}
                            </Button>
                        ))}
                        {!user ? (
                            <>
                                <Button onClick={() => router.push("/login")} className="border-[#9333ea] border bg-white text-[#9333ea] hover:bg-[#9333ea] hover:text-white transition-all">Login</Button>
                                <Button onClick={() => router.push("/register")} className="bg-[#9333ea] text-white hover:bg-[#1c1a72] transition-all">Register</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => router.push("/profile")} variant="ghost">Profile</Button>
                                <Button onClick={handleLogout} variant="ghost" className="border border-[#9333ea]">Logout</Button>
                            </>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default NavbarClient;
