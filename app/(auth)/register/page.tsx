import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail, User } from "lucide-react";

import Link from "next/link";
import GoogleLoginButton from "@/components/GoogleAuthBtn";
import Image from "next/image";

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <Image src="/logo.png" alt="logo" width={250} height={120} className="mx-auto mb-5" />
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
                    <Button className="w-full bg-[#9333ea] hover:bg-[#9333ea] text-white">Register</Button>

                    {/* Google Register Button with SVG Icon */}
                    <GoogleLoginButton />
                </div>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#9333ea] font-medium">Login</Link>
                </p>
            </div>
        </div>
    );
}
