import { HeroSection } from "@/components/home/hero-section";
import { FounderSpotlight } from "@/components/home/founder-spotlight";
import { MinistryPillars } from "@/components/home/ministry-pillars";
import { ServiceSchedule } from "@/components/home/service-schedule";
import { BranchPreview } from "@/components/home/branch-preview";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FounderSpotlight />
      <MinistryPillars />
      <ServiceSchedule />
      <BranchPreview />
    </div>
  );
}
