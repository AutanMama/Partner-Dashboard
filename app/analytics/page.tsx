"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LiveTicker } from "@/components/markets/LiveTicker";
import { MarketsTable } from "@/components/markets/MarketsTable";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "@/components/dashboard/ChartTooltip";
import { instruments, intradayPrice } from "@/lib/markets";
import { ArrowDown, ArrowUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const timeframes = ["1m", "5m", "15m", "1H", "4H", "1D"] as const;

export default function MarketsPage() {
  const [symbol, setSymbol] = useState("XAU/USD");
  const [tf, setTf] = useState<(typeof timeframes)[number]>("15m");
  const [livePrice, setLivePrice] = useState(0);

  const inst = useMemo(
    () => instruments.find((i) => i.symbol === symbol) ?? instruments[0],
    [symbol],
  );
  const series = useMemo(() => intradayPrice(symbol, 96), [symbol]);

  useEffect(() => {
    setLivePrice(inst.price);
    const id = setInterval(() => {
      setLivePrice((p) =>
        Math.max(
          0,
          p + (Math.random() - 0.5) * inst.price * 0.0004,
        ),
      );
    }, 1200);
    return () => clearInterval(id);
  }, [inst]);

  const dailyHigh = Math.max(...series.map((p) => p.price));
  const dailyLow = Math.min(...series.map((p) => p.price));
  const up = inst.change >= 0;

  return (
    <>
      <LiveTicker />

      <PageHeader
        title="Markets"
        description="Live institutional price feed across forex, metals, indices, crypto and energies."
      >
        <Badge tone="green" dot>
          Market open
        </Badge>
        <Button variant="primary" size="md">
          <Plus className="h-3.5 w-3.5" />
          New Order
        </Button>
      </PageHeader>

      {/* Featured instrument header */}
      <Card hoverable={false}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-500/10 text-brand-500 text-base font-bold">
              {symbol.split("/")[0].slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-white">{inst.symbol}</p>
                <Badge tone="slate">{inst.asset}</Badge>
              </div>
              <p className="text-xs text-white/55">{inst.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <motion.p
                key={Math.round(livePrice * 100000)}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                className={cn(
                  "font-mono text-2xl font-bold tabular-nums",
                  up ? "text-accent-green" : "text-brand-500",
                )}
              >
                {livePrice.toFixed(inst.digits)}
              </motion.p>
              <p
                className={cn(
                  "inline-flex items-center justify-end gap-1 text-xs font-semibold",
                  up ? "text-accent-green" : "text-brand-500",
                )}
              >
                {up ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                {Math.abs(inst.change).toFixed(2)}% today
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-[10px] uppercase tracking-wider text-white/45">
                24h Range
              </p>
              <p className="text-xs text-white/85 tabular-nums">
                {dailyLow.toFixed(inst.digits)} –{" "}
                {dailyHigh.toFixed(inst.digits)}
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-[10px] uppercase tracking-wider text-white/45">
                Spread
              </p>
              <p className="text-xs text-white/85">{inst.spread.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
          {timeframes.map((t) => (
            <button
              key={t}
              onClick={() => setTf(t)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
                tf === t
                  ? "bg-brand-500 text-white"
                  : "text-white/55 hover:text-white",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4 h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={series}
              margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="grad-price" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={up ? "#19c37d" : "#e11d2a"} stopOpacity={0.55} />
                  <stop offset="100%" stopColor={up ? "#19c37d" : "#e11d2a"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="time"
                stroke="rgba(255,255,255,0.4)"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={28}
              />
              <YAxis
                stroke="rgba(255,255,255,0.4)"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
                tickFormatter={(v) => v.toFixed(inst.digits >= 4 ? 4 : 2)}
                width={62}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={up ? "#19c37d" : "#e11d2a"}
                strokeWidth={2}
                fill="url(#grad-price)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <MarketsTable />

      {/* Watchlist quick switch */}
      <Card>
        <CardHeader
          title="Quick switch"
          subtitle="Tap any instrument to set it as the featured chart above"
        />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {instruments.slice(0, 12).map((i) => {
            const isActive = i.symbol === symbol;
            const u = i.change >= 0;
            return (
              <button
                key={i.symbol}
                onClick={() => setSymbol(i.symbol)}
                className={cn(
                  "rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-left transition hover:border-white/15",
                  isActive && "border-brand-500/60 bg-brand-500/[0.08]",
                )}
              >
                <p className="text-xs font-semibold text-white">{i.symbol}</p>
                <p
                  className={cn(
                    "text-[11px] tabular-nums",
                    u ? "text-accent-green" : "text-brand-500",
                  )}
                >
                  {u ? "+" : ""}
                  {i.change.toFixed(2)}%
                </p>
              </button>
            );
          })}
        </div>
      </Card>
    </>
  );
}
