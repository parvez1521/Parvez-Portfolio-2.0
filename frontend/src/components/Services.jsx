import { ArrowUpRight } from "lucide-react";
import { services } from "../data/content";
import { Reveal, SectionHeading } from "./motion";

export default function Services() {
  return (
    <section
      id="services"
      className="py-28 lg:py-40"
      data-testid="services-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Services"
            title="What I can do for your content."
          />
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Every edit is built around one question: what makes someone keep
              watching?
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.index} delay={i * 0.06}>
              <div
                className="group relative h-full rounded-2xl border border-white/10 bg-surface p-8 transition-colors duration-300 hover:border-accent/40 hover:bg-elevated"
                data-testid={`service-card-${service.index}`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono2 text-xs tracking-[0.2em] text-accent">
                    {service.index}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1" />
                </div>
                <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-ink">
                  <service.icon className="h-5 w-5 text-white/70 transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
