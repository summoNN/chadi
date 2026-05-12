"use client";

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/hjijchadi/" },
];
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-border py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display font-black text-2xl text-accent italic mb-1">Chadi</p>
          <p className="tv-hint text-muted text-[10px]">Motion Designer · Vidéaste</p>
        </div>

        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              className="tv-hint text-[10px] text-muted hover:text-accent-warm transition-colors"
              data-cursor-hover
            >
              {link.name}
            </a>
          ))}
        </div>

        <p className="tv-hint text-[10px] text-muted">
          © {year} made with ❤️ by <a href="https://ilyas-haddad-portfolio.web.app/">Ilyas Haddad</a>
        </p>
      </div>
    </footer>
  );
}
