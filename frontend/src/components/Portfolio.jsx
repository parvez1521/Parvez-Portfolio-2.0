import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { CATEGORIES, projects } from "../data/projects";
import { Reveal, SectionHeading } from "./motion";
import ProjectModal from "./ProjectModal";

const VideoCard = ({ project, onOpen }) => {
  const videoRef = useRef(null);
  const [sound, setSound] = useState(false);

  const handleEnter = () => videoRef.current?.play().catch(() => {});
  const handleLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <div
      className="group"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-testid={`project-card-${project.id}`}
    >
      <div
        className={`relative ${project.aspect} overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors duration-300 group-hover:border-white/25`}
      >
        <button
          onClick={() => onOpen(project)}
          className="absolute inset-0 block h-full w-full"
          aria-label={`Open ${project.title}`}
          data-testid={`project-open-${project.id}`}
        >
          <video
            ref={videoRef}
            muted={!sound}
            loop
            playsInline
            preload="metadata"
            poster={project.videoUrl.replace(/\.mp4$/, "-poster.jpg")}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          >
            <source
              src={project.videoUrl.replace(/\.mp4$/, ".webm")}
              type="video/webm"
            />
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSound((s) => !s);
          }}
          aria-label={sound ? "Mute video" : "Unmute video"}
          title={sound ? "Sound off" : "Sound on"}
          className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-ink/60 text-white backdrop-blur-md transition-all duration-300 hover:border-accent hover:text-accent lg:opacity-0 lg:group-hover:opacity-100"
          data-testid={`sound-toggle-${project.id}`}
        >
          {sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
      </div>
      <button
        onClick={() => onOpen(project)}
        className="mt-4 flex w-full items-start justify-between gap-4 px-1 text-left"
      >
        <div>
          <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-accent">
            {project.category}
          </span>
          <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </button>
    </div>
  );
};

const ImageCard = ({ project, onOpen }) => (
  <div className="group" data-testid={`project-card-${project.id}`}>
    <button
      onClick={() => onOpen(project)}
      className={`relative block w-full ${project.aspect} overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors duration-300 group-hover:border-white/25`}
      aria-label={`Open ${project.title}`}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </button>
    <button
      onClick={() => onOpen(project)}
      className="mt-4 flex w-full items-start justify-between gap-4 px-1 text-left"
    >
      <div>
        <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-accent">
          {project.category}
        </span>
        <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight text-white">
          {project.title}
        </h3>
      </div>
      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
    </button>
  </div>
);

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const shorts = visible.filter((p) => p.category === "Short Form");
  const longs = visible.filter((p) => p.category === "Long Form");

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
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
          data-testid="portfolio-grid"
        >
          {shorts.length > 0 && (
            <div
              className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3"
              data-testid="short-form-row"
            >
              {shorts.map((p) => (
                <VideoCard key={p.id} project={p} onOpen={setActive} />
              ))}
            </div>
          )}
          {longs.length > 0 && (
            <div
              className={`grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 ${
                shorts.length > 0 ? "mt-10" : ""
              }`}
              data-testid="long-form-row"
            >
              {longs.map((p) => (
                <ImageCard key={p.id} project={p} onOpen={setActive} />
              ))}
            </div>
          )}
        </motion.div>
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
