"use client";

import { useMemo, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Download,
  Search,
  TrendingUp,
  TrendingDown,
  SlidersHorizontal,
} from "lucide-react";
import { trades, type Trade, type TradeStatus } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const statusTone: Record<TradeStatus, "emerald" | "brand" | "slate"> = {
  Open: "brand",
  Closed: "emerald",
  Cancelled: "slate",
};

export function TradesTable({
  rows = 12,
  hideHeader = false,
}: {
  rows?: number;
  hideHeader?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [side, setSide] = useState<"All" | "Buy" | "Sell">("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return trades.filter((t) => {
      const matchesQ =
        !q ||
        t.instrument.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q);
      const matchesS = side === "All" || t.side === side;
      return matchesQ && matchesS;
    });
  }, [query, side]);

  const display = filtered.slice(0, rows);

  return (
    <Card hoverable={false} className="overflow-hidden">
      {!hideHeader ? (
        <CardHeader
          title="Trade Activity"
          subtitle="Recent positions opened by referred clients"
          right={
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter
              </Button>
              <Button variant="primary" size="sm">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </div>
          }
        />
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by instrument or trade ID…"
            className="h-9 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] pl-9 pr-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-400/40"
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
          {(["All", "Buy", "Sell"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={cn(
                "rounded-lg px-2.5 py-1 text-[11px] font-medium transition",
                side === s
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:text-white",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 -mx-5 overflow-x-auto">
        <table className="w-full min-w-[920px] text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-white/40">
              <th className="px-5 py-3 font-medium">Trade ID</th>
              <th className="px-3 py-3 font-medium">Instrument</th>
              <th className="px-3 py-3 font-medium">Lot Size</th>
              <th className="px-3 py-3 font-medium">Side</th>
              <th className="px-3 py-3 font-medium">P/L</th>
              <th className="px-3 py-3 font-medium">Open Time</th>
              <th className="px-3 py-3 font-medium">Close Time</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {display.map((t: Trade) => {
              const positive = t.pl >= 0;
              return (
                <tr
                  key={t.id}
                  className="border-t border-white/[0.04] transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3 font-mono text-[12px] text-white/65">
                    {t.id}
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-medium text-white">
                      {t.instrument}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-white/75">
                    {t.lot.toFixed(2)}
                  </td>
                  <td className="px-3 py-3">
                    <Badge tone={t.side === "Buy" ? "emerald" : "rose"} dot>
                      {t.side}
                    </Badge>
                  </td>
                  <td
                    className={cn(
                      "px-3 py-3 font-semibold",
                      positive ? "text-emerald-300" : "text-rose-300",
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {positive ? (
                        <TrendingUp className="h-3.5 w-3.5" />
                      ) : (
                        <TrendingDown className="h-3.5 w-3.5" />
                      )}
                      {positive ? "+" : "-"}
                      {formatCurrency(Math.abs(t.pl), { maximumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-white/55">{t.openTime}</td>
                  <td className="px-3 py-3 text-white/55">{t.closeTime}</td>
                  <td className="px-5 py-3">
                    <Badge tone={statusTone[t.status]} dot>
                      {t.status}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
