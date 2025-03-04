"use client";
import React, { useContext, useState } from "react";
import { Upload, X, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { enhanceQuality } from "@/lib/api/actions/services.action";
import UserContext from "@/context/UserContext";

/* const sampleImages = [
    "/images/cat.webp",
    "/images/women.png",
    "/images/bird.webp",
]; */

const EnhanceQuality = () => {
    const [image, setImage] = useState<string | null>(null);
    const [transformedImage, setTransformedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const userCtx = useContext(UserContext);
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            userCtx?.authRedirect(() => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) setImage(e.target.result as string);
                };
                reader.readAsDataURL(file);
            });
        }
    };


    const handleApplyTransformation = async () => {
        if (!image) return;

        setIsLoading(true);

        try {
            const formData = new FormData();
            const response = await fetch(image);
            const blob = await response.blob();
            formData.append("file", blob, "image.jpg");

            const result = await enhanceQuality(formData);
            if (result?.url) {
                setTransformedImage(result.url);
            }
        } catch (error) {
            console.error("Error applying transformation:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setTransformedImage(null);
    };

    return (
        <Card className="max-w-3xl mx-auto p-6 shadow-lg relative">
            <CardHeader>
                <CardTitle className="text-center">Enhance your Image Quality now</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                {!image ? (
                    <>
                        <label
                            className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer flex flex-col items-center text-center w-full"
                            htmlFor="upload"
                        >
                            <Upload className="w-10 h-10 text-gray-500" />
                            <span className="text-gray-500">Upload or Drag your picture</span>
                        </label>
                        <input
                            type="file"
                            id="upload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                        <p className="text-gray-600">or choose one of these:</p>

                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-4 w-full">
                        <div className="flex space-x-4">
                            <div className="relative">
                                <img src={image} alt="Uploaded" className="max-w-60 rounded-lg shadow-md" />
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                        {transformedImage && (
                            <>
                                <h3 className="font-semibold text-2xl text-[#9333ea]"> Result :</h3>
                                <div>
                                    <img src={transformedImage} alt="Transformed" className="max-w-60 rounded-lg shadow-md" />
                                    <a href={transformedImage} download="enhanced-image.jpg">
                                        <Button className="w-full disabled:opacity-50 max-w-xs mt-4">
                                            <Download className="w-4 h-4" /> <span>Download</span>
                                        </Button>
                                    </a>
                                </div>
                            </>
                        )}
                        <Button
                            onClick={handleApplyTransformation}
                            disabled={isLoading}
                            className="w-full disabled:opacity-50 max-w-xs button2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Apply Transformation"}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default EnhanceQuality;
