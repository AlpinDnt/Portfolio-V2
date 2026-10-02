import { Asterisk } from "@phosphor-icons/react";
import { marqueeItems } from "../data.js";

export default function Ticker() {
  const row = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl font-bold uppercase tracking-tight">
            {item}
          </span>
          <Asterisk className="h-5 w-5 shrink-0 text-[var(--accent)]" weight="bold" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-[var(--bg-soft)] py-3">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
