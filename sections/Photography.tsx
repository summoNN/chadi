"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
}

const photos: Photo[] = [
  { src: "/pictures/7anout.jpeg", alt: "7anout" },
  { src: "/pictures/cafe.jpg", alt: "Cafe" },
  { src: "/pictures/chefchaouen.jpg", alt: "Chefchaouen" },
  { src: "/pictures/france.jpeg", alt: "France" },
  { src: "/pictures/metro.jpeg", alt: "Metro" },
  { src: "/pictures/women.jpg", alt: "Women" },
];

const videoSrc = "/pictures/photo_video.gif";

export default function Photography() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{ type: "photo" | "video"; src: string } | null>(null);

  const openGallery = (media: { type: "photo" | "video"; src: string }) => {
    setSelectedMedia(media);
    setIsGalleryOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedMedia(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="photography" className="bg-bg py-32 px-6 lg:px-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-accent-warm/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <p className="tv-hint text-accent-warm mb-4 tracking-[0.3em]">03 / PHOTOGRAPHY</p>
          <div className="flex items-end gap-6">
            <h2
              className="text-5xl lg:text-7xl font-display font-black text-accent leading-none italic"
            >
              Visual
              <br />
              Capture
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Photo Gallery Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="group max-w-[250px] relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer glass-card border border-white/5 hover:border-accent-warm/30 transition-all duration-500"
                onClick={() => openGallery({ type: "photo", src: photo.src })}
                data-cursor-hover
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
            ))}
          </div>

          {/* Video Section */}
          <div className="lg:col-span-4 flex items-center justify-center h-full">
            <img
              className="object-contain"
              src={videoSrc}
              alt="Video preview"
            />
          </div>
        </div>
      </div>

      {/* Full-screen Gallery View (Modal) */}
      {isGalleryOpen && selectedMedia && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={closeGallery}
        >
          {/* Close Button */}
          <button
            className="absolute top-8 right-8 text-accent/60 hover:text-accent transition-colors z-[1001]"
            onClick={closeGallery}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="relative w-full max-w-5xl max-h-[85vh] p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === "photo" ? (
              <div className="relative w-full h-[80vh]">
                <Image
                  src={selectedMedia.src}
                  alt="Gallery Photo"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-black flex items-center justify-center rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                {selectedMedia.src.endsWith(".gif") ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedMedia.src}
                      alt="Photography Reel"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <video
                    controls
                    autoPlay
                    className="w-full h-full"
                    src={selectedMedia.src}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            )}


            {/* Media Info Overlay */}
            <div className="absolute -bottom-12 left-4 right-4 flex justify-between items-center px-2">
              <span className="tv-hint text-[10px] text-muted tracking-widest uppercase">
                {selectedMedia.type === "video" ? "Photography Motion" : "Still Capture"}
              </span>
              <span className="tv-hint text-[10px] text-accent-warm tracking-widest uppercase">
                Chadi © 2024
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
