import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import type { ComponentType } from "react";
import { TickerSection } from "@/components/sections/TickerSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { PlaygroundSection } from "@/components/sections/PlaygroundSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { getVisibleSections, type SectionId } from "@/config/site";

const sectionRegistry: Record<SectionId, ComponentType> = {
  home: HeroSection,
  ticker: TickerSection,
  work: WorkSection,
  about: AboutSection,
  skills: SkillsSection,
  experience: ExperienceSection,
  resume: ResumeSection,
  playground: PlaygroundSection,
  contact: ContactSection,
};

export default function Page() {
  return (
    <div className="page" id="top">
      <a href="#main" className="skip">Skip to main content</a>
      <div className="hero-shell">
        <div className="grid-pattern" aria-hidden="true" />
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {getVisibleSections().map((id) => {
            const Component = sectionRegistry[id];
            return <Component key={id} />;
          })}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
