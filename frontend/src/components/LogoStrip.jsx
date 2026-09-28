import { clientPlaceholders } from "../data/content";
import { Reveal } from "./motion";

export default function LogoStrip() {
  return (
    <section
      className="border-y border-white/10 py-14"
      data-testid="logo-strip-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center font-mono2 text-[11px] uppercase tracking-[0.3em] text-white/35">
            Worked with / Collaborated with
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {clientPlaceholders.map((name) => (
              <span
                key={name}
                className="rounded-lg border border-white/10 px-8 py-4 font-display text-sm font-bold tracking-[0.25em] text-white/30 transition-colors hover:border-white/25 hover:text-white/60"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
