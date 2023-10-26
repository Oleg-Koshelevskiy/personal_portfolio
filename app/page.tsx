import AboutSection from "@/components/layout/AboutSection";
import EmailSection from "@/components/layout/EmailSection";
import HeroSection from "@/components/layout/HeroSection";
import ProjectsSection from "@/components/layout/ProjectsSection";

export default function Home() {
  return (
    <main className="container mx-auto text-white">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <EmailSection />
    </main>
  );
}
