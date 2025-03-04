"use client";

import React, { useContext, useState } from "react";
import { Upload, X, Loader2, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { imageToSVG } from "@/lib/api/actions/services.action";
import UserContext from "@/context/UserContext";

const ImageToSVG = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const userCtx = useContext(UserContext);
    const handleFileUpload = (file: File) => {
        userCtx?.authRedirect(() => {
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target?.result as string);
            reader.readAsDataURL(file);
        });
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            handleFileUpload(event.target.files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            handleFileUpload(event.dataTransfer.files[0]);
        }
    };

    const handleConvertToSvg = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setSvgContent(null);

        try {
            const formData = new FormData();
            formData.append("file", selectedFile); // Append the file

            const response = await imageToSVG(formData); // Send as FormData
            setSvgContent(response); // SVG content (XML) from backend
        } catch (error) {
            console.error("Failed to convert image to SVG", error);
            alert("Conversion failed. Check console for details.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleCopySvgCode = () => {
        if (svgContent) {
            navigator.clipboard.writeText(svgContent);
            alert("SVG code copied to clipboard!");
        }
    };

    const handleDownloadSvg = () => {
        if (!svgContent) return;

        const blob = new Blob([svgContent], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "converted-image.svg";
        a.click();

        URL.revokeObjectURL(url);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setImagePreview(null);
        setSvgContent(null);
    };

    return (
        <Card className="max-w-2xl mx-auto p-6 shadow-lg relative">
            <CardHeader>
                <CardTitle className="text-center">Convert Image to SVG</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                {!imagePreview ? (
                    <>
                        <label
                            className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer flex flex-col items-center text-center w-full"
                            htmlFor="upload"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <Upload className="w-10 h-10 text-gray-500" />
                            <span className="text-gray-500">Upload or Drag your Image</span>
                        </label>
                        <input
                            type="file"
                            id="upload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleInputChange}
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-4 w-full">
                        <div className="relative">
                            <img src={imagePreview} alt="Uploaded" className="max-w-60 rounded-lg shadow-md" />
                            <button
                                onClick={handleRemoveFile}
                                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <Button
                            onClick={handleConvertToSvg}
                            disabled={isLoading}
                            className="w-full disabled:opacity-50 max-w-xs button2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Convert to SVG"}
                        </Button>

                        {svgContent && (
                            <div className="bg-gray-100 p-4 rounded-lg w-full">
                                <div className="flex gap-2 mb-4">
                                    <Button onClick={handleDownloadSvg} size="sm">
                                        <Download className="w-4 h-4 mr-2" />
                                        Download SVG
                                    </Button>
                                    <Button onClick={handleCopySvgCode} size="sm" variant="outline">
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy SVG Code
                                    </Button>
                                </div>

                                <div className="max-h-40 overflow-auto border p-2 bg-white text-sm font-mono whitespace-pre-wrap">
                                    {svgContent}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ImageToSVG;
