"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToSection } from "@/lib/scroll";

/**
 * TV hit zones — coordinates tuned to the 1920×1080 video.
 *
 * The video is displayed with object-fit: cover inside a 16:9 container.
 * All values are percentages of the video's rendered dimensions so they
 * scale correctly at any viewport width.
 *
 *  Layout (from the video):
 *   - TOP CENTER  → Logo TV  → #home
 *   - BOTTOM LEFT → VIDÉASTZ → #projects
 *   - BOTTOM RIGHT→ CHADI    → #about
 */
const TV_ZONES = [
  {
    id: "logo",
    label: "Home",
    target: "home",
    style: {
      left: "39%",
      top: "31%",
      width: "17%",
      height: "30%",
    },
  },
  {
    id: "videastz",
    label: "Projects",
    target: "projects",
    style: {
      left: "24.5%",
      top: "62%",
      width: "22%",
      height: "32%",
    },
  },
  {
    id: "chadi",
    label: "About",
    target: "about",
    style: {
      left: "50%",
      top: "62%",
      width: "17%",
      height: "32%",
    },
  },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [hoveredTV, setHoveredTV] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => { });
    const onLoaded = () => setLoaded(true);
    video.addEventListener("canplaythrough", onLoaded);
    if (video.readyState >= 3) setLoaded(true);
    return () => video.removeEventListener("canplaythrough", onLoaded);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0c08]">

      {/* VIDEO */}
      <video
        ref={videoRef}
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"
          }`}
        style={{ objectPosition: "center center" }}
      />

      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="w-px h-14 bg-accent-warm/60 animate-pulse" />
            <span className="tv-hint text-muted">Loading...</span>
          </div>
        </div>
      )}

      {/* INVISIBLE TV HIT ZONES
          Contained in a 16/9 inner box that mirrors the video's native
          aspect ratio — zones stay locked to the TVs regardless of
          viewport size.
      */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <div
          className="relative min-w-full min-h-full w-auto h-auto aspect-video pointer-events-auto"
          style={{ flexShrink: 0 }}
        >
          {TV_ZONES.map((tv) => (
            <button
              key={tv.id}
              onClick={() => scrollToSection(tv.target)}
              onMouseEnter={() => setHoveredTV(tv.id)}
              onMouseLeave={() => setHoveredTV(null)}
              className="absolute group"
              style={{
                ...tv.style,
                background: "transparent",
                outline: "none",
                cursor: "pointer",
                zIndex: 100,
              }}
              aria-label={`Go to ${tv.label} section`}
              data-cursor-hover
            >
              {/* Subtle hover glow outline */}
              <span
                className="absolute inset-0 rounded transition-all duration-300"
                style={{
                  border: hoveredTV === tv.id
                    ? "1.5px solid rgba(232,213,176,0.3)"
                    : "1.5px solid transparent",
                  background: hoveredTV === tv.id
                    ? "rgba(232,213,176,0.03)"
                    : "transparent",
                  boxShadow: hoveredTV === tv.id
                    ? "0 0 30px rgba(201,169,110,0.1), inset 0 0 20px rgba(201,169,110,0.04)"
                    : "none",
                }}
              />

              {/* Tooltip */}
              <span
                className={`
                  absolute left-1/2 -translate-x-1/2 -top-9
                  tv-hint px-3 py-1.5 rounded whitespace-nowrap
                  transition-all duration-200 pointer-events-none
                  ${hoveredTV === tv.id
                    ? "opacity-100 -translate-y-0"
                    : "opacity-0 translate-y-2"}
                `}
                style={{
                  background: "rgba(8,8,8,0.9)",
                  border: "1px solid rgba(232,213,176,0.18)",
                  color: "var(--accent-warm)",
                  backdropFilter: "blur(8px)",
                  letterSpacing: "0.18em",
                  fontSize: "0.58rem",
                  boxShadow: "0 0 16px rgba(201,169,110,0.15)",
                }}
              >
                {tv.label} →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-6 left-6 w-5 h-5 border-l border-t border-accent-warm/25 z-20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-5 h-5 border-r border-t border-accent-warm/25 z-20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-5 h-5 border-l border-b border-accent-warm/25 z-20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-r border-b border-accent-warm/25 z-20 pointer-events-none" />

      {/* Left vertical label */}
      <div
        className={`absolute top-1/2 left-6 lg:left-10 -translate-y-1/2 z-20 pointer-events-none
          transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <p
          className="tv-hint text-accent/22 tracking-[0.3em]"
          style={{ writingMode: "vertical-lr", fontSize: "0.58rem" }}
        >
          CREATIVE · DESIGN · MOTION
        </p>
      </div>

      {/* Right vertical label */}
      <div
        className={`absolute top-1/2 right-6 lg:right-10 -translate-y-1/2 z-20 pointer-events-none
          transition-all duration-1000 delay-200 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <p
          className="tv-hint text-accent/20 tracking-[0.3em]"
          style={{ writingMode: "vertical-lr", fontSize: "0.58rem" }}
        >
          VIDEASTE · MOTION · 3D
        </p>
      </div>

      {/* Bottom scroll hint */}
      <div
        className={`absolute bottom-8 left-0 right-0 flex flex-col items-center gap-2 z-20 pointer-events-none
          transition-all duration-1000 delay-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <p className="tv-hint text-accent/30 text-center" style={{ fontSize: "0.58rem" }}>
          CLICK A TV TO EXPLORE
        </p>
        <div className="w-px h-6 relative overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-full"
            style={{
              background: "var(--accent-warm)",
              animation: "scanLine 1.6s ease-in-out infinite",
              opacity: 0.45,
            }}
          />
        </div>
      </div>
    </div>
  );
}
