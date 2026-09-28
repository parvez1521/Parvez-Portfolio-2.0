import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, projects } from "../data/projects";
import { Reveal, SectionHeading } from "./motion";
import ProjectModal from "./ProjectModal";

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="py-28 lg:py-40" data-testid="portfolio-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionHeading eyebrow="Portfolio" title="Selected Work" />
            <Reveal delay={0.15}>
              <p className="mt-4 text-base text-white/50 sm:text-lg">
                A selection of edits, campaigns and creative experiments.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <div
            className="mt-12 flex flex-wrap gap-2.5"
            data-testid="portfolio-filters"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-5 py-2.5 font-mono2 text-[11px] uppercase tracking-[0.15em] transition-colors ${
                  filter === cat
                    ? "border-accent bg-accent text-ink"
                    : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                }`}
                data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3"
          data-testid="portfolio-grid"
        >
          {visible.map((project) => (
            <button
              key={project.id}
              onClick={() => setActive(project)}
              className="group mb-8 block w-full break-inside-avoid text-left"
              data-testid={`project-card-${project.id}`}
            >
              <div
                className={`relative ${project.aspect} overflow-hidden rounded-2xl border border-white/10 bg-surface`}
              >
                {project.videoUrl ? (
                  <video
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={project.videoUrl.replace(/\.mp4$/, "-poster.jpg")}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  >
                    <source
                      src={project.videoUrl.replace(/\.mp4$/, ".webm")}
                      type="video/webm"
                    />
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
              </div>
              <div className="mt-4 flex items-start justify-between gap-4 px-1">
                <div>
                  <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-accent">
                    {project.category}
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">
                    {project.title}
                  </h3>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </button>
          ))}
        </motion.div>

        <Reveal delay={0.1}>
          <p className="mt-6 font-mono2 text-[11px] uppercase tracking-[0.2em] text-white/30">
            Placeholder projects — swap in real work from the data file.
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal
            project={active}
            projects={projects}
            onClose={() => setActive(null)}
            onNext={setActive}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
