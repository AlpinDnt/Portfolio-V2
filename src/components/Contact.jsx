import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Copy,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  PaperPlaneTilt,
  WhatsappLogo,
} from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";
import { personal } from "../data.js";

const availability = [
  ["Status", "Open for projects", true],
  ["Base", "Bali · UTC+8", false],
  ["Work", "Remote worldwide", false],
  ["Reply", "Within a day", false],
];

const railLinks = [
  { label: "GitHub", href: personal.github, Icon: GithubLogo },
  { label: "LinkedIn", href: personal.linkedin, Icon: LinkedinLogo },
  { label: "Instagram", href: personal.instagram, Icon: InstagramLogo },
  { label: "WhatsApp", href: personal.whatsapp, Icon: WhatsappLogo },
];

const bottomLinks = [
  ["E-Mail", `mailto:${personal.email}`],
  ["WhatsApp", personal.whatsapp],
  ["GitHub", personal.github],
  ["LinkedIn", personal.linkedin],
  ["Instagram", personal.instagram],
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

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
    <section
      id="contact"
      className="contact-invert scroll-mt-20 bg-[var(--c-bg)] text-[var(--c-ink)] transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        {/* ===== TOP — CONTACT US ===== */}
        <div className="flex flex-wrap items-center gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--c-line)] bg-[var(--c-chip)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--status)] opacity-60" />
              <span className="h-2 w-2 rounded-full bg-[var(--status)]" />
            </span>
            Open for projects
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-muted)]">
            Usually replies within a day
          </p>
        </div>

        <Reveal>
          <h2 className="mt-6 font-display text-[17vw] font-extrabold uppercase leading-[0.85] tracking-tight text-[var(--c-ink)] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
            Contact us
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--c-muted)]">
            Have any projects in mind? Don&apos;t hesitate to reach out,
            and let&apos;s have a conversation.
          </p>
        </Reveal>

        {/* ===== MIDDLE — GET IN TOUCH / SEND ===== */}
        <div className="mt-12 grid items-stretch gap-10 border-t border-[var(--c-line)] pt-10 lg:grid-cols-[1.05fr_1fr_auto] lg:gap-0">
          {/* left */}
          <div className="lg:pr-12">
            <Reveal>
              <h3 className="text-[15px] font-extrabold uppercase leading-tight tracking-tight text-[var(--c-ink)]">
                Get in touch
              </h3>
              <p className="mt-2 max-w-[42ch] text-[12.5px] leading-relaxed text-[var(--c-muted)]">
                Simply Want To Connect Or Have A General Inquiry? Feel Free
                To Reach Out, And I&apos;ll Get Back To You As Soon As I Can.
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="group mt-5 block font-display text-[8.4vw] font-extrabold uppercase leading-[0.9] tracking-tight text-[var(--c-ink)] sm:text-4xl lg:text-[2.9rem]"
              >
                <span className="break-all transition-colors group-hover:text-[var(--accent)]">
                  {personal.email}
                </span>
              </a>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--c-muted)] transition-colors hover:text-[var(--accent)]"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? "Copied!" : "Copy email"}
                </button>
                <a
                  href={personal.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--c-muted)] transition-colors hover:text-[var(--accent)]"
                >
                  WhatsApp
                  <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <dl className="mt-8 border-t border-[var(--c-line)]">
                {availability.map(([label, value, dot]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 border-b border-[var(--c-line)] py-2.5"
                  >
                    <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--c-muted)]">
                      {label}
                    </dt>
                    <dd className="flex items-center gap-1.5 text-sm font-bold text-[var(--c-ink)]">
                      {dot ? (
                        <span
                          className="h-2 w-2 rounded-full bg-[var(--status)]"
                          aria-hidden="true"
                        />
                      ) : null}
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* right — persis referensi: judul + deskripsi + pill button */}
          <div className="flex flex-col justify-center self-stretch border-t border-[var(--c-line)] pt-10 lg:border-l lg:border-t-0 lg:px-12 lg:pt-0">
            <Reveal className="flex h-full flex-col justify-center">
              <h3 className="text-[15px] font-extrabold uppercase leading-tight tracking-tight text-[var(--c-ink)]">
                Send a suggestion
              </h3>
              <p className="mt-2 max-w-[38ch] text-[12.5px] leading-relaxed text-[var(--c-muted)]">
                Have A Landing Page, Web App, Or UI Revamp In Mind?
                Share Your Brief — I&apos;ll Reply With Scope,
                Timeline, And Next Steps.
              </p>
              <motion.a
                href={personal.whatsapp}
                target="_blank"
                rel="noreferrer"
                whileHover={reduce ? {} : { scale: 1.04 }}
                whileTap={reduce ? {} : { scale: 0.96 }}
                className="mt-5 inline-flex w-fit items-center gap-3 rounded-full bg-[var(--c-btn)] py-2 pl-6 pr-2 text-[13px] font-medium text-[var(--c-btn-ink)]"
              >
                Send message
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--c-btn-ink)]/15">
                  <ArrowRight className="h-4 w-4" weight="bold" />
                </span>
              </motion.a>
            </Reveal>
          </div>

          {/* far-right icon rail ala referensi */}
          <div className="hidden self-stretch lg:flex lg:flex-col lg:items-center lg:justify-center lg:gap-3 lg:border-l lg:border-[var(--c-line)] lg:pl-8">
            {railLinks.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                whileHover={reduce ? {} : { scale: 1.1, y: -2 }}
                whileTap={reduce ? {} : { scale: 0.94 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--c-line)] text-[var(--c-muted)] transition-colors hover:text-[var(--accent)]"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* ===== BOTTOM — LET'S WORK TOGETHER (band kontras, ikut tema) ===== */}
      <div className="bg-[var(--c-cta-bg)] text-[var(--c-cta-ink)] transition-colors duration-300">
        <div className="mx-auto max-w-[1400px] px-4 py-12 text-center md:px-8 md:py-16">
          <motion.h3
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[15vw] font-extrabold uppercase leading-[0.85] tracking-tight sm:text-7xl md:text-8xl lg:text-[7rem]"
          >
            Let&apos;s work
            <span className="block">together.</span>
          </motion.h3>

          <div className="mx-auto mt-8 flex max-w-[640px] items-center gap-4">
            <span className="shrink-0 text-sm text-[var(--c-cta-muted)]">
              Have a project in mind?
            </span>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Say hello via email"
              className="group flex flex-1 items-center gap-0"
            >
              <span className="h-[2px] flex-1 bg-[var(--c-cta-line)] transition-colors group-hover:bg-[var(--c-cta-ink)]" />
                <ArrowRight
                  className="h-5 w-5 -ml-1 shrink-0 text-[var(--c-cta-line)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--c-cta-ink)]"
                  weight="bold"
                />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="shrink-0 text-sm font-semibold hover:underline"
            >
              Say hello
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {bottomLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="font-mono text-xs tracking-wide text-[var(--c-cta-muted)] transition-colors hover:text-[var(--c-cta-ink)]"
              >
                {label}
              </a>
            ))}
          </div>

          {/* mobile socials (rail hidden di mobile) */}
          <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
            {railLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--c-cta-line)] text-[var(--c-cta-muted)]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--c-cta-line)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--c-cta-muted)]">
            <PaperPlaneTilt className="h-3.5 w-3.5" />
            Direct to inbox — no spam, ever
          </p>
        </div>
      </div>
    </section>
  );
}
