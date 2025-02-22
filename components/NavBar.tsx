"use client";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, UserCircle } from "lucide-react";
import { useContext, useState } from "react";
import UserContext from "@/context/UserContext";

const Navbar = () => {
    const router = useRouter();
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userContext = useContext(UserContext);
    const user = userContext?.user;
    console.log(user);


    const menuItems = [
        { name: "Home", path: "/" },
        { name: "Docs", path: "/api-docs" },
        { name: "Pricing", path: "/pricing" },
    ];

    const services = [
        { name: "Remove Background", path: "/edit/remove-background" },
        { name: "Remove Object", path: "/edit/remove-object" },
        { name: "Enhance Quality", path: "/edit/enhance-quality" },
        { name: "Image to SVG", path: "/edit/image-to-svg" },
        { name: "TikTok Without Watermark", path: "/edit/tiktok-no-watermark" },
        //  { name: "PDF to Image", path: "/edit/pdf-to-image" },
        { name: "Image to PDF", path: "/edit/image-to-pdf" },
        { name: "Split PDF", path: "/edit/split-pdf" },
        { name: "Merge PDF", path: "/edit/merge-pdf" },
    ];

    const handleLogout = () => {
        userContext?.logout(); // Assuming your context has a logout function
        router.push("/");
    };

    return (
        <nav className="bg-white shadow-md py-4 relative z-50">
            <div className="container px-6 flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-900 cursor-pointer" onClick={() => router.push("/")}>Brand</div>

                <div className="hidden md:flex space-x-6 items-center">
                    {menuItems.map((item) => (
                        <Button
                            key={item.name}
                            variant="ghost"
                            className="text-gray-700 hover:text-[#ff553e] transition-colors"
                            onClick={() => router.push(item.path)}
                        >
                            {item.name}
                        </Button>
                    ))}

                    <div className="relative">
                        <Button
                            variant="ghost"
                            className="text-gray-700 hover:text-[#ff553e] transition-colors flex items-center"
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
                                className="border-[#ff553e] text-[#ff553e] hover:bg-[#ff553e] hover:text-white transition-all"
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </Button>
                            <Button
                                className="bg-[#ff553e] text-white hover:bg-[#e04c34] transition-all"
                                onClick={() => router.push("/register")}
                            >
                                Register
                            </Button>
                        </>
                    )}
                </div>

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
                            <Button variant="ghost" onClick={() => setIsServicesOpen(!isServicesOpen)}>
                                Services
                            </Button>
                            {isServicesOpen && services.map((service) => (
                                <Button key={service.name} variant="ghost" className="w-full text-left" onClick={() => router.push(service.path)}>
                                    {service.name}
                                </Button>
                            ))}

                            {!user ? (
                                <>
                                    <Button onClick={() => router.push("/login")}>Login</Button>
                                    <Button onClick={() => router.push("/register")}>Register</Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => router.push("/profile")}>Profile</Button>
                                    <Button onClick={handleLogout}>Logout</Button>
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
