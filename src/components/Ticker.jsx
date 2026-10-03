import { Asterisk } from "@phosphor-icons/react";
import { marqueeItems } from "../data.js";

// Repeat items so one half is always wider than the viewport.
// Otherwise a gap shows on the right and the -50% loop visibly jumps.
const REPEAT = 4;
const halfItems = Array.from({ length: REPEAT }, () => marqueeItems).flat();

function Half({ hidden }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {halfItems.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-2xl font-bold uppercase tracking-tight">
            {item}
          </span>
          <Asterisk className="h-5 w-5 shrink-0 text-[var(--accent)]" weight="bold" />
        </span>
      ))}
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="overflow-hidden border-y border-[var(--line)] bg-[var(--bg)] py-3">
      <div className="marquee-track flex w-max">
        <Half hidden={false} />
        <Half hidden={true} />
      </div>
    </div>
  );
}
