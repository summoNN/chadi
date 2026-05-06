"use client";

import { useEffect, useRef } from "react";

const skills = [
  "Motion Design",
  "3D Animation",
  "Visual Identity",
  "After Effects",
  "Cinema 4D",
  "Blender",
  "Creative Direction",
  "Brand Films",
];

const stats = [
  { value: "5+", label: "Years experience" },
  { value: "80+", label: "Projects delivered" },
  { value: "30+", label: "Happy clients" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-bg relative overflow-hidden py-32 px-6 lg:px-20"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Large background label */}
      <div
        className="absolute top-20 right-0 text-[12vw] font-display font-black text-accent/[0.02] select-none pointer-events-none leading-none overflow-hidden"
        aria-hidden
      >
        ABOUT
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <p className="tv-hint text-accent-warm mb-4 tracking-[0.3em]">01 / ABOUT</p>
          <div className="flex items-end gap-6">
            <h2
              className="text-5xl lg:text-7xl font-display font-black text-accent leading-none"
              style={{ fontStyle: "italic" }}
            >
              The story
              <br />
              behind the work
            </h2>
            <div className="hidden lg:block w-32 h-px bg-accent-warm/30 mb-4 flex-shrink-0" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left — bio text */}
          <div className="space-y-8">
            <p className="text-lg font-body text-accent/70 leading-relaxed">
              I'm{" "}
              <span className="text-accent font-medium">Chadi</span>, a motion
              designer and creative developer based in the creative frontier.
              Through{" "}
              <span className="text-accent-warm font-medium">Videastz</span>, I
              craft visual experiences that move people — literally and
              emotionally.
            </p>
            <p className="text-lg font-body text-accent/50 leading-relaxed">
              From brand films to immersive 3D sequences, my work lives at the
              intersection of design thinking and technical craft. Every frame
              is intentional. Every transition tells a story.
            </p>
            <p className="text-lg font-body text-accent/50 leading-relaxed">
              I believe great motion design doesn't just catch the eye — it
              communicates something true about the brand or idea it represents.
            </p>

            {/* CTA */}
            <div className="pt-4 flex gap-4">
              <a
                href="mailto:hello@videastz.com"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded glass-card text-accent-warm tv-hint hover:bg-accent-warm/10 transition-all duration-300"
                data-cursor-hover
              >
                Get in touch
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const lenis = (window as any).__lenis;
                  const el = document.getElementById("projects");
                  if (el && lenis) lenis.scrollTo(el);
                  else el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 px-6 py-3 tv-hint text-muted hover:text-accent transition-colors duration-300"
                data-cursor-hover
              >
                View work
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Right — skills + stats */}
          <div className="space-y-12">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-4xl lg:text-5xl font-display font-black text-accent text-glow mb-1">
                    {stat.value}
                  </div>
                  <div className="tv-hint text-muted">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border" />

            {/* Skills cloud */}
            <div>
              <p className="tv-hint text-muted mb-6 tracking-[0.2em]">EXPERTISE</p>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded glass-card tv-hint text-accent/60 hover:text-accent-warm hover:border-accent-warm/30 transition-all duration-300"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
