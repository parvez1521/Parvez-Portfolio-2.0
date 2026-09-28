import { aboutSkills } from "../data/content";
import { Reveal, SectionHeading } from "./motion";

export default function About() {
  return (
    <section id="about" className="py-28 lg:py-40" data-testid="about-section">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading eyebrow="About" title="More than just an editor." />
          <Reveal delay={0.15}>
            <p className="mt-8 text-base leading-relaxed text-white/60 sm:text-lg">
              I started in content creation and transitioned into professional
              video editing, combining creativity, storytelling and technology
              to create content that feels native to the platform it lives on.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <blockquote className="mt-8 border-l-2 border-accent pl-6 font-display text-xl font-bold leading-snug text-white sm:text-2xl">
              "I don't just edit videos. I understand how content needs to
              look, move and perform."
            </blockquote>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {aboutSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono2 text-[11px] uppercase tracking-[0.15em] text-white/60 transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="relative">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1490810194309-344b3661ba39?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwzfHxkYXJrJTIwdmlkZW8lMjBlZGl0aW5nJTIwc3R1ZGlvfGVufDB8fHx8MTc5MDYxNzYzNHww&ixlib=rb-4.1.0&q=85"
              alt="Parvez Siddiqui editing video in a dark studio"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              data-testid="about-portrait"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-5">
              <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/70">
                Parvez Siddiqui
              </span>
              <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-accent">
                Editor / Creator
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
