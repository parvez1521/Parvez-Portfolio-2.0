import { socials } from "../data/content";
import { scrollToSection } from "./motion";

const PAGE_LINKS = [
  { label: "Work", hash: "#work" },
  { label: "Services", hash: "#services" },
  { label: "About", hash: "#about" },
  { label: "Contact", hash: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: socials.instagram },
  { label: "LinkedIn", href: socials.linkedin },
  { label: "Behance", href: socials.behance },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 py-14"
      data-testid="footer"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tight text-white">
              PARVEZ<span className="text-accent">.</span>
            </p>
            <p className="mt-2 text-sm text-white/45">
              Parvez Siddiqui — Video Editor &amp; AI Content Creator
            </p>
          </div>
          <div className="flex gap-16">
            <nav className="flex flex-col gap-3">
              {PAGE_LINKS.map((l) => (
                <button
                  key={l.hash}
                  onClick={() => scrollToSection(l.hash)}
                  className="text-left text-sm text-white/55 transition-colors hover:text-accent"
                  data-testid={`footer-link-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </button>
              ))}
            </nav>
            <nav className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-sm text-white/55 transition-colors hover:text-accent"
                  data-testid={`footer-social-${l.label.toLowerCase()}`}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-white/30">
            © 2026 Parvez Siddiqui
          </p>
          <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-white/30">
            Editing videos that make people stop scrolling
          </p>
        </div>
      </div>
    </footer>
  );
}
