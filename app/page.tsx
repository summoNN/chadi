"use client";

import HeroSection from "@/sections/HeroSection";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-bg min-h-screen">
      <Navbar />
      <section id="home">
        <HeroSection />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <Footer />
    </main>
  );
}
