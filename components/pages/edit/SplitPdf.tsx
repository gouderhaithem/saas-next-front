"use client";

import React, { useState } from "react";
import { Upload, X, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { splitPDF } from "@/lib/api/actions/services.action";

const SplitPdf = () => {
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [splitPages, setSplitPages] = useState<{ page: number; url: string }[]>([]);

    const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setPdfFile(event.target.files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setPdfFile(event.dataTransfer.files[0]);
        }
    };

    const handleSplitPdf = async () => {
        if (!pdfFile) return alert("Please upload a PDF file.");

        setIsLoading(true);
        setSplitPages([]);

        try {
            const formData = new FormData();
            formData.append("file", pdfFile);

            const response = await splitPDF(formData);

            if (!response || !Array.isArray(response.pages)) {
                throw new Error("Invalid response format.");
            }

            setSplitPages(response.pages);
        } catch (error) {
            console.error("Failed to split PDF:", error);
            alert("Splitting failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFile = () => {
        setPdfFile(null);
        setSplitPages([]);
    };

    const handleDownloadPage = (url: string, page: number) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = `page-${page}.pdf`;
        link.click();
    };

    return (
        <Card className="max-w-2xl mx-auto p-6 shadow-lg relative">
            <CardHeader>
                <CardTitle className="text-center">Split your PDF into Multiple Files</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                {!pdfFile ? (
                    <>
                        <label
                            className="border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer flex flex-col items-center text-center w-full"
                            htmlFor="upload-pdf"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <Upload className="w-10 h-10 text-gray-500" />
                            <span className="text-gray-500">Upload or Drag your PDF file</span>
                        </label>
                        <input
                            type="file"
                            id="upload-pdf"
                            accept="application/pdf"
                            className="hidden"
                            onChange={handlePdfUpload}
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-4 w-full">
                        <div className="relative bg-gray-100 p-4 rounded-lg w-full text-center">
                            <span className="text-gray-700">{pdfFile.name}</span>
                            <button
                                onClick={handleRemoveFile}
                                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <Button
                            onClick={handleSplitPdf}
                            disabled={isLoading}
                            className="w-full disabled:opacity-50 max-w-xs button2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Split PDF"}
                        </Button>

                        {splitPages.length > 0 && (
                            <div className="w-full space-y-3">
                                <p className="text-center font-semibold">
                                    {splitPages.length} Pages Split Successfully:
                                </p>
                                {splitPages.map(({ page, url }) => (
                                    <div
                                        key={page}
                                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                                    >
                                        <span className="text-gray-700">Page {page}</span>
                                        <Button
                                            onClick={() => handleDownloadPage(url, page)}
                                            size="sm"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SplitPdf;
