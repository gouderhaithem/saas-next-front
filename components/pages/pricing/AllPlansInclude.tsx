import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function AllPlansInclude() {
    const features = [
        { title: "AI Background Remover", description: "Remove backgrounds from images instantly with AI." },
        { title: "Object Remover", description: "Erase unwanted objects from your images effortlessly." },
        { title: "Enhance Image Quality", description: "Improve resolution and quality using AI upscaling." },
        { title: "Image to PDF", description: "Convert multiple images into a single high-quality PDF." },
        { title: "TikTok Video Downloader", description: "Download TikTok videos without watermarks easily." },
        { title: "Combine PDF", description: "Merge multiple PDF files into one document." },
        { title: "Split PDF", description: "Split a large PDF into multiple smaller files." },
        { title: "Image to SVG", description: "Convert raster images to vector SVG format." },
    ];

    return (
        <div className="w-full max-w-5xl mx-auto py-12 text-center">
            <h2 className="text-2xl font-bold mb-6">All plans include:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="p-6 flex items-start space-x-4">
                        <CheckCircle className="text-green-500" size={24} />
                        <div className="text-left">
                            <h3 className="text-lg font-semibold">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
