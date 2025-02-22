import { Card, CardContent } from "@/components/ui/card";
import { Wand2, Eraser, ImagePlus, FileText, Download, Files, Scissors, Image } from "lucide-react";

const features = [
    {
        icon: <Wand2 className="h-10 w-10 text-blue-500" />,
        title: "AI Background Remover",
        description: "Remove backgrounds from images instantly with AI.",
    },
    {
        icon: <Eraser className="h-10 w-10 text-blue-500" />,
        title: "Object Remover",
        description: "Erase unwanted objects from your images effortlessly.",
    },
    {
        icon: <ImagePlus className="h-10 w-10 text-blue-500" />,
        title: "Enhance Image Quality",
        description: "Improve resolution and quality using AI upscaling.",
    },
    {
        icon: <FileText className="h-10 w-10 text-blue-500" />,
        title: "Image to PDF",
        description: "Convert multiple images into a single high-quality PDF.",
    },
    {
        icon: <Download className="h-10 w-10 text-blue-500" />,
        title: "TikTok Video Downloader",
        description: "Download TikTok videos without watermarks easily.",
    },
    {
        icon: <Files className="h-10 w-10 text-blue-500" />,
        title: "Combine PDF",
        description: "Merge multiple PDF files into one document.",
    },
    {
        icon: <Scissors className="h-10 w-10 text-blue-500" />,
        title: "Split PDF",
        description: "Split a large PDF into multiple smaller files.",
    },
    {
        icon: <Image className="h-10 w-10 text-blue-500" />,
        title: "Image to SVG",
        description: "Convert raster images to vector SVG format.",
    },
];

const FeaturesSection = () => {
    return (
        <section className="bg-third bg-white  ">
            <div className="container py-16  text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Some Excellent <span className="bg-fourth text-purple-600">Features</span> For You
                </h2>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                    Powerful tools to enhance, convert, and process your media with ease.
                </p>

                <div className="mt-10 grid mx-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl md:mx-auto">
                    {features.map((feature, index) => (
                        <Card key={index} className="p-6 text-center shadow-md rounded-xl">
                            <CardContent className="flex flex-col items-center">
                                {feature.icon}
                                <h3 className="text-lg font-semibold mt-4">{feature.title}</h3>
                                <p className="text-gray-500 text-sm mt-2">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
