"use client";

import { useState } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  tags: string[];
  accent: string;
  description: string;
  aspectRatio?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Brand Identity Film",
    category: "Motion Design",
    year: "2024",
    tags: ["Branding", "3D", "After Effects"],
    accent: "#c9a96e",
    description: "A cinematic brand reveal sequence blending 3D animation with editorial motion design.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 2,
    title: "Product Launch Campaign",
    category: "Advertising",
    year: "2024",
    tags: ["Product", "CGI", "Cinema 4D"],
    accent: "#a0c4e8",
    description: "High-end CGI product animation for a global consumer electronics launch.",
    aspectRatio: "aspect-[16/9]",
  },
  {
    id: 3,
    title: "Videastz Showreel",
    category: "Showreel",
    year: "2023",
    tags: ["Showreel", "Mixed Media", "Direction"],
    accent: "#e8b4a0",
    description: "Annual showreel showcasing the breadth of creative output from the studio.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 4,
    title: "Architecture Visualization",
    category: "Archviz",
    year: "2023",
    tags: ["Archviz", "Blender", "Lighting"],
    accent: "#b4e8a0",
    description: "Atmospheric architectural visualization series for a luxury real-estate developer.",
    aspectRatio: "aspect-video",
  },
  {
    id: 5,
    title: "Music Video Treatment",
    category: "Music Video",
    year: "2023",
    tags: ["Music", "VFX", "Compositing"],
    accent: "#d4a0e8",
    description: "Directed and designed a full VFX treatment for an independent artist's single.",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 6,
    title: "Social Content Series",
    category: "Social Media",
    year: "2022",
    tags: ["Social", "Loop", "Typography"],
    accent: "#e8e0a0",
    description: "A series of looping motion graphics designed for high-engagement social media content.",
    aspectRatio: "aspect-square",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg glass-card transition-all duration-500 cursor-pointer ${
        project.aspectRatio || "aspect-video"
      }`}
      style={{
        border: hovered
          ? `1px solid ${project.accent}40`
          : "1px solid rgba(232,213,176,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      {/* Placeholder gradient bg */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: hovered
            ? `radial-gradient(ellipse at 30% 40%, ${project.accent}18 0%, transparent 70%)`
            : `radial-gradient(ellipse at 50% 50%, ${project.accent}08 0%, transparent 70%)`,
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Index number */}
      <div
        className="absolute top-4 left-4 tv-hint text-[10px] transition-colors duration-300"
        style={{ color: hovered ? project.accent : "rgba(232,213,176,0.2)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Year */}
      <div className="absolute top-4 right-4 tv-hint text-[10px] text-muted">
        {project.year}
      </div>

      {/* Play button hint */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
          hovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: `${project.accent}20`,
            border: `1px solid ${project.accent}50`,
            boxShadow: `0 0 30px ${project.accent}30`,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path d="M4 2L14 8L4 14V2Z" fill={project.accent} />
          </svg>
        </div>
      </div>

      {/* Bottom info */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-60"
        }`}
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 60%, transparent 100%)",
        }}
      >
        <p className="tv-hint text-[10px] mb-1.5" style={{ color: project.accent }}>
          {project.category}
        </p>
        <h3 className="font-display font-bold text-accent text-xl leading-tight mb-2">
          {project.title}
        </h3>
        <p
          className={`text-sm text-accent/50 leading-relaxed transition-all duration-500 overflow-hidden ${
            hovered ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div
          className={`flex gap-2 flex-wrap mt-3 transition-all duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tv-hint text-[9px] px-2 py-0.5 rounded-full"
              style={{
                border: `1px solid ${project.accent}30`,
                color: `${project.accent}80`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Left border accent on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-500"
        style={{
          background: project.accent,
          opacity: hovered ? 0.7 : 0,
          boxShadow: hovered ? `0 0 12px ${project.accent}` : "none",
        }}
      />
    </div>
  );
}

export default function Projects() {
  const categories = ["All", "Motion Design", "Advertising", "Archviz", "Showreel"];
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="min-h-screen bg-bg relative overflow-hidden py-32 px-6 lg:px-20">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(to right, transparent, var(--accent-warm)/30, transparent)",
        }}
      />

      {/* Large bg label */}
      <div
        className="absolute top-20 -left-6 text-[12vw] font-display font-black text-accent/[0.02] select-none pointer-events-none leading-none"
        aria-hidden
      >
        WORK
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-16">
          <p className="tv-hint text-accent-warm mb-4 tracking-[0.3em]">02 / PROJECTS</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h2
              className="text-5xl lg:text-7xl font-display font-black text-accent leading-none"
              style={{ fontStyle: "italic" }}
            >
              Selected
              <br />
              work
            </h2>

            {/* Filter pills */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="tv-hint text-[10px] px-4 py-2 rounded-full transition-all duration-300"
                  style={{
                    background:
                      activeFilter === cat
                        ? "rgba(201,169,110,0.15)"
                        : "transparent",
                    border:
                      activeFilter === cat
                        ? "1px solid rgba(201,169,110,0.4)"
                        : "1px solid rgba(232,213,176,0.1)",
                    color:
                      activeFilter === cat
                        ? "var(--accent-warm)"
                        : "var(--muted)",
                  }}
                  data-cursor-hover
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex justify-center">
          <a
            href="mailto:hello@videastz.com"
            className="group inline-flex items-center gap-4 px-8 py-4 glass-card tv-hint text-accent-warm hover:bg-accent-warm/10 transition-all duration-300 rounded"
            data-cursor-hover
          >
            <span className="animate-glow-pulse">●</span>
            Available for new projects
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
