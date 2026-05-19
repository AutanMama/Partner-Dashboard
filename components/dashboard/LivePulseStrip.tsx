"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Cell {
  label: string;
  value: string | number;
  delta: string;
  dir: "+" | "-";
}

const initial: Cell[] = [
  { label: "Active clients", value: 1284, delta: "+12", dir: "+" },
  { label: "Open positions", value: 318, delta: "+4", dir: "+" },
  { label: "Pending KYC", value: 27, delta: "-3", dir: "-" },
  { label: "Conversion (24h)", value: "5.92%", delta: "+0.4", dir: "+" },
  { label: "Avg deposit", value: "$642", delta: "+8%", dir: "+" },
  { label: "Spread (avg)", value: "0.8 pip", delta: "-0.1", dir: "-" },
];

export function LivePulseStrip() {
  const [cells, setCells] = useState(initial);
  const [pulse, setPulse] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const idx = Math.floor(Math.random() * cells.length);
      setPulse(idx);
      setCells((prev) => {
        const next = [...prev];
        const c = { ...next[idx] };
        if (typeof c.value === "number") {
          const move = Math.round((Math.random() - 0.3) * 8);
          c.value = Math.max(0, (c.value as number) + move);
          c.dir = move >= 0 ? "+" : "-";
          c.delta = `${move >= 0 ? "+" : ""}${move}`;
        }
        next[idx] = c;
        return next;
      });
      setTimeout(() => setPulse(null), 700);
    }, 1800);
    return () => clearInterval(id);
  }, [cells.length]);

  return (
    <div className="panel grid grid-cols-2 gap-px overflow-hidden bg-white/[0.05] p-0 sm:grid-cols-3 xl:grid-cols-6">
      {cells.map((c, i) => (
        <div
          key={c.label}
          className={cn(
            "relative bg-canvas px-4 py-3 transition-colors",
            pulse === i && "bg-white/[0.025]",
          )}
        >
          {pulse === i ? (
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent-green animate-ping" />
          ) : null}
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">
            {c.label}
          </p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <p className="text-lg font-bold tabular-nums text-white">
              {c.value}
            </p>
            <span
              className={cn(
                "text-[10px] font-semibold tabular-nums",
                c.dir === "+" ? "text-accent-green" : "text-brand-500",
              )}
            >
              {c.delta}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
