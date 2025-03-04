"use client";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import UserContext from "@/context/UserContext";

export default function GoogleLoginButton() {
    const router = useRouter();
    const userCtx = useContext(UserContext);
    const [error, setError] = useState("");

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const token = credentialResponse.credential;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // Ensure cookies are sent and received
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Google login failed");
            }

            // Store user session in context
            userCtx?.setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Save token in cookies (Frontend)
            document.cookie = `token=${data.token}; path=/; Secure; SameSite=Strict`;
            // Retrieve the last visited page (if available)
            const callbackUrl = sessionStorage.getItem("callbackUrl") || "/";
            sessionStorage.removeItem("callbackUrl"); // Clear it after use

            router.replace(callbackUrl);


        } catch (err: any) {
            setError(err.message || "Google login failed");
            console.log(err);
        }
    };

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "1033962804819-juppkudi8jegtjkld8srd2dstauakdfr.apps.googleusercontent.com"}>
            <div className="mt-4 flex w-full justify-center">
                <div className="w-full ">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError("Google login failed")}

                    />
                </div>
                {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </div>
        </GoogleOAuthProvider>
    );
}
