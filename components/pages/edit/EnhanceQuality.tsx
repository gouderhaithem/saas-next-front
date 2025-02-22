"use client";
import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const sampleImages = [
    "/images/cat.webp",
    "/images/women.png",
    "/images/bird.webp",
];

const EnhanceQuality = () => {
    const [image, setImage] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) setImage(e.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault(); // Prevent default behavior
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) setImage(e.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleApplyTransformation = () => {
        if (!image) return;

        setIsLoading(true);
        console.log(`Applying transformation `);

        setTimeout(() => {
            setIsLoading(false);
            console.log("Transformation completed!");
        }, 3000);
    };

    const handleRemoveImage = () => {
        setImage(null);

    };

    return (
        <Card className="max-w-2xl mx-auto p-6 shadow-lg relative">
            <CardHeader>
                <CardTitle className="text-center">Enhance your Image Quality now</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                {!image ? (
                    <>
                        <label
                            className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer flex flex-col items-center text-center w-full"
                            htmlFor="upload"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
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
                            <img src={image} alt="Uploaded" className="max-w-60 rounded-lg shadow-md" />
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
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Apply Transformation"}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default EnhanceQuality;
