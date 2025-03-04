"use client";
import React, { useContext, useState } from "react";
import { Upload, X, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UserContext from "@/context/UserContext";
// const sampleImages = ["/images/cat.webp", "/images/women.png", "/images/bird.webp"];    

const ConvertImageToPDF = () => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [layout, setLayout] = useState<"portrait" | "landscape">("portrait");
    const [isLoading, setIsLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const userCtx = useContext(UserContext);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            userCtx?.authRedirect(() => {
                const file = event.target.files[0];
                setImageFile(file);
                setPreviewImage(URL.createObjectURL(file));
            });
        }
    };


    const handleSampleImageSelect = async (src: string) => {
        try {
            const response = await fetch(src);
            const blob = await response.blob();

            // Infer MIME type from URL if needed
            const mimeType = blob.type || (src.endsWith(".png") ? "image/png" : "image/jpeg");

            const fileName = src.split("/").pop() || "sample-image";
            const file = new File([blob], fileName, { type: mimeType });

            setImageFile(file);
            setPreviewImage(src);
        } catch (error) {
            console.error("Failed to load sample image", error);
        }
    };


    const handleConvertToPDF = async () => {
        if (!imageFile) return;

        setIsLoading(true);
        setPdfUrl(null);

        try {
            const formData = new FormData();
            formData.append("file", imageFile);

            // Extract token from cookies
            const getTokenFromCookies = () => {
                const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
                return match ? match[1] : null;
            };

            const token = getTokenFromCookies();

            const response = await fetch(`http://localhost:3001/client/images/image-to-pdf?layout=${layout}`, {
                method: "POST",
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to convert image to PDF");
            }

            const blob = await response.blob();
            const pdfBlobUrl = URL.createObjectURL(blob);
            setPdfUrl(pdfBlobUrl);
        } catch (error) {
            console.error("PDF conversion failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewImage(null);
        setPdfUrl(null);
    };

    return (
        <Card className="max-w-2xl mx-auto p-6 shadow-lg relative">
            <CardHeader>
                <CardTitle className="text-center">Convert Your Image to PDF</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                {!previewImage ? (
                    <>
                        <label className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer flex flex-col items-center text-center w-full" htmlFor="upload">
                            <Upload className="w-10 h-10 text-gray-500" />
                            <span className="text-gray-500">Upload or Drag your image here</span>
                        </label>
                        <input type="file" id="upload" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        <p className="text-gray-600">Or choose a sample image:</p>

                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-4 w-full">
                        <div className="relative">
                            <img src={previewImage} alt="Uploaded" className="max-w-60 rounded-lg shadow-md" />
                            <button onClick={handleRemoveImage} className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <label className="flex items-center space-x-2">
                                <input type="radio" value="portrait" checked={layout === "portrait"} onChange={() => setLayout("portrait")} />
                                <span>Portrait (Default)</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" value="landscape" checked={layout === "landscape"} onChange={() => setLayout("landscape")} />
                                <span>Landscape</span>
                            </label>
                        </div>

                        <Button onClick={handleConvertToPDF} disabled={isLoading} className="w-full max-w-xs button2">
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Convert to PDF"}
                        </Button>

                        {pdfUrl && (
                            <a href={pdfUrl} download="converted-image.pdf" className="flex items-center text-blue-600 underline">
                                <Download className="w-5 h-5 mr-2" /> Download PDF
                            </a>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ConvertImageToPDF;
