"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";


const softwareCategories = [
  {
    label: "Montage / Étalonnage",
    tools: [
      {
        name: "Premiere Pro",
        bg: "#00005B",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
      },
      {
        name: "Final Cut Pro",
        bg: "#1C1C1C",
        logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/2015_Final_Cut_Pro_Logo.png",
      },
      {
        name: "DaVinci Resolve",
        bg: "#1A1A2E",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/DaVinci_Resolve_17_logo.svg",
      },
      {
        name: "Avid",
        bg: "#000000",
        logo: "/avid.png",
      },
    ],
  },
  {
    label: "Compositing / Motion Design",
    tools: [
      {
        name: "After Effects",
        bg: "#00005B",
        logo: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
      },
      {
        name: "Blender",
        bg: "#1A1A1A",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg",
      },
      {
        name: "Cinema 4D",
        bg: "#011A2E",
        logo: "/cinema4d.png",
      },
    ],
  },
  {
    label: "Graphisme",
    tools: [
      {
        name: "Illustrator",
        bg: "#330000",
        logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
      },
      {
        name: "Photoshop",
        bg: "#001E36",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
      },
      {
        name: "InDesign",
        bg: "#49021F",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg",
      },
    ],
  },
  {
    label: "Son / Mixage",
    tools: [
      {
        name: "Ableton Live",
        bg: "#000000",
        logo: "/live.png",
      },
      {
        name: "Logic Pro",
        bg: "#222222",
        logo: "/logic_pro.png",
      },
      {
        name: "Pro Tools",
        bg: "#111111",
        logo: "/protools.png",
      },
    ],
  },
];



// ─── Resume data ────────────────────────────────────────────────────────────
const experiences = [
  {
    period: "2023 — 2025",
    role: "Motion Graphic Designer",
    company: "Ministère de la Transition Écologique",
    location: "Paris, France",
    bullets: [
      "Création d'animations graphiques et de contenus visuels pour les réseaux et supports institutionnels.",
      "Production de vidéos informatives sur les politiques publiques.",
      "Collaboration avec les directions communication et les équipes projets pour valoriser les actions du ministère.",
    ],
  },
  {
    period: "2022 — 2023",
    role: "Vidéaste",
    company: "UCANSS",
    location: "Paris, France",
    bullets: [
      "Pilotage complet de projets vidéo, de la captation (Blackmagic, stabilisateurs) au montage final.",
      "Création de logos 3D animés et de chartes graphiques dynamiques via Illustrator et After Effects.",
      "Conception et réalisation technique d'émissions en direct (Lives) pour la communication interne et externe.",
    ],
  },
  {
    period: "2020 — 2021",
    role: "Monteur & Motion Designer",
    company: "BOLD DIGITAL",
    location: "Rabat, Maroc",
    bullets: [
      "Réalisation de vidéos publicitaires et animations 2D/3D.",
      "Tournage et montage audio-vidéo complet.",
    ],
  },
  {
    period: "2018 — 2020",
    role: "Monteur & Infographiste",
    company: "PAM",
    location: "Rabat, Maroc",
    bullets: [
      "Assistant montage pour des films de fiction et documentaires.",
      "Conception de visuels print.",
      "Création de bandes-annonces et making-of.",
    ],
  },
];

const formations = [
  {
    period: "2023 — 2025",
    degree: "Master – Expert en Création Digitale",
    school: "Paris YNOV Campus",
    location: "Paris",
  },
  {
    period: "2022 — 2023",
    degree: "Formation Motion Designer",
    school: "Itecom Art Design",
    location: "Paris",
  },
  {
    period: "2020 — 2021",
    degree: "Licence – Montage et Effets Spéciaux",
    school: "ESEC",
    location: "Paris",
  },
  {
    period: "2015 — 2018",
    degree: "DUT – Audiovisuel et Cinéma",
    school: "ISCA Film School",
    location: "Maroc",
  },
];

