import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  PaperPlaneTilt,
  Check,
  Plus,
  Copy,
  ArrowUpRight,
} from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";
import { personal } from "../data.js";

const fieldCls =
  "w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 text-[15px] text-[var(--ink)] placeholder:text-[var(--faint)] transition-colors focus:border-[var(--accent)] focus:outline-none";

const fieldLabel =
  "font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]";

const topics = [
  "Landing page",
  "Web app",
  "UI revamp",
  "Collaboration",
  "Just saying hi",
];

const facts = [
  ["Status", "Open", true],
  ["Base", "Bali · UTC+8", false],
  ["Work", "Remote worldwide", false],
  ["Reply", "Within a day", false],
];

const textLink =
  "inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]";

function Word({ children, i }) {
  return (
    <motion.span
      className="inline-block will-change-transform"
      initial={{ y: "110%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.span>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const reduce = useReducedMotion();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subjectLine = encodeURIComponent(String(data.get("subject") || "Project inquiry"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subjectLine}&body=${body}`;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden border-t border-[var(--line)]">
      {/* ambient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 85% 10%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-center gap-3">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                <span className="h-2 w-2 rounded-full bg-green-500" />
              </span>
              Open for projects
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
              Usually replies within a day
            </p>
          </Reveal>
        </div>

        {/* masked-line headline reveal */}
        <h2 className="mt-5 font-display text-[19vw] font-extrabold uppercase leading-[0.85] tracking-tight sm:text-7xl md:text-8xl">
          <span className="block overflow-hidden pb-1">
            <Word i={0}>Let's</Word> <Word i={1}><span className="text-stroke">talk</span></Word>
          </span>
        </h2>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
          {/* left — open editorial rows, no boxes */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                01 — Pick a topic
              </p>
              <div className="mt-3 border-t border-[var(--line)]" role="group" aria-label="Message topic">
                {topics.map((t, i) => {
                  const active = subject === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSubject(active ? "" : t)}
                      aria-pressed={active}
                      className="group flex w-full items-center gap-3 border-b border-[var(--line)] py-3 text-left"
                    >
                      <span className="font-mono text-[11px] text-[var(--faint)]">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-2xl font-bold uppercase leading-none tracking-tight transition-all duration-300 group-hover:translate-x-1 sm:text-3xl ${
                          active ? "text-[var(--accent)]" : ""
                        }`}
                      >
                        {t}
                      </span>
                      <span className="ml-auto shrink-0">
                        {active ? (
                          <Check className="h-5 w-5 text-[var(--accent)]" weight="bold" />
                        ) : (
                          <Plus className="h-5 w-5 text-[var(--faint)] transition-colors group-hover:text-[var(--ink)]" weight="bold" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">
                The subject fills itself in — then tell me the details.
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                02 — Availability
              </p>
              <dl className="mt-3 border-t border-[var(--line)]">
                {facts.map(([label, value, dot]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 border-b border-[var(--line)] py-2.5"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                      {label}
                    </dt>
                    <dd className="flex items-center gap-1.5 text-sm font-bold">
                      {dot ? (
                        <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
                      ) : null}
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                03 — Direct
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="group mt-2 flex items-center gap-2 text-xl font-bold tracking-tight sm:text-2xl"
              >
                <span className="break-all group-hover:underline">{personal.email}</span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  weight="bold"
                />
              </a>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <button type="button" onClick={copyEmail} className={textLink}>
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy email"}
                </button>
                <a href={personal.whatsapp} target="_blank" rel="noreferrer" className={textLink}>
                  WhatsApp
                  <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
                </a>
                {[
                  ["GitHub", personal.github],
                  ["LinkedIn", personal.linkedin],
                  ["Instagram", personal.instagram],
                ].map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className={textLink}>
                    {label}
                    <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* right — open form, no card */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <motion.form
              onSubmit={onSubmit}
              className="border-t border-[var(--line)] pt-6"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                  04 — Write it
                </p>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] sm:block">
                  Direct to inbox
                </span>
              </div>
              <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className={fieldLabel}>Full Name</label>
                  <input id="name" name="name" required placeholder="Enter your full name" className={fieldCls} autoComplete="name" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className={fieldLabel}>Email Address</label>
                  <input id="email" name="email" type="email" required placeholder="name@gmail.com" className={fieldCls} autoComplete="email" />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-1">
                <label htmlFor="subject" className={fieldLabel}>Subject</label>
                <input
                  id="subject"
                  name="subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Pick a topic on the left, or write your own"
                  className={fieldCls}
                />
              </div>
              <div className="mt-6 flex flex-col gap-1">
                <label htmlFor="message" className={fieldLabel}>Message</label>
                <textarea id="message" name="message" rows={5} required placeholder="Tell me about your project…" className={`${fieldCls} resize-y`} />
              </div>
              <motion.button
                type="submit"
                whileHover={reduce ? {} : { scale: 1.03 }}
                whileTap={reduce ? {} : { scale: 0.97 }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white sm:w-auto"
              >
                <PaperPlaneTilt className="h-4 w-4" weight="duotone" />
                Send Message
              </motion.button>
              {sent ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 text-sm text-[var(--accent)]"
                  role="status"
                >
                  <Check className="h-4 w-4" weight="bold" />
                  Your mail app should now open — I will reply shortly.
                </motion.p>
              ) : null}
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
