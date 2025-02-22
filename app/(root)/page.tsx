import Features from "@/components/pages/home/Features";
import Hero from "@/components/pages/home/Hero";
import HowItWorksSection from "@/components/pages/home/HowItWork";
import IntegrationSection from "@/components/pages/home/Integration";
import JoinUs from "@/components/pages/home/JoinUs";


export default function Home() {
  return (
    <div className=" min-h-screen ">
      <Hero />
      <Features />
      <IntegrationSection />
      <JoinUs />
      {/*<HowItWorksSection />*/}

    </div>
  );
}
