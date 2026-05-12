"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  tags: string[];
  accent: string;
  description: string;
  aspectRatio?: string;
  youtube?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "NIVEA 3D | Bannière site & Story Instagram",
    category: "Motion Design",
    year: "2024",
    tags: ["Branding", "3D", "After Effects"],
    accent: "#c9a96e",
    description:
      "Publicité promotionnelle pour NIVEA, initialement conçue comme une bannière de site web animée, optimisée pour une réutilisation en Story Instagram. Réalisé avec After Effects et Element 3D, ce projet démontre la capacité à créer des animations sophistiquées en 3D (modélisation, textures, et animation de texte) tout en respectant scrupuleusement la charte graphique de la marque. Le défi a été de garantir une qualité de rendu élevée tout en assurant une intégration fluide et un branding instantanément reconnaissable sur différents formats numériques.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/vtrqMwvIS3s",
  },
  {
    id: 2,
    title: "My Universe",
    category: "Motion Design",
    year: "2024",
    tags: ["Branding", "3D", "After Effects"],
    accent: "#e8b4a0",
    description: "Démonstration de Compétences en Motion Design Créatif 'My Universe' est un projet personnel conçu pour explorer et mettre en valeur mes compétences en Motion Design créatif. Cette vidéo est une démonstration de ma capacité à donner vie à des concepts visuels complexes. Animation de Formes et Textes : J'ai animé une variété de formes géométriques, de typographies et d'éléments graphiques pour créer un univers visuel dynamique et cohérent. Maîtrise du Rythme et du Mouvement : Le projet souligne ma compréhension de la composition, du timing et de l'intégration du mouvement pour créer une expérience visuelle captivante et fluide. Expression Artistique : Au-delà des contraintes techniques, 'My Universe' est une expression de ma vision artistique et de ma capacité à raconter une histoire ou à évoquer une émotion à travers le mouvement graphique. Ce projet met en lumière ma passion pour le Motion Design, ma créativité sans limites et ma maîtrise technique des outils d'animation pour transformer des idées abstraites en réalités visuelles impactantes.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/tvU-YbU7wkQ",
  },
  {
    id: 3,
    title: "Grand Prix de l'Innovation",
    category: "Motion Design",
    year: "2022",
    tags: ["Branding", "3D", "After Effects"],
    accent: "#e8b4a0",
    description:
      "Motion Design Institutionnel & Respect de Charte Graphique – Ucanss (After Effects) Durant mon expérience chez l'Ucanss, j'ai été responsable de la création du Motion Design pour le Grand Prix de l'Innovation de la Sécurité sociale 2022. Mon rôle principal a été d'assurer la conception et l'animation des éléments visuels destinés à l'événement et à sa communication post-événement. Conception et Animation : J'ai réalisé l'intégralité des animations graphiques (titres, infographies, transitions) en utilisant Adobe After Effects. Respect Rigoureux de la Charte Graphique : Le défi central était de respecter strictement l'identité visuelle et la charte graphique de l'Ucanss pour garantir une communication professionnelle et cohérente avec l'image institutionnelle de l'organisme. Ce projet démontre ma capacité à créer des animations professionnelles pour le secteur institutionnel, tout en assurant une conformité parfaite aux directives de la marque.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/EvfpWD7QBDA",
  },
  {
    id: 4,
    title: "Architecture Visualization",
    category: "Motion Design",
    year: "2023",
    tags: ["Branding", "3D", "After Effects"],
    accent: "#e8b4a0",
    description:
      "Motion Design 3D Avancé & Composition Sonore Originale – Générique de Série (ESEC) Ce projet a été conçu pendant mes études à l'ESEC et avait pour objectif de créer un générique de film ou de série télévisée de qualité professionnelle. Il met en lumière ma polyvalence technique et créative : Conception 3D & Modélisation : J'ai utilisé Cinema 4D pour modéliser les objets et l'environnement 3D nécessaire au concept du générique. Motion Design & VFX : L'animation et l'intégration finale ont été réalisées dans After Effects en utilisant le moteur de rendu 3D temps réel Element 3D, assurant un rendu dynamique et complexe de l'environnement virtuel. Création Sonore Originale : J'ai produit la bande sonore (musique et effets) directement sur Ableton Live, en y intégrant des éléments vocaux acquis via Splice pour finaliser l'ambiance sonore du générique (titres, ambiance, effets). Ce projet démontre une expertise approfondie dans la chaîne de production du Motion Design 3D, de la modélisation à l'animation, en passant par la composition visuelle et la création audio.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/AT9HPAT1Bh8",
  },
  {
    id: 5,
    title: "Grand Prix de l'Innovation",
    category: "Editing & Shooting",
    year: "2019",
    tags: ["Music", "VFX", "Compositing"],
    accent: "#d4a0e8",
    description:
      "Reportage Événementiel : Couverture du Grand Prix de l'Innovation 2019 (Prise de Vue & Montage) J'ai participé à la production de la vidéo récapitulative du Grand Prix de l'Innovation de la Sécurité sociale 2019, travaillant au sein d'une équipe de production dédiée. Mes rôles principaux comprenaient : Prise de Vue : Collaboration avec l'équipe pour la captation des moments clés, des interviews et de l'ambiance générale de l'événement. J'ai contribué à obtenir des plans dynamiques et pertinents sous la direction de l'équipe. Montage Vidéo : J'ai structuré le contenu pour créer un reportage concis et engageant, mettant en avant les moments forts de la cérémonie et des présentations. Mon rôle a été d'assurer un rythme soutenu et une transition fluide entre les différentes séquences captées par l'équipe. Ce projet démontre ma capacité à travailler efficacement en équipe pour la couverture d'événements institutionnels majeurs, en délivrant une production vidéo qui répond aux objectifs de communication du client.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/yYFUASSZ4F0",
  },
  {
    id: 6,
    title: "Vidéo Institutionnelle : Conception Complète pour l'Ucanss",
    category: "Editing & Shooting",
    year: "2019",
    tags: ["Music", "VFX", "Compositing"],
    accent: "#d4a0e8",
    description:
      "J'ai conçu et produit cette vidéo pour l'Ucanss (Union des Caisses Nationales de Sécurité Sociale) afin de présenter leurs nouveaux locaux et d'informer les parties prenantes. Ce projet démontre ma maîtrise de l'ensemble de la chaîne de production vidéo en autonomie : Prise de Vue (Tournage) : J'ai géré le cadrage et l'éclairage pour mettre en valeur les espaces de travail, capturant des plans qui reflètent l'ambiance professionnelle et moderne. Prise de Son : J'ai assuré la qualité d'enregistrement du son (interviews ou ambiance) pour une communication claire et professionnelle. Montage Vidéo : J'ai structuré la narration de manière concise et informative, adaptée à un public institutionnel. Étalonnage : J'ai appliqué une colorimétrie propre et uniforme pour garantir un rendu visuel professionnel et en phase avec l'identité de l'Ucanss. Cette expérience souligne ma capacité à répondre aux besoins de communication d'entreprise, en livrant un produit fini de haute qualité, de la captation à la post-production.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/75FGMkc7ws8",
  },
  {
    id: 7,
    title: "Grand Prix de l'Innovation de la Sécurité Sociale 2022",
    category: "Editing & Shooting",
    year: "2019",
    tags: ["Music", "VFX", "Compositing"],
    accent: "#d4a0e8",
    description:
      "Couverture Événementielle (Reportage Vidéo) & Conception Scénique Immersive (Projection Mapping 180°) J'ai contribué de manière significative à la couverture médiatique et à l'expérience visuelle immersive du Grand Prix de l'Innovation de la Sécurité sociale 2022 à la Gaîté Lyrique. Ce rôle m'a permis de démontrer ma double compétence : 1. Production Vidéo (Reportage) : Prise de Vue : Captation de l'intégralité de l'événement, incluant les interventions, la remise des prix et les ambiances, pour la création d'une vidéo récapitulative post-événement. Montage : Création d'un film dynamique reflétant les temps forts et les enjeux du Grand Prix. 2. Conception Visuelle et Scénographie (Projection Mapping) : Projection Mapping 180° : Conception et mise en œuvre du contenu visuel pour la projection mapping à 180 degrés dans la salle. Ce travail a exigé une maîtrise technique de l'alignement et de la déformation d'image pour créer un environnement visuel immersif et spectaculaire. Création de Textes/Infographies : Réalisation des supports textuels et graphiques pour les intervenants, garantissant le respect rigoureux de l'identité visuelle de la Sécurité sociale pour une image de marque professionnelle et cohérente. Ce projet met en évidence ma capacité à gérer des exigences techniques complexes (Mapping 180°) tout en assurant une production vidéo institutionnelle de haute qualité, essentielle pour les événements majeurs.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/FUtaoibDN1I",
  },
  {
    id: 8,
    title: "Gtex Promo (evenementiel)",
    category: "Editing & Shooting",
    year: "2019",
    tags: ["Music", "VFX", "Compositing"],
    accent: "#d4a0e8",
    description:
      "Montage Narratif Avancé : Expertise des logiciels de pointe (Premiere Pro, DaVinci Resolve) pour transformer efficacement des heures de séquences brutes en récits percutants, que ce soit pour des promotions événementielles, des contenus corporate ou institutionnels. Post-Production Complète : Je maîtrise l'étalonnage professionnel des couleurs, le mixage audio (incluant l'intégration et l'harmonisation de pistes musicales et d'ambiance), et la gestion des formats d'export. Innovation en Intégration : J'ai l'expérience de l'intégration de solutions modernes, comme l'assemblage d'une voix off générée par Intelligence Artificielle, démontrant ma capacité à innover et à optimiser les flux de travail.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/leI1iMQzTqE",
  },
  {
    id: 9,
    title: "MOROTOV - YOUR TRASH MY GOLD",
    category: "Editing & Shooting",
    year: "2019",
    tags: ["Music", "VFX", "Compositing"],
    accent: "#d4a0e8",
    description:
      "Réalisation, Cadrage et Montage Ce projet est la réalisation complète (cadrage et montage) du clip vidéo pour le morceau 'YOUR TRASH MY GOLD' de l'artiste MOROTOV. Le morceau fait partie de l'album 'MK ULTRA', notablement sorti en vinyle, marquant l'une des premières initiatives de ce genre pour la techno africaine. Le tournage s'est déroulé à Barcelone. Narrativement, le clip explore le thème poignant de la vie d'un immigrant en Europe et le stress psychologique qui l'accompagne. Pour traduire visuellement cette tension, j'ai délibérément choisi des travellings en avant et arrière. Ces mouvements de caméra intenses ont servi à la fois à rapprocher le spectateur du sujet sur le plan émotionnel et à symboliser la pression et l'étouffement ressentis. La production a été assurée avec des outils professionnels, notamment une caméra Sony A7S II montée sur un stabilisateur, garantissant une fluidité et une qualité d'image cinématographiques, même dans des conditions de tournage exigeantes. Ce travail démontre ma capacité à lier une intention narrative forte à une exécution technique précise, créant un produit fini qui est à la fois percutant et en phase avec l'énergie du morceau.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/xQILtyQqlr4",
  },
  {
    id: 10,
    title: "The Box",
    category: "Editing & Shooting",
    year: "2019",
    tags: ["Music", "VFX", "Compositing"],
    accent: "#d4a0e8",
    description:
      "Réalisé dans le cadre de ma troisième année d'études en cinéma, The Box est un court-métrage muet qui se concentre sur la force de la narration purement visuelle. Mes contributions clés ont été étendues : Prise de Vue (Direction Photo / Chef Opérateur) : J'ai géré le cadrage, l'éclairage et la composition pour établir l'ambiance visuelle du film, m'assurant que chaque plan communiquait clairement l'émotion et l'information sans dialogue. Assistance à l'Écriture du Scénario : J'ai contribué à l'élaboration de la structure narrative, en mettant l'accent sur les moyens d'exprimer l'intrigue et les émotions uniquement par l'action et l'image. Montage Vidéo : J'ai assemblé le film en utilisant un montage rythmique et expressif, crucial pour un film muet. Mixage Son : J'ai conçu et réalisé le design sonore complet (musique et bruitages) pour compenser l'absence de dialogues. Ce travail a été essentiel pour renforcer l'atmosphère, le suspense et l'impact émotionnel de la narration visuelle. Ce projet démontre ma compréhension complète du processus cinématographique, de la pré-production (scénario) à la post-production (montage vidéo et mixage son), et ma capacité à utiliser le son comme un outil narratif puissant.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/pR9piA1Xenw",
  },

  {
    id: 99,
    title: "Armel et Moez",
    category: "Sound Mixing",
    year: "2022",
    tags: ["Social", "Loop", "Typography"],
    accent: "#e8e0a0",
    description:
      "Mixage Son Professionnel (Pro Tools) – Court-Métrage Académique Dans le cadre de mes études de cinéma à l'ESEC, mon rôle principal sur le projet 'Armel et Moez' a été celui de Mixeur Son. J'ai été responsable de l'intégralité de la post-production audio, en utilisant le logiciel standard de l'industrie Pro Tools. Mon travail a consisté à : Nettoyer et Égaliser les dialogues. Intégrer et Équilibrer la musique originale et les effets sonores (SFX). Réaliser le Mixage Final Stéréo (ou 5.1, si applicable) en respectant les normes de niveau sonore (LUFS) pour garantir une qualité sonore professionnelle et cohérente avec l'ambiance visuelle du film. Ce projet met en évidence ma spécialisation et ma maîtrise technique dans le design et le mixage sonore professionnel pour la production cinématographique.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/-6eQMvnz8fA",
  },
];

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
