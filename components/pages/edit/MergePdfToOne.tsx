"use client";
import React, { useContext, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import UserContext from "@/context/UserContext";
const MergePdf = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const userCtx = useContext(UserContext);

    const handleFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            userCtx?.authRedirect(() => {
                setFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files)]);
            });
        }
    };


    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files) {
            setFiles((prevFiles) => [...prevFiles, ...Array.from(event.dataTransfer.files)]);
        }
    };

    const handleRemoveFiles = () => {
        setFiles([]);
    };

    const handleMergePDFs = async () => {
        if (files.length < 2) {
            alert("Please upload at least two PDF files.");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        try {
            const getTokenFromCookies = () => {
                const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
                return match ? match[1] : null;
            };

            const token = getTokenFromCookies();
            const response = await axios.post("http://localhost:3001/client/pdf/merge", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",

                    Authorization: token ? `Bearer ${token}` : "",
                },
                responseType: 'blob', // Important for downloading binary data
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `merged-${Date.now()}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Failed to merge PDFs", error);
            alert("Failed to merge PDFs");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto p-6 shadow-lg relative">
            <CardHeader>
                <CardTitle className="text-center">Merge Your PDFs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                {files.length === 0 ? (
                    <>
                        <label
                            className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer flex flex-col items-center text-center w-full"
                            htmlFor="upload"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <Upload className="w-10 h-10 text-gray-500" />
                            <span className="text-gray-500">Upload or Drag PDF files (at least 2)</span>
                        </label>
                        <input
                            type="file"
                            id="upload"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handleFilesUpload}
                            multiple
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-4 w-full">
                        <ul className="list-disc text-gray-700">
                            {files.map((file, index) => (
                                <li key={index}>{file.name}</li>
                            ))}
                        </ul>
                        <div className="flex space-x-4">
                            <Button onClick={handleRemoveFiles} className="bg-red-500 text-white">Remove Files</Button>
                            <label className="bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer">
                                Add More PDFs
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={handleFilesUpload}
                                    multiple
                                />
                            </label>
                        </div>
                        <Button
                            onClick={handleMergePDFs}
                            disabled={isLoading}
                            className="w-full disabled:opacity-50 max-w-xs button2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Merge PDFs"}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default MergePdf;
