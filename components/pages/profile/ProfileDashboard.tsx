"use client";

import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Loader2, LogOut, User } from "lucide-react";
import DialogContainer from "@/components/ui/DialogContainer";

import UserContext from "@/context/UserContext";
import { getApiKey } from "@/lib/api/actions/services.action";

import { useRouter } from "next/navigation";
import { subscribeApi } from "@/lib/api/actions/auth.actions";
import { getUserData } from "@/lib/api/actions/user.actions";


const ProfileDashboard = () => {
    const [activeTab, setActiveTab] = useState("credits");
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showProfileDialog, setShowProfileDialog] = useState(false);
    const router = useRouter();
    const userCtx = useContext(UserContext);
    interface UserData {
        username: string;
        credit: number;
        email: string;
        isSubscriber: boolean;
        creditPackage: string;
        queryLimit: number;
        usageCount: number;
        // Add other properties as needed
    }

    const [userData, setUserData] = useState<UserData | null>(null);
    useEffect(() => {
        if (!userCtx?.user) {
            router.push("/login");
        }
    }, [userCtx, router]);

    useEffect(() => {
        const getUserInfo = async () => {
            if (!userCtx?.user?.email) return;
            try {
                const response = await getUserData(userCtx.user.email);
                setUserData(response);


            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        getUserInfo();
    }, [userCtx]);

    const handleFreeSubscription = async () => {
        if (!userCtx?.user?.email) {
            setError("You must be logged in to subscribe.");
            return;
        }

        setLoading(true);
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
            setLoading(false);
        }
    };

    const handleGetApiKey = async () => {
        if (!userCtx?.user?.email) return;
        setLoading(true);
        try {
            const response = await getApiKey(userCtx.user.email);
            setApiKey(response.apiKey);
            setShowDialog(true);
        } catch (error) {
            console.error("Error fetching API key:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (apiKey) {
            navigator.clipboard.writeText(apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 500);
        }
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg min-h-96">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <Card className="shadow-md min-h-96">
                    <CardContent className="p-4">
                        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-gray-100 p-2 rounded-lg">
                            <TabsTrigger value="credits">Credits & Plan</TabsTrigger>
                            <TabsTrigger value="billing">Payment & Billing</TabsTrigger>
                            <TabsTrigger value="api">API Keys</TabsTrigger>
                            <TabsTrigger value="settings">Account Settings</TabsTrigger>
                        </TabsList>

                        <div className="mt-6">
                            <TabsContent value="credits">
                                <h2 className="text-xl font-semibold">Credits & Plan</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                    <div className="text-center">
                                        <span className="text-blue-600 text-2xl font-bold">{userData?.credit}.00</span>
                                        <p className="text-gray-600 text-sm">Total Credits</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-gray-500 text-2xl font-bold">0.00</span>
                                        <p className="text-gray-600 text-sm">Subscription Credits</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-blue-600 text-2xl font-bold">1.00</span>
                                        <p className="text-gray-600 text-sm">Pay as you go Credits</p>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-gray-700 text-lg">{userData?.credit} of 50</span>
                                        <p className="text-gray-600 text-sm">{userData?.creditPackage} Previews via API</p>
                                    </div>
                                </div>

                                <div className="mt-6 border-t pt-4">
                                    <h3 className="text-lg font-semibold">Your plan and credits</h3>
                                    <p className="text-blue-500 font-medium">{userData?.creditPackage} Plan</p>
                                    <p className="text-gray-500 text-sm">Non-commercial use only</p>
                                    <p className="text-gray-500 text-sm">You get 0 new credits on Mar 1, 2025</p>

                                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                        <Button className="bg-blue-600 text-white w-full sm:w-auto" onClick={() => router.push("/pricing/credit-pricing")}>
                                            Change Subscription
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-blue-600 text-blue-600 w-full sm:w-auto"
                                        >
                                            Buy Credits
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="billing">
                                <h2 className="text-xl font-semibold">Payment & Billing</h2>
                                <p className="text-gray-600 mt-2">Manage your billing details here.</p>
                            </TabsContent>

                            <TabsContent value="api">
                                {!userCtx?.user?.isSubscriber ? (
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-xl font-semibold">API Key</h2>
                                        <Button className="button2" onClick={handleFreeSubscription}>
                                            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Subscribe to Get your API key"}
                                        </Button>

                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col gap-2">
                                            <h2 className="text-xl font-semibold">API Key</h2>
                                            <Button className="button2" onClick={handleGetApiKey}>
                                                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Show your API key"}
                                            </Button>
                                            <p className="text-gray-600 mt-2">Manage and generate new API keys.</p>
                                        </div>
                                        <div className="mt-6 border-t pt-4">
                                            <h3 className="text-lg font-semibold">Your plan and credits</h3>
                                            <p className="text-blue-500 font-medium">Free Plan</p>
                                            <p className="text-gray-500 text-sm">Non-commercial use only</p>
                                            <p className="text-gray-500 text-sm">You get 90 new call on Mar 1, 2025</p>

                                            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                                <Button className="button2 w-full sm:w-auto" onClick={() => router.push("/pricing/api-pricing")}>
                                                    Change Subscription
                                                </Button>

                                            </div>
                                        </div>
                                    </>
                                )}

                            </TabsContent>

                            <TabsContent value="settings">
                                <h2 className="text-xl font-semibold">Account Settings</h2>
                                <p className="text-gray-600 mt-2">Manage your account details and security settings.</p>

                                <div className="mt-6 space-y-4">
                                    <div className="border p-4 rounded-lg">
                                        <h3 className="text-lg font-medium">Profile Information</h3>
                                        <p className="text-gray-600 text-sm mt-1">View your profile details.</p>
                                        <Button className="mt-2 bg-blue-600 text-white flex items-center" onClick={() => setShowProfileDialog(true)}>
                                            <User className="mr-1" size={18} /> Show Profile Information
                                        </Button>
                                    </div>






                                    <div className="border p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-red-600">Log outt</h3>
                                        <p className="text-gray-600 text-sm mt-1">Sign out of your account securely.</p>
                                        <Button className="mt-2 bg-red-600 text-white  flex items-center" >
                                            <LogOut className="mr-1" size={18} />  Log out
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                        </div>
                    </CardContent>
                </Card>
            </Tabs>

            {/* API Key Dialog */}
            <DialogContainer open={showDialog} onClose={() => setShowDialog(false)} title="Your API Key">
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
            {/* Profile Dialog */}
            <DialogContainer open={showProfileDialog} onClose={() => setShowProfileDialog(false)} title="Profile Information">
                {userData ? (
                    <div className="text-start">
                        <User className="text-blue-600 mx-auto mb-4" size={40} />
                        <p className="text-lg font-semibold">{userData.username}</p>
                        <p className="text-gray-600">{userData.email}</p>
                        <p className="text-gray-500 mt-2">Credits: {userData.credit}</p>
                        <p className="text-gray-500">Plan: {userData.creditPackage}</p>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Loader2 className="animate-spin text-blue-600" size={24} />
                    </div>
                )}
                <Button className="w-full mt-4" onClick={() => setShowProfileDialog(false)}>Close</Button>
            </DialogContainer>
        </div>
    );
};

export default ProfileDashboard;
