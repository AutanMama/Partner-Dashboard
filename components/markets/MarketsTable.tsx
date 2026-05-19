"use client";

import { useEffect, useMemo, useState } from "react";
import { instruments, type AssetClass, type Instrument } from "@/lib/markets";
import { Sparkline } from "@/components/ui/Sparkline";
import { cn, formatCompact } from "@/lib/utils";
import { ArrowDown, ArrowUp, Star } from "lucide-react";

const tabs: (AssetClass | "All" | "Watchlist")[] = [
  "All",
  "Forex",
  "Metals",
  "Crypto",
  "Indices",
  "Energies",
  "Watchlist",
];

type Live = { price: number; change: number; dir: "up" | "down" | "flat" };

function buildInitial(): Record<string, Live> {
  return Object.fromEntries(
    instruments.map((i) => [
      i.symbol,
      { price: i.price, change: i.change, dir: "flat" as const },
    ]),
  );
}

function tickOne(prev: Live, base: Instrument): Live {
  const vol = base.price * (base.asset === "Crypto" ? 0.0009 : 0.0002);
  const delta = (Math.random() - 0.5) * vol * 2;
  const price = Math.max(0.0001, prev.price + delta);
  const change = base.change + ((price - base.price) / base.price) * 100;
  return {
    price,
    change,
    dir: delta > 0 ? "up" : delta < 0 ? "down" : "flat",
  };
}

export function MarketsTable() {
  const [tab, setTab] = useState<(AssetClass | "All" | "Watchlist")>("All");
  const [watch, setWatch] = useState<Set<string>>(
    () => new Set(["EUR/USD", "XAU/USD", "BTC/USD"]),
  );
  const [ticks, setTicks] = useState<Record<string, Live>>(buildInitial);

  useEffect(() => {
    const id = setInterval(() => {
      setTicks((prev) => {
        const next = { ...prev };
        const targets = new Set<string>();
        for (let i = 0; i < 6; i++) {
          targets.add(
            instruments[Math.floor(Math.random() * instruments.length)].symbol,
          );
        }
        for (const ins of instruments) {
          if (targets.has(ins.symbol)) next[ins.symbol] = tickOne(prev[ins.symbol], ins);
        }
        return next;
      });
    }, 900);
    return () => clearInterval(id);
  }, []);

  const rows = useMemo(() => {
    if (tab === "All") return instruments;
    if (tab === "Watchlist")
      return instruments.filter((i) => watch.has(i.symbol));
    return instruments.filter((i) => i.asset === tab);
  }, [tab, watch]);

  function toggleWatch(symbol: string) {
    setWatch((prev) => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol);
      else next.add(symbol);
      return next;
    });
  }

  return (
    <div className="panel overflow-hidden p-0">
      <div className="flex flex-col gap-3 border-b border-white/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>
          <p className="text-sm font-bold text-white">Markets</p>
          <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
            {rows.length} live
          </span>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:px-0">
          <div className="flex min-w-max items-center gap-1.5">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn("pill shrink-0 text-[12px]", tab === t && "pill-active")}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-[24px_minmax(120px,1.5fr)_1fr_1fr_1fr_80px_1.2fr] items-center gap-3 border-b border-white/[0.04] px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-white/45 sm:px-5">
        <span />
        <span>Symbol</span>
        <span className="text-right">Bid</span>
        <span className="text-right">Ask</span>
        <span className="text-right">24h Δ</span>
        <span className="text-right">Spread</span>
        <span className="text-right">24h</span>
      </div>

      <ul>
        {rows.map((ins) => {
          const t = ticks[ins.symbol];
          const half = ins.spread / 2;
          const bid = t.price - half * Math.pow(10, -ins.digits);
          const ask = t.price + half * Math.pow(10, -ins.digits);
          const up = t.change >= 0;
          const watched = watch.has(ins.symbol);
          return (
            <li
              key={ins.symbol}
              className="grid grid-cols-[24px_minmax(120px,1.5fr)_1fr_1fr_1fr_80px_1.2fr] items-center gap-3 border-b border-white/[0.03] px-4 py-3 text-sm transition-colors hover:bg-white/[0.02] sm:px-5"
            >
              <button
                onClick={() => toggleWatch(ins.symbol)}
                aria-label="Toggle watchlist"
                className="text-white/35 hover:text-amber-400"
              >
                <Star
                  className={cn(
                    "h-4 w-4",
                    watched && "fill-amber-400 text-amber-400",
                  )}
                />
              </button>

              <div className="min-w-0">
                <p className="truncate font-semibold text-white">
                  {ins.symbol}
                </p>
                <p className="truncate text-[11px] text-white/45">{ins.name}</p>
              </div>

              <span
                className={cn(
                  "text-right font-mono tabular-nums transition-colors",
                  t.dir === "down" && "text-brand-500",
                  t.dir === "up" && "text-accent-green",
                  t.dir === "flat" && "text-white/80",
                )}
              >
                {bid.toFixed(ins.digits)}
              </span>
              <span
                className={cn(
                  "text-right font-mono tabular-nums transition-colors",
                  t.dir === "down" && "text-brand-500",
                  t.dir === "up" && "text-accent-green",
                  t.dir === "flat" && "text-white/80",
                )}
              >
                {ask.toFixed(ins.digits)}
              </span>

              <span
                className={cn(
                  "inline-flex items-center justify-end gap-0.5 text-right text-xs font-semibold tabular-nums",
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

              <span className="text-right text-xs text-white/55">
                {ins.spread.toFixed(ins.digits >= 4 ? 1 : 2)}
              </span>

              <div className="flex items-center justify-end gap-3">
                <span className="text-[10px] tabular-nums text-white/40">
                  {formatCompact(ins.volume24h)}
                </span>
                <div className="h-9 w-20 sm:w-24">
                  <Sparkline
                    data={ins.spark}
                    color={up ? "#19c37d" : "#e11d2a"}
                    height={36}
                  />
                </div>
              </div>
            </li>
          );
        })}
        {rows.length === 0 ? (
          <li className="px-4 py-12 text-center text-sm text-white/45 sm:px-5">
            No instruments in your watchlist yet. Tap the star next to any
            symbol to add it.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
