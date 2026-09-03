export interface Project {
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

export const DEFAULT_PROJECTS: Project[] = [
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
    id: 11,
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
  {
    id: 12,
    title: "VoidWalkers",
    category: "Motion Design",
    year: "2024",
    tags: ["Branding", "3D", "After Effects"],
    accent: "#e8b4a0",
    description: "Démonstration de Compétences en Motion Design Créatif 'VoidWalkers'.",
    aspectRatio: "aspect-[16/9]",
    youtube: "https://www.youtube.com/embed/GQ49pyi7Z4I",
  },
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
];

const STORAGE_KEY = "chadi_portfolio_projects";

/** Read projects from localStorage, falling back to defaults */
export function getProjects(): Project[] {
  if (typeof window === "undefined") return DEFAULT_PROJECTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Project[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // corrupted data — fall back
  }
  return DEFAULT_PROJECTS;
}

/** Save projects to localStorage */
export function saveProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

/** Reset projects to defaults */
export function resetProjects(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/** Generate a new unique id based on existing projects */
export function nextId(projects: Project[]): number {
  return Math.max(0, ...projects.map((p) => p.id)) + 1;
}
