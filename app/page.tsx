import { NavBar } from "@/components/home/NavBar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { CtaSection } from "@/components/home/CtaSection";
import { FooterSection } from "@/components/home/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 scroll-smooth">
      <NavBar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TechStackSection />
        <WorkflowSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
