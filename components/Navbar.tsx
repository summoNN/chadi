"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/scroll";
import Logo from "@/public/logo.gif";
const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "glass-card border-b border-border py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <img
          onClick={() => scrollToSection("home")}
          src={Logo.src}
          data-cursor-hover
          width="64" height="64"
        >

        </img>

        {/* Links */}
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className="tv-hint text-muted hover:text-accent transition-colors duration-300 relative group"
                data-cursor-hover
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent-warm group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
