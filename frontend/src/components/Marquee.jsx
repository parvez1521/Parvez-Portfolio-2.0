const ITEMS = [
  "SHORT-FORM",
  "LONG-FORM",
  "MOTION GRAPHICS",
  "AI VIDEO",
  "SOCIAL CONTENT",
  "KINETIC TYPE",
  "RETENTION-FIRST",
];

export default function Marquee() {
  return (
    <section
      className="overflow-hidden border-y border-white/10 py-8"
      data-testid="marquee-section"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-16 pr-16">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-16">
            <span
              className={`whitespace-nowrap font-display text-5xl font-extrabold tracking-tight sm:text-6xl ${
                i % 2 === 0 ? "text-white/90" : "text-stroke"
              }`}
            >
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </section>
  );
}
