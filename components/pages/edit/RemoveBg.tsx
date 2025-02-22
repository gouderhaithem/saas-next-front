"use client";
import React, { useContext, useState } from "react";
import { Upload, X, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { removeBg } from "@/lib/api/actions/services.action";
import UserContext from "@/context/UserContext";

const sampleImages = [
    "/images/cat.webp",
    "/images/women.png",
    "/images/bird.webp",
];

const RemoveBg = () => {
    const [image, setImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isTransformed, setIsTransformed] = useState(false);

    const { token } = useContext(UserContext) || {};

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            setIsTransformed(false);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) setImage(e.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleApplyTransformation = async () => {
        if (!selectedFile || !token) return;

        setIsLoading(true);
        try {
            const processedData = await removeBg(selectedFile, token, "2dc25d79c791fb0b6c486a5b3aabb1d95975ec324325a014ee90caa559d71787");
            setProcessedImage(processedData.url);
            setIsTransformed(true);
        } catch (error) {
            console.error("Error processing image:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setProcessedImage(null);
        setIsTransformed(false);
    };

    return (
        <Card className="max-w-2xl mx-auto p-6 shadow-lg relative">
            <CardHeader>
                <CardTitle className="text-center">Remove Background using AI now</CardTitle>
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
                        <div className="flex space-x-4">
                            {sampleImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Sample ${index + 1}`}
                                    className="w-20 h-20 rounded-lg cursor-pointer shadow-md hover:scale-105 transition"
                                    onClick={() => setImage(src)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-4 w-full">
                        <div className="relative">
                            <img
                                src={isTransformed ? processedImage || image : image}
                                alt="Uploaded"
                                className={`max-w-60 rounded-lg shadow-md transition-opacity duration-500 ${isTransformed ? "opacity-100" : "opacity-0"}`}
                                onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <Button
                            onClick={handleApplyTransformation}
                            disabled={isLoading}
                            className="w-full disabled:opacity-50 max-w-xs button2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin " /> : "Apply Transformation"}
                        </Button>

                        {processedImage && (
                            <a
                                href={processedImage}
                                download="processed-image.png"
                                className="mt-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                            >
                                <Download className="w-5 h-5 mr-2" /> Download Image
                            </a>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RemoveBg;