// ─── Accordion item ──────────────────────────────────────────────────────────
function AccordionItem({
  isOpen,
  onToggle,
  children,
  header,
  index,
}: {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  header: React.ReactNode;
  index: number;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(isOpen ? bodyRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`relative border-b transition-colors duration-300 ${isOpen ? "border-accent-warm/30" : "border-border"
        }`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-6 w-2 h-2 rounded-full transition-all duration-300 ${isOpen ? "bg-accent-warm scale-125" : "bg-muted/40"
          }`}
        style={{ transform: isOpen ? "translate(-50%, 0) scale(1.25)" : "translate(-50%, 0)" }}
      />

      {/* Trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 pl-6 pr-2 text-left group"
        data-cursor-hover
      >
        {header}
        {/* Chevron */}
        <span
          className={`flex-shrink-0 mt-1 transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] text-accent-warm ${isOpen ? "rotate-180" : "rotate-0"
            }`}
          style={{ transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Body */}
      <div
        ref={bodyRef}
        style={{ height, overflow: "hidden", transition: "height 0.4s cubic-bezier(0.4,0,0.2,1)" }}
      >
        <div className="pl-6 pb-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Resume Section ──────────────────────────────────────────────────────────
function ResumeSection() {
  const [openExp, setOpenExp] = useState<number | null>(0);
  const [openEdu, setOpenEdu] = useState<number | null>(null);

  return (
    <div className="border-t border-border pt-16 mb-24 space-y-16">
      {/* ── Expériences Professionnelles ─────────────────────────────── */}
      <div>
        <p className="tv-hint text-muted tracking-[0.2em] mb-8">
          EXPÉRIENCES PROFESSIONNELLES
        </p>

        {/* Timeline line */}
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent-warm) 0%, transparent 100%)",
              opacity: 0.25,
            }}
          />

          <div className="ml-px space-y-0">
            {experiences.map((exp, i) => (
              <AccordionItem
                key={i}
                index={i}
                isOpen={openExp === i}
                onToggle={() => setOpenExp(openExp === i ? null : i)}
                header={
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0">
                    {/* Period badge */}
                    <span
                      className="tv-hint flex-shrink-0 text-[9px] tracking-[0.2em] px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(var(--accent-warm-rgb, 255,200,100),0.08)",
                        color: "var(--accent-warm)",
                        border: "1px solid rgba(var(--accent-warm-rgb, 255,200,100),0.2)",
                      }}
                    >
                      {exp.period}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="font-body font-semibold text-accent text-base leading-snug block truncate">
                        {exp.role}
                      </span>
                      <span
                        className="tv-hint text-[9px] tracking-[0.15em] block"
                        style={{ color: "var(--muted)" }}
                      >
                        <span className="tv-hint">{exp.company} — {exp.location}</span>
                      </span>
                    </div>
                  </div>
                }
              >
                <ul className="space-y-2 mt-1">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 mt-2 w-1 h-1 rounded-full"
                        style={{ background: "var(--accent-warm)", opacity: 0.7 }}
                      />
                      <span className="font-body text-sm text-accent/60 leading-relaxed">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            ))}
          </div>
        </div>
      </div>

      {/* ── Formation ────────────────────────────────────────────────── */}
      <div>
        <p className="tv-hint text-muted tracking-[0.2em] mb-8">FORMATION</p>

        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent) 0%, transparent 100%)",
              opacity: 0.2,
            }}
          />

          <div className="ml-px space-y-0">
            {formations.map((edu, i) => (
              <AccordionItem
                key={i}
                index={i}
                isOpen={openEdu === i}
                onToggle={() => setOpenEdu(openEdu === i ? null : i)}
                header={
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0">
                    <span
                      className="tv-hint flex-shrink-0 text-[9px] tracking-[0.2em] px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        color: "var(--accent)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {edu.period}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="font-body font-semibold text-accent text-base leading-snug block truncate">
                        {edu.degree}
                      </span>
                      <span
                        className="tv-hint text-[9px] tracking-[0.15em] block"
                        style={{ color: "var(--muted)" }}
                      >
                        <span className="tv-hint">{edu.school} — {edu.location}</span>
                      </span>
                    </div>
                  </div>
                }
              >
                {/* Diploma detail — just a clean visual note */}
                <p className="font-body text-sm text-accent/50 italic leading-relaxed">
                  {edu.degree} · {edu.school} · {edu.location}
                </p>
              </AccordionItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SoftwareGrid() {
  return (
    <div className="border-t border-border pt-16 space-y-10">
      <p className="tv-hint text-muted tracking-[0.2em]">
        LOGICIELS &amp; COMPÉTENCES TECHNIQUES
      </p>

      <div className="space-y-12">
        {softwareCategories.map((cat) => (
          <div
            key={cat.label}
            className="flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-8"
          >
            {/* Category label — fixed width column */}
            <div className="sm:w-56 flex-shrink-0 pt-1">
              <span
                className="tv-hint text-[9px] tracking-[0.2em] leading-tight"
                style={{ color: "var(--muted)" }}
              >
                {cat.label.toUpperCase()}
              </span>
              {/* Separator line */}
              <div
                className="mt-2 h-px w-8"
                style={{
                  background:
                    "linear-gradient(to right, var(--accent-warm), transparent)",
                  opacity: 0.4,
                }}
              />
            </div>

            {/* Tools row */}
            <div className="flex flex-wrap gap-12">
              {cat.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="group flex flex-col items-center gap-2 cursor-default"
                  data-cursor-hover
                >
                  {/* Logo tile */}
                  <div
                    className="w-14 h-14 rounded-xl overflow-hidden flex items-center justify-center p-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,200,100,0.2)]"
                    style={{
                      background: tool.bg,
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  {/* Name */}
                  <span className="tv-hint text-muted text-[7px] group-hover:text-accent-warm transition-colors duration-300 text-center leading-tight w-16">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
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
              About Me
            </h2>
            <div className="hidden lg:block w-32 h-px bg-accent-warm/30 mb-4 flex-shrink-0" />
          </div>
        </div>

        {/* Bio + Photo row */}
        <div className="grid lg:grid-cols-2 gap-20 items-start mb-24">
          {/* Left — bio text */}
          <div className="space-y-8 mt-16">
            <p className="text-lg font-body text-accent/70 leading-relaxed">
              <span className="text-accent font-medium">Hjij Chadi</span>, Je suis un Expert en Création Digitale, passionné par la transformation d&apos;idées complexes en histoires visuelles percutantes. Fort de plus de sept ans d&apos;expérience dans l&apos;industrie audiovisuelle, je suis spécialisé dans l&apos;ensemble de la chaîne de production : de la captation haut de gamme et l&apos;animation 3D jusqu&apos;à la post-production finale.{" "}
            </p>
            <p className="text-lg font-body text-accent/50 leading-relaxed">
              Au cours de ma carrière, j&apos;ai collaboré avec des institutions majeures telles que le Ministère de la Transition Écologique et l&apos;UCANSS. Ces expériences m&apos;ont permis de maîtriser l&apos;art de la communication institutionnelle, en créant des contenus engageants pour les politiques publiques et des identités numériques dynamiques.
            </p>

            {/* CTA */}
            <div className="pt-4 flex gap-4">
              <a
                href="mailto:chedyhj@gmail"
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

          {/* Right — photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-76 h-96 lg:w-[40rem] lg:h-[36rem]">
              {/* Decorative glow ring */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, var(--accent-warm) 0%, transparent 60%)",
                  opacity: 0.15,
                  filter: "blur(20px)",
                  transform: "scale(1.05)",
                }}
              />
              {/* Border frame */}
              <div className="absolute inset-0 rounded-2xl border border-accent-warm/20" />
              {/* Photo */}
              <Image
                src="/chadi.png"
                alt="Hjij Chadi"
                fill
                className="object-cover rounded-2xl"
                style={{ objectPosition: "top center" }}
                priority
              />
              {/* Subtle bottom gradient overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-2xl"
                style={{
                  background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
                  opacity: 0.5,
                }}
              />
            </div>
          </div>
        </div>

        {/* Resume — Experiences & Education */}
        <ResumeSection />

        {/* Software & Skills — Grouped by category */}
        <SoftwareGrid />
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
