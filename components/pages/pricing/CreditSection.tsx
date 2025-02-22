"use client";

import React, { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, XCircle } from "lucide-react";
import UserContext from "@/context/UserContext";
import { createCreditPurchaseSession } from "@/lib/api/actions/checkout.actions";


const CreditSection = () => {
    const userCtx = useContext(UserContext);
    const [loading, setLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePurchase = async (creditPackage: string) => {
        if (!userCtx?.user?.email) {
            setError("You must be logged in to purchase credits.");
            return;
        }

        setLoading(creditPackage);
        setError(null);

        try {
            const checkoutUrl = await createCreditPurchaseSession(userCtx.user.email, creditPackage);
            window.location.href = checkoutUrl; // Redirect to payment
        } catch (err) {
            setError("Failed to initiate purchase. Please try again.");
            console.error(err);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div>
            <div className="relative z-10 text-center pb-8">
                <h1 className="text-3xl font-bold">Get Full Resolution Images</h1>
                <p className="text-lg text-gray-600">1 Editing = 1 CREDIT or more</p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {/* Free Plan */}
                <Card className="p-6 text-center bg-blue-100 border-2 border-blue-500 relative">
                    <Badge className="absolute -top-3 right-3 bg-green-500 flex items-center gap-1">
                        <CheckCircle size={16} /> Selected
                    </Badge>
                    <CardContent>
                        <h2 className="text-2xl font-bold">Free Plan</h2>
                        <p className="text-blue-600 text-3xl font-bold">$0</p>
                        <ul className="mt-4 space-y-2 text-gray-600">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> 20 Free Credits</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Basic Access to Services</li>
                            <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500" /> Priority Customer Support</li>
                            <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500" /> Priority Updates</li>
                        </ul>
                        <Button className="mt-4 w-full button2" disabled>Chosen</Button>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="p-6 text-center border-2 border-blue-500 relative bg-white">
                    <Badge className="absolute -top-3 right-3 bg-yellow-500 flex items-center gap-1">
                        <Star size={16} /> Most Popular
                    </Badge>
                    <CardContent>
                        <h2 className="text-2xl font-bold">Pro Plan</h2>
                        <p className="text-blue-600 text-3xl font-bold">$10</p>
                        <ul className="mt-4 space-y-2 text-gray-600">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> 120 Credits</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Full Access to Services</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Priority Customer Support</li>
                            <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500" /> Priority Updates</li>
                        </ul>
                        <Button
                            className="mt-4 w-full button2"
                            onClick={() => handlePurchase("Medium")}
                            disabled={loading === "Medium"}
                        >
                            {loading === "Medium" ? "Processing..." : "Subscribe now"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Premium Plan */}
                <Card className="p-6 text-center bg-white">
                    <CardContent>
                        <h2 className="text-2xl font-bold">Premium Plan</h2>
                        <p className="text-blue-600 text-3xl font-bold">$100</p>
                        <ul className="mt-4 space-y-2 text-gray-600">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> 2000 Credits</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Full Access to Services</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Priority Customer Support</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Priority Updates</li>
                        </ul>
                        <Button
                            className="mt-4 w-full button2"
                            onClick={() => handlePurchase("Large")}
                            disabled={loading === "Large"}
                        >
                            {loading === "Large" ? "Processing..." : "Subscribe now"}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
};

export default CreditSection;
