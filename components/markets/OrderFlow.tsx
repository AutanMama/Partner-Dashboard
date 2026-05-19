"use client";

import { useEffect, useState } from "react";
import { makeLiveTrades, type LiveTrade } from "@/lib/markets";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

export function OrderFlow() {
  const [trades, setTrades] = useState<LiveTrade[]>(() => makeLiveTrades(14, 0));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setTrades((prev) => {
        // generate a single new trade and prepend
        const nt = makeLiveTrades(1, Date.now())[0];
        nt.time = "just now";
        return [nt, ...prev.slice(0, 13)];
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <Card className="col-span-12 xl:col-span-5">
      <CardHeader
        title="Live Order Flow"
        subtitle="Real-time trades by referred clients"
        right={
          <Badge tone="green" dot>
            Streaming
          </Badge>
        }
      />
      <ul className="flex flex-col">
        {trades.map((t, i) => {
          const buy = t.side === "Buy";
          return (
            <li
              key={`${t.id}-${tick}-${i}`}
              className={cn(
                "grid grid-cols-[18px_1fr_70px_90px_70px] items-center gap-3 border-b border-white/[0.04] py-2 text-[12px] last:border-b-0",
                i === 0 && "animate-fade-in-up",
              )}
            >
              {buy ? (
                <ArrowUp className="h-3.5 w-3.5 text-accent-green" />
              ) : (
                <ArrowDown className="h-3.5 w-3.5 text-brand-500" />
              )}
              <span className="truncate font-semibold text-white">
                {t.symbol}
              </span>
              <span className="text-right tabular-nums text-white/75">
                {t.lot.toFixed(2)}
              </span>
              <span
                className={cn(
                  "text-right font-mono tabular-nums",
                  buy ? "text-accent-green" : "text-brand-500",
                )}
              >
                {t.price.toFixed(t.price > 100 ? 2 : 5)}
              </span>
              <span className="text-right text-[11px] text-white/45">
                {t.time}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
