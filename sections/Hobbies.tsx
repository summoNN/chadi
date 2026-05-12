"use client";

import Image from "next/image";

export default function Hobbies() {
  return (
    <section id="hobbies" className="bg-bg py-32 px-6 lg:px-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-accent-warm/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-20">
          <p className="tv-hint text-accent-warm mb-4 tracking-[0.3em]">04 / HOBBIES</p>
          <h2 className="text-5xl lg:text-7xl font-display font-black text-accent leading-none italic">
            Passion &
            <br />
            Competition
          </h2>
        </div>

        <div className="flex flex-col gap-16">
          {/* Esport Column */}
          <div className="flex flex-col gap-8">
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-accent-warm/20 transition-all duration-500">
              <h3 className="text-2xl font-bold text-accent mb-4 flex items-center gap-3">
                <span className="text-accent-warm">02.</span> Esport & Compétition
              </h3>
              <p className="tv-hint text-muted leading-relaxed mb-6">
                La compétition fait partie de mon ADN. Ancien Champion du Maroc sur Counter-Strike 2 (CS2),
                j'ai eu l'immense fierté de représenter mon pays lors des qualifications africaines pour les championnats du monde IESF 2024.
                Le sport électronique à haut niveau exige une communication sans faille, un esprit d'équipe solide, et une prise de décision stratégique en une fraction de seconde sous haute pression.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 group">
                  <Image
                    src="/chadi_esports.png"
                    alt="Chadi Esport"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 group">
                  <Image
                    src="/chadi_pc.JPG"
                    alt="Setup PC"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/40 group">
                <video
                  src="/celebration.mp4"
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="tv-hint text-[10px] px-2 py-1 bg-black/60 rounded text-accent-warm border border-accent-warm/20">
                    IESF 2024 // CELEBRATION
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Music Production Section */}
          <div className="flex flex-col gap-8">
            <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-accent-warm/20 transition-all duration-500 group">
              <h3 className="text-2xl font-bold text-accent mb-4 flex items-center gap-3">
                <span className="text-accent-warm">01.</span> Production Musicale (MAO)
              </h3>
              <p className="tv-hint text-muted leading-relaxed mb-8">
                Passionné par la création sonore, je consacre une partie de mon temps libre à la production musicale.
                De la composition au mixage, j'aime explorer de nouvelles sonorités et donner vie à des idées musicales.
                C'est un domaine qui me permet d'allier technique et créativité au quotidien.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://soundcloud.com/dimen5ion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 glass-card text-sm font-medium uppercase tracking-widest text-accent-warm hover:bg-accent-warm/10 transition-all duration-300 rounded flex items-center gap-2"
                  data-cursor-hover
                >
                  Listen on SoundCloud
                  <span className="text-xl">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.5); }
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
          transform-origin: bottom;
        }
      `}</style>
    </section>
  );
}
