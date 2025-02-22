"use client";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { removeTikTokWatermark } from "@/lib/api/actions/services.action";


const TikTokNoWaterMark = () => {
    const [link, setLink] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [videoLinks, setVideoLinks] = useState<{
        nowm: string;
        wm: string;
        music: string;
    } | null>(null);


    const handleApplyTransformation = async () => {
        if (!link) return;

        setIsLoading(true);
        setVideoLinks(null);

        try {
            const response = await removeTikTokWatermark(link);
            setVideoLinks(response.data);
            downloadVideo(response.data.nowm, "tiktok_video_no_watermark.mp4");
        } catch (error) {
            console.error("Failed to remove watermark:", error);
            alert("Failed to process TikTok video.");
        } finally {
            setIsLoading(false);
        }
    };

    const downloadVideo = (url: string, filename: string) => {
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        anchor.target = "_blank";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    return (
        <Card className="max-w-2xl mx-auto p-6 shadow-lg relative">
            <CardHeader>
                <CardTitle className="text-center">
                    Download TikTok Video Without Watermark
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                <Input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Paste the TikTok video URL"
                    className="border p-2 rounded w-full max-w-xs"
                />

                <Button
                    onClick={handleApplyTransformation}
                    disabled={isLoading}
                    className="w-full disabled:opacity-50 max-w-xs"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Download Video"}
                </Button>

                {videoLinks && (
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md w-full max-w-md space-y-4 flex flex-col justify-center items-center">
                        <h3 className="text-lg font-semibold text-gray-800">Download Links</h3>
                        <div className="space-y-2">
                            <a
                                href={videoLinks.nowm}
                                target="_blank"
                                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                rel="noopener noreferrer"
                            >
                                <span className="mr-2">📹</span> No Watermark Video
                            </a>
                            <a
                                href={videoLinks.wm}
                                target="_blank"
                                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                rel="noopener noreferrer"
                            >
                                <span className="mr-2">💧</span> With Watermark video
                            </a>
                            <a
                                href={videoLinks.music}
                                target="_blank"
                                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                rel="noopener noreferrer"
                            >
                                <span className="mr-2">🎵</span> Audio (Music)
                            </a>
                        </div>
                    </div>
                )}

            </CardContent>
        </Card>
    );
};

export default TikTokNoWaterMark;
