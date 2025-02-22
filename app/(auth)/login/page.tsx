"use client";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import UserContext from "@/context/UserContext";
import GoogleLoginButton from "@/components/GoogleAuthBtn";


type LoginFormInputs = {
    email: string;
    password: string;
};

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const userCtx = useContext(UserContext);
    const router = useRouter();

    if (userCtx?.user) {
        router.push("/"); // Redirect to home if user is already logged

    }

    const onSubmit = async (data: LoginFormInputs) => {
        if (!userCtx) return;

        setLoading(true);
        setError("");

        try {
            await userCtx.loginUser(data.email, data.password);
            router.push("/"); // Redirect after successful login
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Login to Your Account</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

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
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                </form>
                <GoogleLoginButton />

                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link href="/auth/register" className="text-red-500 font-medium">Register</Link>
                </p>
            </div>
        </div>
    );
}
