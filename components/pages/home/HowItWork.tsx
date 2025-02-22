import { UploadCloud, Monitor, Download } from "lucide-react";

const HowItWorksSection = () => {
    return (
        <section className="bg-white py-16 px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">
                How It Works
            </h2>
            <p className="text-gray-600 text-center mt-4 max-w-2xl mx-auto">
                Follow our simple three-step process to get the most out of our suite of tools.
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                    <UploadCloud className="w-12 h-12 text-purple-600" />
                    <h3 className="mt-4 text-xl font-semibold">Upload</h3>
                    <p className="mt-2 text-gray-500">
                        Select the file you want to work on – be it an image, PDF, or video.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                    <Monitor className="w-12 h-12 text-purple-600" />
                    <h3 className="mt-4 text-xl font-semibold">Process</h3>
                    <p className="mt-2 text-gray-500">
                        Our advanced AI tools process your file quickly and efficiently.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                    <Download className="w-12 h-12 text-purple-600" />
                    <h3 className="mt-4 text-xl font-semibold">Download</h3>
                    <p className="mt-2 text-gray-500">
                        Download your enhanced file in your preferred format.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
