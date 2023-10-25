import HeroSection from "@/components/layout/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col justify-between items-center gap-40 text-white">
      <HeroSection />
      <section>Skills</section>
      <section>Portfolio</section>
      <section>Testimonials</section>
      <section>Contacts</section>
    </main>
  );
}
