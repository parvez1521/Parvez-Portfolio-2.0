import { lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { MaskedLine, Counter, scrollToSection } from "./motion";

const HeroCharacter = lazy(() => import("./HeroCharacter"));

export default function Hero() {
  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 600], [0, 140]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.15]);

  return (
    <section
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-16"
      data-testid="hero-section"
    >
      <motion.div
        style={{ y: glowY, opacity: fade }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-accent/10 blur-[140px]"
      />
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 font-mono2 text-[10px] uppercase tracking-[0.4em] text-white/25 xl:block"
      >
        Portfolio © 2026 — Parvez Siddiqui
      </p>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md"
            data-testid="hero-availability-badge"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
            <span className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-white/70">
              Available for freelance projects
            </span>
          </motion.div>

          <h1
            className="font-display text-[13.5vw] font-extrabold leading-[0.95] tracking-[-0.03em] text-white sm:text-7xl lg:text-[5.4rem]"
            data-testid="hero-headline"
          >
            <MaskedLine delay={0.25}>Editing videos</MaskedLine>
            <MaskedLine delay={0.35}>that make people</MaskedLine>
            <MaskedLine delay={0.45}>
              <span className="text-accent">stop scrolling.</span>
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
            data-testid="hero-subtitle"
          >
            I'm Parvez — a freelance Video Editor and AI Content Creator
            helping brands, creators and startups turn raw footage and ideas
            into high-performing content.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToSection("#work")}
              className="group flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-display text-base font-bold text-ink transition-colors hover:bg-accent-hover"
              data-testid="hero-cta-work"
            >
              <Play className="h-4 w-4 fill-current" />
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="group flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-display text-base font-bold text-white transition-colors hover:border-accent hover:text-accent"
              data-testid="hero-cta-contact"
            >
              Let's Work Together
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8"
            data-testid="hero-stats"
          >
            <div>
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                <Counter to={150} suffix="K+" />
              </p>
              <p className="mt-1 font-mono2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                Instagram Followers
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                <Counter to={2.5} decimals={1} suffix="+" />
              </p>
              <p className="mt-1 font-mono2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                Years Experience
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                100s
              </p>
              <p className="mt-1 font-mono2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                Of Videos Edited
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative hidden lg:col-span-5 lg:block"
        >
          <div
            className="relative h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-surface/60 backdrop-blur-sm"
            data-testid="hero-3d-panel"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(204,255,0,0.08),transparent_60%)]"
            />
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <span className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-white/30">
                    Loading…
                  </span>
                </div>
              }
            >
              <HeroCharacter />
            </Suspense>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 px-5 py-3">
              <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                PS-01 · Creative Unit
              </span>
              <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-accent">
                Online
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
