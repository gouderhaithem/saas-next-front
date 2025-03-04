"use client";

import React, { useContext, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Copy, Star, XCircle } from "lucide-react";
import UserContext from "@/context/UserContext";
import { createCheckoutSession } from "@/lib/api/actions/checkout.actions";
import { subscribeApi } from "@/lib/api/actions/auth.actions";
import DialogContainer from "@/components/ui/DialogContainer";

const ApiSubscriptionSection = () => {
    const userCtx = useContext(UserContext);
    const [loading, setLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const handleSubscription = async (plan: string) => {
        if (!userCtx?.user?.email) {
            setError("You must be logged in to subscribe.");
            return;
        }

        setLoading(plan);
        setError(null);

        try {
            const checkoutUrl = await createCheckoutSession(userCtx.user.email, plan);
            window.location.href = checkoutUrl; // Redirect to payment
        } catch (err) {
            setError("Failed to initiate subscription. Please try again.");
            console.error(err);
        } finally {
            setLoading(null);
        }
    };

    const handleFreeSubscription = async () => {
        if (!userCtx?.user?.email) {
            setError("You must be logged in to subscribe.");
            return;
        }

        setLoading("Free");
        setError(null);

        try {
            const response = await subscribeApi(userCtx.user.email);

            if (response.apiKey) {
                setApiKey(response.apiKey);
                setShowDialog(true);
            }

            const updatedUser = { ...userCtx.user, isSubscriber: true };
            userCtx.setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (err) {
            setError("Failed to subscribe. Please try again.");
            console.error(err);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div>
            <div className="relative z-10 text-center pb-8">
                <h1 className="text-3xl font-bold">API Subscription Plans</h1>
                <p className="text-lg text-gray-600">Choose a plan that suits your needs</p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                {/* Free Plan */}
                <Card className="p-6 text-center  border-2 relative">
                    <CardContent>
                        <h2 className="text-2xl font-bold">Free Plan</h2>
                        <p className="text-blue-600 text-3xl font-bold">$0</p>
                        <ul className="mt-4 space-y-2 text-gray-600">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> 100 API Calls per Month</li>
                            <li className="flex items-center gap-2"><XCircle size={16} className="text-red-500" /> No Priority Support</li>
                        </ul>
                        <Button
                            className="mt-4 w-full button2"
                            disabled={userCtx?.user?.isSubscriber}
                            onClick={!userCtx?.user?.isSubscriber ? handleFreeSubscription : undefined}
                        >
                            {userCtx?.user?.isSubscriber ? "Chosen" : "Subscribe for Free"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="p-6 text-center border-2 border-blue-500 relative bg-white">
                    <Badge className="absolute -top-3 right-3 bg-yellow-500 flex items-center gap-1">
                        <Star size={16} /> Most Popular
                    </Badge>
                    <CardContent>
                        <h2 className="text-2xl font-bold">Pro Plan</h2>
                        <p className="text-blue-600 text-3xl font-bold">$29/month</p>
                        <ul className="mt-4 space-y-2 text-gray-600">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> 10,000 API Calls per Month</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Email Support</li>
                        </ul>
                        <Button
                            className="mt-4 w-full button2"
                            onClick={() => userCtx?.authRedirect(() => handleSubscription("Pro"))}
                            disabled={loading === "Pro"}
                        >
                            {loading === "Pro" ? "Processing..." : "Subscribe Now"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Premium Plan */}
                <Card className="p-6 text-center bg-white">
                    <CardContent>
                        <h2 className="text-2xl font-bold">Premium Plan</h2>
                        <p className="text-blue-600 text-3xl font-bold">$99/month</p>
                        <ul className="mt-4 space-y-2 text-gray-600">
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Unlimited API Calls</li>
                            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> 24/7 Priority Support</li>
                        </ul>
                        <Button
                            className="mt-4 w-full button2"

                            onClick={() => userCtx?.authRedirect(() => handleSubscription("Premium"))}
                            disabled={loading === "Premium"}
                        >
                            {loading === "Premium" ? "Processing..." : "Subscribe Now"}
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {/* API Key Dialog using reusable component */}
            <DialogContainer open={showDialog} onClose={() => setShowDialog(false)} title="Subscription Successful">
                <p className="text-gray-600">Here is your API key:</p>
                <div className="relative group w-full bg-gray-100 p-2 rounded flex items-center">
                    <span className="font-mono text-sm truncate">{apiKey}</span>
                    <button
                        className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handleCopy}
                    >
                        <Copy size={18} className="text-gray-600 hover:text-gray-800" />
                    </button>
                </div>
                {copied && <p className="text-green-600 text-sm mt-2">Copied to clipboard!</p>}
                <Button className="w-full mt-4" onClick={() => setShowDialog(false)}>Close</Button>
            </DialogContainer>
        </div>
    );
};

export default ApiSubscriptionSection;
