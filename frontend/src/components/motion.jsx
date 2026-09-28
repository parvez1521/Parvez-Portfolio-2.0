import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 32, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block will-change-transform"
      initial={{ y: "110%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Counter = ({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  className = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const SectionHeading = ({ eyebrow, title, className = "" }) => (
  <div className={className}>
    <Reveal>
      <p className="font-mono2 text-xs uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
        {title}
      </h2>
    </Reveal>
  </div>
);

export const scrollToSection = (hash) => {
  if (window.__lenis) {
    window.__lenis.scrollTo(hash, { offset: -72, duration: 1.4 });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }
};
