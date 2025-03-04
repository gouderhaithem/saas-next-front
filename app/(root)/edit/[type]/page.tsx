import EnhanceQuality from "@/components/pages/edit/EnhanceQuality";
import ImageToPdf from "@/components/pages/edit/ImageToPdf";
import ImageToSvg from "@/components/pages/edit/ImageToSvg";
import MergePdf from "@/components/pages/edit/MergePdfToOne";
import PdfToImg from "@/components/pages/edit/PdfToImg";
import RemoveBg from "@/components/pages/edit/RemoveBg";
import RemoveObject from "@/components/pages/edit/RemoveObject";
import SplitPdf from "@/components/pages/edit/SplitPdf";
import TikTokNoWaterMark from "@/components/pages/edit/TikTokWaterMark";
import FeaturesSection from "@/components/pages/home/Features";



interface EditPageProps {
    params: {
        type: string;
    };
}

const EditPage = async ({ params: { type } }: EditPageProps) => {


    const renderComponent = () => {
        switch (type) {
            case "remove-object":
                return <RemoveObject />;
            case "remove-background":
                return <RemoveBg />;
            case "enhance-quality":
                return <EnhanceQuality />
            case "image-to-svg":
                return <ImageToSvg />;
            case "tiktok-no-watermark":
                return <TikTokNoWaterMark />;
            case "pdf-to-image":
                return <PdfToImg />;
            case "image-to-pdf":
                return <ImageToPdf />;
            case "split-pdf":
                return <SplitPdf />
            case "merge-pdf":
                return <MergePdf />

            default:
                return <div className="text-center text-red-500">Invalid transformation type</div>;
        }
    };

    return (




        <>
            <div className="p-12 min-h-[55vh]">
                {/* Half Background */}
                <div
                    className="absolute top-0 left-0 w-full h-2/3 bg-no-repeat bg-cover"
                    style={{
                        backgroundColor: "#F0F0F0",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg ... %3E")`
                    }}
                ></div>

                {renderComponent()}
            </div>

            {/* FeaturesSection is now outside the first div */}
            <FeaturesSection />
        </>
    );
};

export default EditPage;
