import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";
import { CATEGORIES, configuredProjects } from "../data/projects";
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
      className="group min-w-[17rem] flex-1 sm:min-w-[20rem] lg:min-w-0"
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
            poster={project.poster}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          >
            {project.webmUrl && <source src={project.webmUrl} type="video/webm" />}
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
      <span className="sr-only">{project.title}</span>
    </div>
  );
};

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  const shortFormProjects = configuredProjects.filter(
    (project) => project.category === "Short Form",
  );
  const longFormProjects = configuredProjects.filter(
    (project) => project.category === "Long Form",
  );

  const renderRow = (label, projects, testId) => {
    if (projects.length === 0) return null;

    return (
      <div className="space-y-4" data-testid={`${testId}-group`}>
        <p className="font-mono2 text-[11px] uppercase tracking-[0.2em] text-white/45">
          {label}
        </p>
        <div
          className="flex flex-nowrap gap-4 overflow-x-auto pb-3 sm:gap-6 lg:overflow-visible lg:pb-0"
          data-testid={testId}
        >
          {projects.map((project) => (
            <VideoCard key={project.id} project={project} onOpen={setActive} />
          ))}
        </div>
      </div>
    );
  };

  const rows =
    filter === "All"
      ? [
          renderRow("Short Form", shortFormProjects, "selected-work-short-form-row"),
          renderRow("Long Form", longFormProjects, "selected-work-long-form-row"),
        ]
      : filter === "Short Form"
        ? [renderRow("Short Form", shortFormProjects, "selected-work-short-form-row")]
        : [renderRow("Long Form", longFormProjects, "selected-work-long-form-row")];

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
          <div className="space-y-10" data-testid="selected-work-rows">
            {rows}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal
            project={active}
            projects={configuredProjects}
            onClose={() => setActive(null)}
            onNext={setActive}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
