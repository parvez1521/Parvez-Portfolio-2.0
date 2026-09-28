import { testimonials } from "../data/content";
import { Reveal, SectionHeading } from "./motion";

export default function Testimonials() {
  return (
    <section
      className="border-t border-white/10 py-28 lg:py-40"
      data-testid="testimonials-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Testimonials" title="Kind words." />

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <figure
                className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-surface p-8"
                data-testid={`testimonial-${i}`}
              >
                <span
                  aria-hidden="true"
                  className="font-display text-7xl font-extrabold leading-none text-accent"
                >
                  &rdquo;
                </span>
                <blockquote className="mt-4 flex-1 font-display text-lg font-medium leading-relaxed text-white/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-display text-base font-bold text-white">
                    {t.name}
                  </p>
                  <p className="mt-1 font-mono2 text-[11px] uppercase tracking-[0.15em] text-white/40">
                    {t.role}
                  </p>
                  {t.placeholder && (
                    <p className="mt-2 font-mono2 text-[10px] uppercase tracking-[0.2em] text-white/25">
                      Placeholder
                    </p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
