import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, User } from "lucide-react";

import Link from "next/link";

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Create an Account</h2>

                <div className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" />
                        <Input type="text" placeholder="Full Name" className="pl-10" />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" />
                        <Input type="email" placeholder="Email" className="pl-10" />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" />
                        <Input type="password" placeholder="Password" className="pl-10" />
                    </div>
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Register</Button>

                    {/* Google Register Button with SVG Icon */}
                    <Button

                        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="24"
                            height="24"
                        >
                            <path
                                fill="#4285F4"
                                d="M24 9.5c3.54 0 6.7 1.23 9.19 3.68l6.83-6.83C35.65 2.2 30.12 0 24 0 14.65 0 6.72 5.4 2.78 13.26l7.9 6.14C13.02 12.8 18.02 9.5 24 9.5z"
                            />
                            <path
                                fill="#34A853"
                                d="M46.92 24.53c0-1.38-.12-2.72-.35-4h-22v8.13h12.71c-.54 2.67-1.9 4.94-3.95 6.6l6.31 6.11c3.64-3.37 7.28-8.32 7.28-16.84z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M10.68 28.6c-.62-1.78-.96-3.68-.96-5.6s.34-3.82.96-5.6l-7.9-6.14C.89 15.4 0 19.58 0 23s.89 7.6 2.78 11.26l7.9-6.14z"
                            />
                            <path
                                fill="#EA4335"
                                d="M24 48c6.12 0 11.65-2.02 15.88-5.47l-6.31-6.11c-2.25 1.64-5.08 2.62-9.57 2.62-5.98 0-10.98-3.3-13.32-8.9l-7.9 6.14C6.72 42.6 14.65 48 24 48z"
                            />
                        </svg>
                        Sign up with Google
                    </Button>
                </div>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-red-500 font-medium">Login</Link>
                </p>
            </div>
        </div>
    );
}
