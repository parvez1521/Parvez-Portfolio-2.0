import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "./motion";

const LINKS = [
  { label: "Work", hash: "#work", testid: "nav-link-work" },
  { label: "About", hash: "#about", testid: "nav-link-about" },
  { label: "Services", hash: "#services", testid: "nav-link-services" },
  { label: "Contact", hash: "#contact", testid: "nav-link-contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (hash) => {
    setOpen(false);
    scrollToSection(hash);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
        data-testid="navbar"
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6">
          <button
            onClick={() => window.__lenis?.scrollTo(0, { duration: 1.2 })}
            className="font-display text-xl font-extrabold tracking-tight text-white"
            data-testid="nav-logo"
          >
            PARVEZ<span className="text-accent">.</span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <button
                key={l.hash}
                onClick={() => go(l.hash)}
                className="font-mono2 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
                data-testid={l.testid}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => go("#contact")}
              className="group flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 font-display text-sm font-bold text-ink transition-colors hover:bg-accent-hover"
              data-testid="nav-cta-button"
            >
              Let's Talk
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </nav>

          <button
            className="text-white md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            data-testid="mobile-menu-button"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-xl"
            data-testid="mobile-menu"
          >
            <div className="flex h-[72px] items-center justify-between px-6">
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                PARVEZ<span className="text-accent">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-white"
                data-testid="mobile-menu-close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.hash}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  onClick={() => go(l.hash)}
                  className="border-b border-white/10 py-5 text-left font-display text-4xl font-bold text-white"
                  data-testid={`mobile-${l.testid}`}
                >
                  {l.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onClick={() => go("#contact")}
                className="mt-8 flex w-fit items-center gap-2 rounded-full bg-accent px-8 py-4 font-display text-lg font-bold text-ink"
                data-testid="mobile-nav-cta"
              >
                Let's Talk <ArrowUpRight className="h-5 w-5" />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
