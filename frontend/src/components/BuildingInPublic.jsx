import { ArrowUpRight } from "lucide-react";
import { socials } from "../data/content";
import { Reveal, Counter, SectionHeading } from "./motion";

const STATS = [
  { value: 150, decimals: 0, suffix: "K+", label: "Instagram Followers" },
  { value: 11.8, decimals: 1, suffix: "K+", label: "Telegram Subscribers" },
  { value: 4.9, decimals: 1, suffix: "K+", label: "YouTube Subscribers" },
];

export default function BuildingInPublic() {
  return (
    <section
      className="relative overflow-hidden py-28 lg:py-40"
      data-testid="building-in-public-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Building in Public" title="@tech_hacks.ai" />

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Alongside client work, I build and grow content around AI,
            technology, coding and creative tools.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="bg-ink">
              <div className="bg-surface p-10" data-testid={`creator-stat-${i}`}>
                <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                  <Counter
                    to={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2 font-mono2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-display text-base font-bold text-white transition-colors hover:border-accent hover:text-accent"
            data-testid="explore-tech-hacks-ai"
          >
            Explore Tech Hacks AI
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
