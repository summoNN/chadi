"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Dot follows exactly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring lags behind with lerp
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onHoverIn = () => setIsHovering(true);
    const onHoverOut = () => setIsHovering(false);

    document.addEventListener("mousemove", onMove);
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.closest("a, button, [data-cursor-hover]")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Custom Image Cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          willChange: "transform",
          transition: "transform 0.05s linear"
        }}
      >
        <img
          src="/cursor.png"
          alt="cursor"
          className="w-8 h-8 object-contain"
          style={{
            transform: `rotate(35deg) scale(${isHovering ? 1.5 : 1})`,
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), filter 0.45s ease",
            filter: isHovering
              ? "brightness(0) saturate(100%) invert(44%) sepia(95%) saturate(2337%) hue-rotate(8deg) brightness(96%) contrast(101%)"
              : "none",
            // Center the image (assuming 32x32 size, we subtract 16px in CustomCursor.tsx logic or here)
          }}
        />
      </div>
    </>
  );
}
