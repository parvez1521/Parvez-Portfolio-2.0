import { tools } from "../data/content";
import { Reveal } from "./motion";

export default function Tools() {
  return (
    <section
      className="border-t border-white/10 py-20"
      data-testid="tools-section"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono2 text-xs uppercase tracking-[0.25em] text-accent">
            Toolkit
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {tools.map((tool, i) => (
            <Reveal key={tool.name} delay={i * 0.05}>
              <div
                className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 py-8 transition-colors hover:border-white/30"
                data-testid={`tool-${tool.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="font-display text-3xl font-extrabold tracking-tight text-white/35 transition-colors group-hover:text-white">
                  {tool.mark}
                </span>
                <span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {tool.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
