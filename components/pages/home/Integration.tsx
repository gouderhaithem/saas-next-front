import Image from "next/image";
import { ArrowRight, Layers, Wrench } from "lucide-react";

const IntegrationSection = () => {
    return (
        <section className="bg-third">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-16  md:px-12 max-w-6xl mx-auto">
                {/* Left Side - Illustration */}
                <div className="relative flex-shrink-0 w-full lg:w-1/2">
                    {/* Icons & Graphics */}
                    <div className="absolute left-[-20px] top-10 bg-blue-200 rounded-full p-6 z-20">
                        <Wrench />
                    </div>

                    {/* Main Image */}
                    <div className="relative z-10">
                        <Image
                            src="/images/api.png"
                            alt="Integration Example"
                            width={500}
                            height={300}
                            className="rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Decorative Shapes */}
                    <div className="absolute right-[20px] bottom-[-20px] bg-yellow-200 rounded-full p-6 z-20">
                        <Layers />
                    </div>
                </div>

                {/* Right Side - Text Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Integrate Our <span className="text-purple-600">Powerful Tools</span> Into Your Workflow
                    </h2>
                    <p className="text-gray-600 mt-3">
                        Our AI-driven tools support seamless integration with your favorite platforms. Use our API to automate
                        background removal, image enhancement, PDF management, and more.
                    </p>

                    {/* Links */}
                    <div className="mt-6 flex flex-col md:flex-row items-center md:items-start gap-4">
                        <a href="/pricing/api-pricing" className="text-blue-600 flex items-center gap-2 font-medium hover:underline">
                            Start for free <ArrowRight className="w-5 h-5" />
                        </a>
                        <a href="/api-docs" className="text-blue-600 flex items-center gap-2 font-medium hover:underline">
                            API Documentation <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IntegrationSection;
