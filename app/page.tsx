"use client";

import HeroSection from "@/sections/HeroSection";
import Projects from "@/sections/Projects";
import Photography from "@/sections/Photography";
import Hobbies from "@/sections/Hobbies";
import About from "@/sections/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <section id="projects">
        <Projects />
      </section>

      <Photography />


      <section id="contact-cta" className="pb-32 px-6 flex justify-center">
        <a
          href="mailto:chedyhj@gmail"
          className="group inline-flex items-center gap-4 px-8 py-4 glass-card tv-hint text-accent-warm hover:bg-accent-warm/10 transition-all duration-300 rounded"
          data-cursor-hover
        >
          <span className="animate-glow-pulse">●</span>
          Available for new projects
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </section>

      <section id="about">
        <About />
      </section>

      <Hobbies />

      <Footer />
    </main>
  );
}
