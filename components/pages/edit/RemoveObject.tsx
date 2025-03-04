/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useState } from "react";
import { Upload, X, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { removeObject } from "@/lib/api/actions/services.action";
import UserContext from "@/context/UserContext";

/*const sampleImages = [
    "/images/cat.webp",
    "/images/women.png",
    "/images/bird.webp",
]; */

const RemoveObject = () => {
    const [image, setImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [objectToRemove, setObjectToRemove] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [transformedImage, setTransformedImage] = useState<string | null>(null);
    const userCtx = useContext(UserContext);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            userCtx?.authRedirect(() => {
                const file = event.target.files[0];
                setImageFile(file);

                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) setImage(e.target.result as string);
                };
                reader.readAsDataURL(file);
            });
        }
    };


    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) setImage(e.target.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleApplyTransformation = async () => {
        if (!imageFile || !objectToRemove.trim()) return;

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("objectName", objectToRemove);
            const response = await removeObject(formData);

            setTransformedImage(response.url);
        } catch (error) {
            console.error("Error removing object:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImageFile(null);
        setTransformedImage(null);
        setObjectToRemove("");
    };

    const handleDownloadImage = async () => {
        if (transformedImage) {
            try {
                const response = await fetch(transformedImage);
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'transformed-image.png';
                link.click();
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Failed to download image:', error);
            }
        }
    };

    return (
        <Card className="max-w-2xl mx-auto p-6 shadow-lg relative">
            <CardHeader>
                <CardTitle className="text-center">Remove Object from Image</CardTitle>
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

                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-4 w-full">
                        <div className="relative">
                            <img src={transformedImage || image} alt="Uploaded" className="max-w-72 rounded-lg shadow-md" />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <Input
                            type="text"
                            placeholder="Enter object to remove"
                            className="border p-2 rounded w-full max-w-xs"
                            value={objectToRemove}
                            onChange={(e) => setObjectToRemove(e.target.value)}
                        />

                        <Button
                            onClick={handleApplyTransformation}
                            disabled={!objectToRemove.trim() || isLoading}
                            className="w-full disabled:opacity-50 max-w-xs button2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin " /> : "Apply Transformation"}
                        </Button>

                        {transformedImage && (
                            <Button onClick={handleDownloadImage} className="w-full max-w-xs">
                                <Download className="w-4 h-4" /> Download Image
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default RemoveObject;