import { motion } from "framer-motion";
import { processSteps } from "../data/content";
import { Reveal, SectionHeading } from "./motion";

export default function Process() {
  return (
    <section
      id="process"
      className="py-28 lg:py-40"
      data-testid="process-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Process" title="How I work" />

        <div className="mt-16">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.index}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`group grid items-baseline gap-4 border-t border-white/10 py-10 sm:grid-cols-[100px_1fr_2fr] sm:gap-8 ${
                i === processSteps.length - 1 ? "border-b" : ""
              }`}
              data-testid={`process-step-${step.index}`}
            >
              <span className="font-mono2 text-sm tracking-[0.2em] text-accent">
                {step.index}
              </span>
              <h3 className="font-display text-3xl font-bold tracking-tight text-white transition-colors group-hover:text-accent sm:text-4xl">
                {step.title}
              </h3>
              <p className="max-w-lg text-base leading-relaxed text-white/55">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-md text-sm leading-relaxed text-white/40">
            Simple on the surface, obsessive underneath — every project moves
            through the same four steps.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
