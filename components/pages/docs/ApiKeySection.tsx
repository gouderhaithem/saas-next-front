import { Button } from '@/components/ui/button'
import UserContext from '@/context/UserContext';
import { subscribeApi } from '@/lib/api/actions/auth.actions';
import { getApiKey } from '@/lib/api/actions/services.action';
import DialogContainer from "@/components/ui/DialogContainer";
import React, { useContext, useState } from 'react'
import { Copy, Loader2 } from 'lucide-react';

const ApiKeySection = () => {

    const [showDialog, setShowDialog] = useState(false);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const userCtx = useContext(UserContext);
    const [error, setError] = useState<string | null>(null);
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
        <>
            <section

                className="mb-12 border-b pb-6 last:border-0 last:pb-0"
            >
                <h2 className="text-3xl font-semibold mb-2">Start your app with us now</h2>

                {userCtx?.user?.isSubscriber ? (<Button className="button2 my-6" onClick={handleGetApiKey}>
                    {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Show your API key"}
                </Button>) : (

                    <Button className="button2 my-6" onClick={() => userCtx?.authRedirect(handleFreeSubscription)}>   {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "Subscribe to Get your API key"}</Button>)}
                <p className="text-gray-700 mb-4">Explore our API documentation and examples to integrate PurePix into your application or workflow.</p>

            </section>

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
        </>
    )
}

export default ApiKeySection