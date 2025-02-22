"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileDashboard = () => {
    const [activeTab, setActiveTab] = useState("credits");

    return (
        <div className="relative w-full max-w-3xl mx-auto p-4 md:p-6 bg-white rounded-lg shadow-lg min-h-96">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full ">
                {/* Tabs Navigation - No Scroll Issue */}
                <Card className="shadow-md min-h-96">
                    <CardContent className="p-4">
                        <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-gray-100 p-2 rounded-lg">
                            <TabsTrigger value="credits" >Credits & Plan</TabsTrigger>
                            <TabsTrigger value="billing">Payment & Billing</TabsTrigger>
                            <TabsTrigger value="api">API Keys</TabsTrigger>
                            <TabsTrigger value="earn">Earn Credits</TabsTrigger>
                            <TabsTrigger value="settings">Account Settings</TabsTrigger>
                        </TabsList>

                        {/* Content */}
                        <div className="mt-6">
                            <TabsContent value="credits">
                                <h2 className="text-xl font-semibold">Credits & Plan</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                                    <div className="text-center">
                                        <span className="text-blue-600 text-2xl font-bold">1.00</span>
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
                                        <span className="text-gray-700 text-lg">50 of 50</span>
                                        <p className="text-gray-600 text-sm">Free Previews via API</p>
                                    </div>
                                </div>

                                <div className="mt-6 border-t pt-4">
                                    <h3 className="text-lg font-semibold">Your plan and credits</h3>
                                    <p className="text-blue-500 font-medium">Free Plan</p>
                                    <p className="text-gray-500 text-sm">Non-commercial use only</p>
                                    <p className="text-gray-500 text-sm">You get 0 new credits on Mar 1, 2025</p>

                                    <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                        <Button className="bg-blue-600 text-white w-full sm:w-auto">Change Subscription</Button>
                                        <Button variant="outline" className="border-blue-600 text-blue-600 w-full sm:w-auto">
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
                                <h2 className="text-xl font-semibold">API Keys</h2>
                                <p className="text-gray-600 mt-2">Manage and generate new API keys.</p>
                            </TabsContent>

                            <TabsContent value="earn">
                                <h2 className="text-xl font-semibold">Earn Credits</h2>
                                <p className="text-gray-600 mt-2">Get rewards for referring others.</p>
                            </TabsContent>

                            <TabsContent value="settings">
                                <h2 className="text-xl font-semibold">Account Settings</h2>
                                <p className="text-gray-600 mt-2">Update your account details here.</p>
                            </TabsContent>
                        </div>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
};

export default ProfileDashboard;
