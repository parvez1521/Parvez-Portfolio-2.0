import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Loader2, MessageCircle } from "lucide-react";
import { socials } from "../data/content";
import { Reveal, SectionHeading } from "./motion";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

const PROJECT_TYPES = [
  "Short-Form Video Editing",
  "Long-Form Video Editing",
  "Motion Graphics",
  "AI Video Production",
  "Social Media Content",
  "Content Repurposing",
  "Other",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Not sure yet",
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-surface px-4 py-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-accent/60 focus:outline-none";

const labelClass =
  "mb-2 block font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/40";

const SOCIAL_LINKS = [
  { label: "Instagram", handle: "@tech_hacks.ai", href: socials.instagram },
  { label: "LinkedIn", handle: "Parvez Siddiqui", href: socials.linkedin },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project_type: "",
    budget: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return;

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error("Contact form is not configured yet. Please try again later.");
      return;
    }

    const payload = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim()]),
    );
    if (
      payload.name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
      !payload.project_type ||
      !payload.budget ||
      payload.message.length < 10
    ) {
      toast.error("Please complete all fields with valid information.");
      return;
    }

    setSending(true);
    try {
      const formData = new FormData(e.currentTarget);
      formData.set("email", payload.email);
      formData.set("replyto", payload.email);

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your inquiry.");
      }

      toast.success("Inquiry sent — I'll get back to you soon.");
      setForm({ name: "", email: "", project_type: "", budget: "", message: "" });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="border-t border-white/10 py-28 lg:py-40"
      data-testid="contact-section"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading eyebrow="Contact" title="Let's make something worth watching." />
          <Reveal delay={0.15}>
            <a
              href={`mailto:${socials.email}`}
              className="mt-10 inline-block font-display text-xl font-bold text-white underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent sm:text-2xl"
              data-testid="contact-email-link"
            >
              {socials.email}
            </a>
          </Reveal>
          <div className="mt-12 space-y-1">
            {SOCIAL_LINKS.map((link, i) => (
              <Reveal key={link.label} delay={0.2 + i * 0.06}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-t border-white/10 py-5 transition-colors hover:border-accent/40"
                  data-testid={`social-link-${link.label.toLowerCase()}`}
                >
                  <div>
                    <p className="font-display text-lg font-bold text-white group-hover:text-accent">
                      {link.label}
                    </p>
                    <p className="mt-0.5 font-mono2 text-[11px] uppercase tracking-[0.15em] text-white/40">
                      {link.handle}
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <form
            onSubmit={submit}
            className="rounded-3xl border border-white/10 bg-surface/50 p-8 backdrop-blur-sm sm:p-10"
            data-testid="contact-form"
          >
            <a
              href={socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group mb-8 flex items-center gap-4 rounded-2xl border border-accent/50 bg-accent px-5 py-4 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-[0_12px_35px_rgba(190,255,0,0.18)]"
              data-testid="whatsapp-cta"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-accent transition-transform duration-300 group-hover:scale-105">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-bold leading-tight">
                  Let&apos;s Talk on WhatsApp
                </span>
                <span className="mt-1 block font-mono2 text-[10px] uppercase tracking-[0.16em] text-ink/65">
                  Quickest way to reach me
                </span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
            <input type="hidden" name="subject" value="New Portfolio Inquiry" />
            <input type="hidden" name="from_name" value="Parvez Portfolio" />
            <input type="hidden" name="replyto" value={form.email} />
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClass}>
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  minLength={2}
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className={inputClass}
                  data-testid="contact-name-input"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  className={inputClass}
                  data-testid="contact-email-input"
                />
              </div>
              <div>
                <label htmlFor="contact-project-type" className={labelClass}>
                  Project Type
                </label>
                <select
                  id="contact-project-type"
                  name="project_type"
                  required
                  value={form.project_type}
                  onChange={update("project_type")}
                  className={`${inputClass} appearance-none ${form.project_type ? "" : "text-white/30"}`}
                  data-testid="contact-project-type-select"
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-surface text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contact-budget" className={labelClass}>
                  Budget
                </label>
                <select
                  id="contact-budget"
                  name="budget"
                  required
                  value={form.budget}
                  onChange={update("budget")}
                  className={`${inputClass} appearance-none ${form.budget ? "" : "text-white/30"}`}
                  data-testid="contact-budget-select"
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b} className="bg-surface text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell me about your project, timeline and goals."
                  className={`${inputClass} resize-none`}
                  data-testid="contact-message-input"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-display text-base font-bold text-ink transition-colors hover:bg-accent-hover disabled:opacity-60"
              data-testid="contact-form-submit"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send Inquiry <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
