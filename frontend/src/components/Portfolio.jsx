import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
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
          {visible.map((project, i) => (
            <button
              key={project.id}
              onClick={() => setActive(project)}
              className="group relative mb-6 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 text-left"
              data-testid={`project-card-${project.id}`}
            >
              <div className={`relative ${project.aspect} overflow-hidden`}>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-ink/40 backdrop-blur-md">
                    <Play className="h-6 w-6 fill-white text-white" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-accent">
                      {project.category}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/50 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">
                    {project.description}
                  </p>
                </div>
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
