import { ArrowUpRight } from "lucide-react";
import { Reveal, scrollToSection } from "./motion";

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/10 py-32 lg:py-44"
      data-testid="cta-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30%] left-[-10%] h-[480px] w-[480px] rounded-full bg-accent/[0.06] blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <h2 className="max-w-5xl font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
            Have footage? Let's turn it into something people{" "}
            <span className="text-accent">actually want to watch.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Tell me what you're working on and I'll help turn the idea into
            content.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <button
            onClick={() => scrollToSection("#contact")}
            className="group mt-12 inline-flex items-center gap-2 rounded-full bg-accent px-9 py-5 font-display text-lg font-bold text-ink transition-colors hover:bg-accent-hover"
            data-testid="cta-start-project"
          >
            Start a Project
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
