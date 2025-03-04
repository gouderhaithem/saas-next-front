"use client";

import { useForm } from "react-hook-form";
import { use, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import UserContext from "@/context/UserContext";
import GoogleLoginButton from "@/components/GoogleAuthBtn";
import Image from "next/image";


type LoginFormInputs = {
    email: string;
    password: string;
};

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [callbackUrl, setCallbackUrl] = useState("/"); // Store callbackUrl
    const userCtx = useContext(UserContext);
    const router = useRouter();

    const callbackUrlRef = useRef<string>("/");

    useEffect(() => {
        callbackUrlRef.current = sessionStorage.getItem("callbackUrl") || "/";
    }, []);

    useEffect(() => {
        if (userCtx?.user) {
            sessionStorage.removeItem("callbackUrl");
            router.replace(callbackUrlRef.current);
        }
    }, [userCtx?.user, router]);



    const onSubmit = async (data: LoginFormInputs) => {
        if (!userCtx) return;

        setLoading(true);
        setError("");

        try {
            await userCtx.loginUser(data.email, data.password);

        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <Image src="/logo.png" alt="logo" width={250} height={120} className="mx-auto mb-5" />
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Login to Your Account</h2>

                {error && <p className="text-red-500 text-center pb-4">invalid email or password </p>}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" />
                        <Input
                            type="email"
                            placeholder="Email"
                            className="pl-10"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" />
                        <Input
                            type="password"
                            placeholder="Password"
                            className="pl-10"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">invalid email or password</p>}
                    </div>

                    <Button type="submit" className="w-full bg-[#9333ea] hover:bg-[#9333ea] text-white" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                </form>
                <GoogleLoginButton />

                <p className="mt-4 text-center text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-[#9333ea] font-medium">Register</Link>
                </p>
            </div>
        </div>
    );
}
