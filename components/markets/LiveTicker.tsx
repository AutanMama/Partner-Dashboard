"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Circle } from "lucide-react";
import { instruments, type Instrument } from "@/lib/markets";
import { cn } from "@/lib/utils";

// Tiny live tick simulation — every 1.6s nudge each price by a fraction
// of its volatility and flash green/red briefly.
type Tick = {
  price: number;
  change: number;
  dir: "up" | "down" | "flat";
  flash: number; // timestamp used to trigger a flash class
};

function nextTick(prev: Tick, base: Instrument): Tick {
  const vol = base.price * (base.asset === "Crypto" ? 0.0008 : 0.00018);
  const delta = (Math.random() - 0.5) * vol * 2;
  const price = Math.max(0.0001, prev.price + delta);
  const dir: Tick["dir"] = delta > 0 ? "up" : delta < 0 ? "down" : "flat";
  const change = base.change + ((price - base.price) / base.price) * 100;
  return { price, change, dir, flash: Date.now() };
}

export function LiveTicker() {
  const [ticks, setTicks] = useState<Record<string, Tick>>(() =>
    Object.fromEntries(
      instruments.map((i) => [
        i.symbol,
        { price: i.price, change: i.change, dir: "flat" as const, flash: 0 },
      ]),
    ),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setTicks((prev) => {
        const next: Record<string, Tick> = {};
        // pick 4 random instruments to update each cycle (more realistic)
        const updateSet = new Set<string>();
        for (let i = 0; i < 4; i++) {
          updateSet.add(
            instruments[Math.floor(Math.random() * instruments.length)].symbol,
          );
        }
        for (const ins of instruments) {
          if (updateSet.has(ins.symbol)) {
            next[ins.symbol] = nextTick(prev[ins.symbol], ins);
          } else {
            next[ins.symbol] = prev[ins.symbol];
          }
        }
        return next;
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // Duplicate the list so the marquee loops seamlessly
  const stream = [...instruments, ...instruments];

  return (
    <div className="panel relative overflow-hidden p-0">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-1.5">
        <div className="relative flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent-green">
            Live
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.12em] text-white/45">
          Market tape · {instruments.length} instruments
        </span>
        <span className="ml-auto text-[10px] tabular-nums text-white/45">
          {new Date().toLocaleTimeString("en-GB", { hour12: false })}
        </span>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex w-max items-center gap-6 py-2.5"
          style={{
            animation: "ticker 60s linear infinite",
          }}
        >
          {stream.map((ins, idx) => {
            const t = ticks[ins.symbol];
            const up = t.change >= 0;
            return (
              <div
                key={`${ins.symbol}-${idx}`}
                className="flex shrink-0 items-center gap-2 px-2 text-[12px]"
              >
                <span className="font-semibold text-white/90">
                  {ins.symbol}
                </span>
                <span
                  className={cn(
                    "tabular-nums transition-colors",
                    t.dir === "up" && "text-accent-green",
                    t.dir === "down" && "text-brand-500",
                    t.dir === "flat" && "text-white/80",
                  )}
                >
                  {t.price.toFixed(ins.digits)}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-[11px] font-semibold tabular-nums",
                    up ? "text-accent-green" : "text-brand-500",
                  )}
                >
                  {up ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {Math.abs(t.change).toFixed(2)}%
                </span>
                <Circle className="h-1 w-1 fill-white/20 text-white/20" />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
