"use client";
import ApiKeySection from "@/components/pages/docs/ApiKeySection";
import CodeTabs from "@/components/pages/docs/CodeTabs";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const endpoints = [
    {
        title: "AI Background Remover",
        endpoint: "/api/ai-background-remover",
        description:
            "Remove backgrounds from images instantly using AI. Simply upload your image, and our algorithm will automatically detect and remove the background.",
    },
    {
        title: "Object Remover",
        endpoint: "/api/object-remover",
        description:
            "Erase unwanted objects from your images effortlessly. Specify the area or object you want to remove, and our tool will handle the rest.",
    },
    {
        title: "Enhance Image Quality",
        endpoint: "/api/enhance-image-quality",
        description:
            "Improve the resolution and quality of your images using AI upscaling. Perfect for enhancing photos and graphics.",
    },
    {
        title: "Image to PDF",
        endpoint: "/api/image-to-pdf",
        description:
            "Convert multiple images into a single high-quality PDF. Upload your images and receive a neatly combined PDF document.",
    },
    {
        title: "TikTok Video Downloader",
        endpoint: "/api/tiktok-video-downloader",
        description:
            "Download TikTok videos without watermarks easily. Simply provide the video URL, and our API will return a clean download link.",
    },
    {
        title: "Combine PDF",
        endpoint: "/api/combine-pdf",
        description:
            "Merge multiple PDF files into one document. Upload your PDFs and combine them seamlessly into a single file.",
    },
    {
        title: "Split PDF",
        endpoint: "/api/split-pdf",
        description:
            "Split a large PDF into multiple smaller files. Specify your splitting criteria, and the API will handle the rest.",
    },
    {
        title: "Image to SVG",
        endpoint: "/api/image-to-svg",
        description:
            "Convert raster images to vector SVG format. Perfect for designers who need scalable vector graphics from pixel-based images.",
    },
];


export default function ApiDocs() {
    // Helper functions to generate code samples based on the endpoint.
    const generateNodeExample = (apiEndpoint: any) => {
        return `
const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';
const endpoint = 'https://yourapi.com${apiEndpoint}';
const formData = new FormData();
formData.append('file', yourFile);

axios.post(endpoint, formData, {
  headers: { 'Authorization': \`Bearer \${API_KEY}\` }
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
    `.trim();
    };

    const generatePythonExample = (apiEndpoint: any) => {
        return `
import requests

API_KEY = 'YOUR_API_KEY'
endpoint = 'https://yourapi.com${apiEndpoint}'

payload = { # your request payload }
files = {'file': open('your_file.png', 'rb')}
headers = {'Authorization': f'Bearer {API_KEY}'}

response = requests.post(endpoint, json=payload, files=files,headers=headers)
print(response.json())
    `.trim();
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">API Documentation</h1>
                <p className="text-lg text-gray-700">
                    Welcome to our API documentation. Our API provides a range of powerful AI-driven tools for image processing and PDF manipulation.
                </p>
            </header>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="md:w-1/4 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Endpoints</h2>
                    <nav>
                        <ul className="space-y-4">
                            {endpoints.map((item, index) => (
                                <li key={index}>
                                    <a
                                        href={`#endpoint-${index}`}
                                        className="block text-blue-600 hover:underline transition-colors duration-200"
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="md:w-3/4">
                    <ApiKeySection />

                    {endpoints.map((item, index) => (
                        <section
                            key={index}
                            id={`endpoint-${index}`}
                            className="mb-12 border-b pb-6 last:border-0 last:pb-0"
                        >
                            <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                            <p className="mb-2">
                                <span className="font-medium">Endpoint:</span>{" "}
                                <code className="bg-gray-200 px-2 py-1 rounded text-sm">{item.endpoint}</code>
                            </p>
                            <p className="text-gray-700 mb-4">{item.description}</p>

                            {/* Code Tabs: Show Node.js and Python examples */}
                            <CodeTabs
                                nodeCode={generateNodeExample(item.endpoint)}
                                pythonCode={generatePythonExample(item.endpoint)}
                            />
                        </section>
                    ))}
                </main>
            </div>

            <footer className="mt-12 border-t pt-4">
                <p className="text-gray-600 text-sm">
                    For more detailed information, code examples, and authentication details, please refer to our extended documentation or contact our support team.
                </p>
            </footer>
        </div>
    );
}
