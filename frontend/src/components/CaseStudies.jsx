import { caseStudies } from "../data/content";
import { Reveal, SectionHeading } from "./motion";

const FIELDS = [
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "strategy", label: "Editing Strategy" },
  { key: "result", label: "Final Result" },
];

export default function CaseStudies() {
  return (
    <section className="py-28 lg:py-40" data-testid="case-studies-section">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Case Studies"
          title="Built to perform, not just look good."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.index} delay={i * 0.08}>
              <article
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-8"
                data-testid={`case-study-${cs.index}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono2 text-xs tracking-[0.2em] text-accent">
                    {cs.index}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.15em] text-white/50">
                    {cs.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
                  {cs.title}
                </h3>
                <div className="mt-8 flex flex-1 flex-col gap-6">
                  {FIELDS.map((field) => (
                    <div
                      key={field.key}
                      className="border-t border-white/10 pt-4"
                    >
                      <p
                        className={`font-mono2 text-[10px] uppercase tracking-[0.25em] ${
                          field.key === "result" ? "text-accent" : "text-white/40"
                        }`}
                      >
                        {field.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {cs[field.key]}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
