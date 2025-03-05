// components/NavBar.tsx
"use client";

import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { Menu, LogIn, UserPlus, User, LogOut, ChevronDown, FileText, DollarSign, Settings, UserCircle, Home, BookX, Merge, Split, FileArchive, FileSymlink, Scissors, Wand, ImageIcon } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import UserContext from "@/context/UserContext";
import Image from "next/image";

const Navbar = () => {
    const router = useRouter();
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isPricingOpen, setIsPricingOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        if (user !== undefined) {
            setIsLoading(false); // Set loading to false once user is confirmed
        }
    }, [user]);

    const menuItems = [
        { name: "Home", path: "/", icon: Home },
        { name: "Docs", path: "/api-docs", icon: BookX },
    ];

    const services = [
        { name: "Remove Background", path: "/edit/remove-background", icon: ImageIcon }, // Image-related
        { name: "Remove Object", path: "/edit/remove-object", icon: Scissors }, // Scissors for cutting/removing
        { name: "Enhance Quality", path: "/edit/enhance-quality", icon: Wand }, // Magic wand for enhancement
        { name: "Image to SVG", path: "/edit/image-to-svg", icon: FileSymlink }, // FileSymlink for conversion
        { name: "TikTok Without Watermark", path: "/edit/tiktok-no-watermark", icon: FileArchive }, // Archive symbol
        { name: "Image to PDF", path: "/edit/image-to-pdf", icon: FileText }, // Standard file text icon
        { name: "Split PDF", path: "/edit/split-pdf", icon: Split }, // Split icon for splitting PDFs
        { name: "Merge PDF", path: "/edit/merge-pdf", icon: Merge }, // Merge icon for merging PDFs
    ];

    const pricing = [
        { name: "Credit Pricing", path: "/pricing/credit-pricing", icon: DollarSign }, // Dollar sign for pricing
        { name: "API Pricing", path: "/pricing/api-pricing", icon: DollarSign }, // Same dollar icon
    ];

    const handleLogout = () => {
        userContext?.logout();
        router.push("/");
    };

    return (
        <nav className="bg-white shadow-md py-2 relative z-50">
            <div className="container px-6 flex justify-between items-center">
                <div className="cursor-pointer" onClick={() => router.push("/")}>
                    <Image src="/logo.png" alt="logo" width={200} height={63} />
                </div>

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
                    {!isLoading && ( // Only render user-specific parts after loading is complete
                        <>
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
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="md:hidden">
                            <Menu className="h-6 w-6 text-gray-900" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="bg-white shadow-lg p-4 max-h-screen overflow-y-auto">
                        <div className="flex flex-col space-y-3 mt-6">
                            {menuItems.map((item) => (
                                <Button
                                    key={item.name}
                                    variant="ghost"
                                    className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg"
                                    onClick={() => router.push(item.path)}
                                >
                                    <div className="flex items-center gap-2">
                                        {item.icon && <item.icon className="h-5 w-5 text-gray-700" />}
                                        {item.name}
                                    </div>
                                </Button>
                            ))}

                            {/* Services Dropdown */}
                            <Button
                                variant="ghost"
                                className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg"
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                            >
                                <div className="flex items-center gap-2">
                                    <Settings className="h-5 w-5 text-gray-700" />
                                    Services
                                </div>
                                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? "rotate-180" : ""}`} />
                            </Button>
                            {isServicesOpen && services.map((service) => (
                                <Button
                                    key={service.name}
                                    variant="ghost"
                                    className="hover:bg-gray-100 rounded-lg flex justify-start gap-2 w-full text-left pl-8 py-2 px-4"
                                    onClick={() => router.push(service.path)}
                                >
                                    {service.icon && <service.icon className="h-4 w-4 text-gray-500" />}
                                    {service.name}
                                </Button>
                            ))}

                            {/* Pricing Dropdown */}
                            <Button
                                variant="ghost"
                                className="flex items-center justify-between w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg"
                                onClick={() => setIsPricingOpen(!isPricingOpen)}
                            >
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-gray-700" />
                                    Pricing
                                </div>
                                <ChevronDown className={`h-4 w-4 transition-transform ${isPricingOpen ? "rotate-180" : ""}`} />
                            </Button>
                            {isPricingOpen && pricing.map((price) => (
                                <Button
                                    key={price.name}
                                    variant="ghost"
                                    className=" hover:bg-gray-100 rounded-lg flex justify-start gap-2 w-full text-left pl-8 py-2 px-4"
                                    onClick={() => router.push(price.path)}
                                >
                                    {price.icon && <price.icon className="h-4 w-4 text-gray-500" />}
                                    {price.name}
                                </Button>
                            ))}

                            {/* User Authentication Section */}
                            {!isLoading && (
                                <>
                                    {!user ? (
                                        <>
                                            <Button
                                                onClick={() => router.push("/login")}
                                                className="flex items-center gap-2 border-[#9333ea] border bg-white text-[#9333ea] hover:bg-[#9333ea] hover:text-white transition-all"
                                            >
                                                <LogIn className="h-5 w-5" />
                                                Login
                                            </Button>
                                            <Button
                                                onClick={() => router.push("/register")}
                                                className="flex items-center gap-2 bg-[#9333ea] text-white hover:bg-[#1c1a72] transition-all"
                                            >
                                                <UserPlus className="h-5 w-5" />
                                                Register
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={() => router.push("/profile")}
                                                className="flex items-center gap-2 border border-gray-300"
                                            >
                                                <User className="h-5 w-5" />
                                                Profile
                                            </Button>
                                            <Button
                                                onClick={handleLogout}
                                                variant="ghost"
                                                className="flex items-center gap-2 border border-[#9333ea]"
                                            >
                                                <LogOut className="h-5 w-5" />
                                                Logout
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;