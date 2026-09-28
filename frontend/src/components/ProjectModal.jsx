import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ArrowRight } from "lucide-react";

export default function ProjectModal({ project, projects, onClose, onNext }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.__lenis?.start();
    };
  }, [onClose]);

  const nextProject =
    projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length];

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="project-modal"
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        data-testid="project-modal-backdrop"
      />
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 48, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-surface"
      >
        <button
          onClick={onClose}
          aria-label="Close project"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink/70 text-white backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
          data-testid="project-modal-close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid lg:grid-cols-5">
          <div className="relative lg:col-span-3">
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                className="aspect-video w-full bg-ink object-cover"
                data-testid="project-video-player"
              />
            ) : (
              <div className="relative aspect-video w-full overflow-hidden bg-ink lg:aspect-auto lg:h-full lg:min-h-[420px]">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                    <Play className="h-6 w-6 fill-white text-white" />
                  </span>
                  <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Preview placeholder — add project video URL
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 lg:col-span-2 lg:p-10">
            <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono2 text-[10px] uppercase tracking-[0.2em] text-accent">
              {project.category}
            </span>
            <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h3>
            <div className="mt-4 flex gap-8 font-mono2 text-[11px] uppercase tracking-[0.15em] text-white/40">
              <span>Client — {project.client}</span>
              <span>Year — {project.year}</span>
            </div>

            <p className="mt-6 font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Overview
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              {project.overview}
            </p>

            <p className="mt-6 font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Creative Approach
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              {project.approach}
            </p>

            <p className="mt-6 font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Tools Used
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/10 px-3 py-1.5 font-mono2 text-[10px] uppercase tracking-[0.15em] text-white/60"
                >
                  {tool}
                </span>
              ))}
            </div>

            <button
              onClick={() => onNext(nextProject)}
              className="group mt-10 flex w-full items-center justify-between rounded-2xl border border-white/10 p-5 text-left transition-colors hover:border-accent/40"
              data-testid="project-next-button"
            >
              <div>
                <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Next Project
                </p>
                <p className="mt-1 font-display text-lg font-bold text-white group-hover:text-accent">
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-accent" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
