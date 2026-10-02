import { useState } from "react";
import { ChatCircleText, X, PaperPlaneTilt } from "@phosphor-icons/react";
import { assistantRules, personal } from "../data.js";

function answerFor(q) {
  const lower = q.toLowerCase();
  for (const r of assistantRules) {
    if (r.keys.some((k) => lower.includes(k))) return r.reply;
  }
  return "I can help with reach, availability, stack, projects or location. Try: Is he available?";
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "bot", text: `Hi — I'm ${personal.short}'s assistant. How can I help?` },
  ]);

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: answerFor(q) }]);
      setTyping(false);
    }, 650);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--pill)] text-[var(--pill-ink)] shadow-xl transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" weight="bold" /> : <ChatCircleText className="h-6 w-6" weight="duotone" />}
        {!open ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-70" />
            <span className="h-3.5 w-3.5 rounded-full bg-[var(--accent)]" />
          </span>
        ) : null}
      </button>

      {open ? (
        <div
          className="fixed bottom-21 right-5 z-[70] flex max-h-[70dvh] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-2xl"
          role="dialog"
          aria-label="Ask my assistant"
          style={{ bottom: "5.25rem" }}
        >
          <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--bg-soft)] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" aria-hidden="true" />
            <p className="text-sm font-semibold">Ask My Assistant</p>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
              Online
            </span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.from === "bot"
                    ? "bg-[var(--bg-soft)]"
                    : "ml-auto bg-[var(--pill)] text-[var(--pill-ink)]"
                }`}
              >
                {m.text}
              </p>
            ))}
            {typing ? (
              <p className="flex w-fit gap-1 rounded-2xl bg-[var(--bg-soft)] px-3.5 py-3" aria-label="Typing">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="dot-blink h-1.5 w-1.5 rounded-full bg-[var(--muted)]"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {["Is he available?", "What is his stack?", "How can I reach him?"].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full border border-[var(--line)] px-3 py-1.5 font-mono text-[11px] transition-colors hover:border-[var(--ink)]"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <form
            className="flex gap-2 border-t border-[var(--line)] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <label htmlFor="assistant-input" className="sr-only">
              Message
            </label>
            <input
              id="assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message"
              className="min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-[var(--bg)] px-3 py-2.5 text-sm placeholder:text-[var(--faint)] focus:border-[var(--accent)] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform hover:scale-105 active:scale-95"
            >
              <PaperPlaneTilt className="h-4 w-4" weight="duotone" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
