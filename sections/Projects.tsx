"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { type Project, getProjects } from "@/lib/projectsData";

/* ─────────────────────── HIGH-QUALITY IFRAME ──────────────────────── */
/**
 * Loads the YouTube IFrame Player API once and creates a player that
 * immediately requests the highest available quality on ready.
 * Quality priority: hd2160 → hd1440 → hd1080 → (YouTube decides)
 */
const YT_QUALITY_LEVELS = ["hd2160", "hd1440", "hd1080", "hd720", "large"] as const;

function HighQualityIframe({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Extract bare video ID from an embed URL like
  // https://www.youtube.com/embed/VIDEO_ID or …?param=val
  const videoId = src.split("/embed/")[1]?.split("?")[0] ?? "";

  useEffect(() => {
    if (!videoId || !containerRef.current) return;
    setIsLoading(true);

    const forceMaxQuality = (player: any) => {
      const available: string[] = player.getAvailableQualityLevels?.() ?? [];
      const best =
        YT_QUALITY_LEVELS.find((q) => available.includes(q)) ??
        available[0] ??
        "hd1080";
      player.setPlaybackQuality(best);
    };

    const initPlayer = () => {
      if (!containerRef.current) return;
      playerRef.current = new (window as any).YT.Player(containerRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          vq: "hd2160",
        },
        events: {
          onReady: (event: any) => {
            forceMaxQuality(event.target);
            setIsLoading(false);
          },
          onStateChange: (event: any) => {
            // Re-assert quality each time playback starts
            if (event.data === 1 /* PLAYING */) {
              forceMaxQuality(event.target);
              setIsLoading(false);
            }
          },
        },
      });
    };

    const win = window as any;
    if (win.YT && win.YT.Player) {
      initPlayer();
    } else {
      // Queue our init behind any existing onYouTubeIframeAPIReady callback
      const prev = win.onYouTubeIframeAPIReady as (() => void) | undefined;
      win.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
      if (!document.getElementById("yt-iframe-api-script")) {
        const s = document.createElement("script");
        s.id = "yt-iframe-api-script";
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      try {
        playerRef.current?.destroy();
      } catch (_) { }
      playerRef.current = null;
    };
  }, [videoId]);

  return (
    <div className="relative w-full h-full">
      {/* Shimmer loader */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4"
        style={{
          background: "#0a0a0a",
          transition: "opacity 0.5s ease, visibility 0.5s ease",
          opacity: isLoading ? 1 : 0,
          visibility: isLoading ? "visible" : "hidden",
          pointerEvents: isLoading ? "auto" : "none",
        }}
      >
        {/* Animated play icon spinner */}
        <div style={{ position: "relative", width: 64, height: 64 }}>
          {/* Spinning ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid rgba(201,169,110,0.15)",
              borderTopColor: "rgba(201,169,110,0.9)",
              animation: "ytSpinnerRing 0.9s linear infinite",
            }}
          />
          {/* Pulsing inner circle */}
          <div
            style={{
              position: "absolute",
              inset: 10,
              borderRadius: "50%",
              background: "rgba(201,169,110,0.08)",
              animation: "ytPulse 1.4s ease-in-out infinite",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" style={{ marginLeft: 2 }}>
              <path d="M5 3.5l10 5.5-10 5.5V3.5z" fill="rgba(201,169,110,0.8)" />
            </svg>
          </div>
        </div>
        {/* Shimmer bar strip */}
        <div
          style={{
            width: 120,
            height: 4,
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(201,169,110,0.08)",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "100%",
              borderRadius: 4,
              background: "rgba(201,169,110,0.6)",
              animation: "ytShimmerBar 1.2s ease-in-out infinite",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: 10,
            letterSpacing: "0.2em",
            color: "rgba(201,169,110,0.5)",
            textTransform: "uppercase",
          }}
        >
          Loading
        </span>
      </div>

      {/* Player mount point */}
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

/* ─────────────────────────── MODAL ─────────────────────────── */
function VideoModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(4,4,4,0.88)", backdropFilter: "blur(16px)" }}
      onClick={(e) => e.target === backdropRef.current && onClose()}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden flex flex-col"
        style={{
          border: `1px solid ${project.accent}30`,
          boxShadow: `0 0 60px ${project.accent}18, 0 32px 80px rgba(0,0,0,0.7)`,
          background: "#0a0a0a",
          animation: "modalIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {/* Modal Header with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#080808] z-20">
          <span className="tv-hint text-[10px] text-accent/60 tracking-widest uppercase">
            Project Preview
          </span>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="group flex items-center gap-2 tv-hint text-[10px] text-muted hover:text-accent transition-colors duration-200"
            data-cursor-hover
          >
            <span>Close</span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all">
              <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1 1l12 12M13 1L1 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Video */}
          {project.youtube ? (
            <div className="w-full aspect-video">
              <HighQualityIframe src={project.youtube} />
            </div>
          ) : (
            <div
              className="w-full aspect-video flex items-center justify-center"
              style={{
                background: `radial-gradient(ellipse at 40% 40%, ${project.accent}14 0%, transparent 70%)`,
              }}
            >
              <span
                className="tv-hint text-[11px]"
                style={{ color: `${project.accent}60` }}
              >
                No preview available
              </span>
            </div>
          )}

          {/* Info */}
          <div className="p-6 md:p-10">
            {/* Meta row */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="tv-hint text-[11px]"
                style={{ color: project.accent }}
              >
                {project.category}
              </span>
              <span
                className="w-1 h-1 rounded-full opacity-30"
                style={{ background: project.accent }}
              />
              <span className="tv-hint text-[11px] text-muted">
                {project.year}
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-display font-bold text-accent text-3xl md:text-4xl leading-tight mb-6"
            >
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-base text-accent/60 leading-relaxed mb-10 max-w-2xl">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex gap-3 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="tv-hint text-[10px] px-4 py-2 rounded-full"
                  style={{
                    background: `${project.accent}08`,
                    border: `1px solid ${project.accent}20`,
                    color: `${project.accent}90`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Accent left border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 z-30"
          style={{
            background: project.accent,
            opacity: 0.5,
            boxShadow: `0 0 12px ${project.accent}`,
          }}
        />
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes ytSpinnerRing {
          to { transform: rotate(360deg); }
        }
        @keyframes ytPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes ytShimmerBar {
          0%   { transform: translateX(-200%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── CARD ─────────────────────────── */
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg glass-card transition-all duration-500 cursor-pointer ${project.aspectRatio || "aspect-video"
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
      {/* Video / Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {project.youtube ? (
          <iframe
            src={`${project.youtube}?controls=0&modestbranding=1&rel=0&mute=1&vq=hd1080`}
            className={`w-full h-full transition-transform duration-700 ${hovered ? "scale-105" : "scale-100"
              }`}
            tabIndex={-1}
          />
        ) : (
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: hovered
                ? `radial-gradient(ellipse at 30% 40%, ${project.accent}18 0%, transparent 70%)`
                : `radial-gradient(ellipse at 50% 50%, ${project.accent}08 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
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

      {/* Play hint */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${hovered ? "opacity-100" : "opacity-0"
          }`}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: `${project.accent}22`,
            border: `1px solid ${project.accent}50`,
            boxShadow: `0 0 24px ${project.accent}30`,
            transform: hovered ? "scale(1)" : "scale(0.8)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            style={{ marginLeft: 2 }}
          >
            <path d="M5 3.5l10 5.5-10 5.5V3.5z" fill={project.accent} />
          </svg>
        </div>
      </div>

      {/* Bottom info — title + category only */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-70"
          }`}
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 60%, transparent 100%)",
        }}
      >
        <p className="tv-hint text-[10px] mb-1.5" style={{ color: project.accent }}>
          {project.category}
        </p>
        <h3 className="font-display font-bold text-accent text-lg leading-tight">
          {project.title}
        </h3>
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

/* ─────────────────────────── SECTION ─────────────────────────── */
export default function Projects() {
  const categories = ["All", "Motion Design", "Editing & Shooting", "Sound Mixing", "Showreel"];
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {selectedProject && (
        <VideoModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <section className="min-h-screen bg-bg relative overflow-hidden py-32 px-6 lg:px-20">
        {/* Background accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--accent-warm)/30, transparent)",
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
                    <span className="tv-hint">{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
