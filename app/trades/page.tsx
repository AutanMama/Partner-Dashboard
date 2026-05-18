"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkline } from "@/components/ui/Sparkline";
import { TradesTable } from "@/components/tables/TradesTable";
import {
  Download,
  Activity,
  TrendingUp,
  TrendingDown,
  PieChart as PieIcon,
} from "lucide-react";
import { trades, volumeAnalytics } from "@/lib/data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "@/components/dashboard/ChartTooltip";

export default function TradesPage() {
  const totalLots = trades.reduce((a, t) => a + t.lot, 0);
  const totalPL = trades.reduce((a, t) => a + t.pl, 0);
  const winning = trades.filter((t) => t.pl >= 0).length;
  const losing = trades.length - winning;

  const summary = [
    {
      title: "Total Trades",
      value: formatNumber(trades.length),
      icon: Activity,
      color: "#4d8bff",
      spark: [4, 8, 12, 10, 16, 18, 22, 26, 24, 30, 36, 42],
    },
    {
      title: "Total Lots",
      value: totalLots.toFixed(2),
      icon: PieIcon,
      color: "#a78bfa",
      spark: [12, 18, 22, 30, 28, 36, 32, 42, 48, 56, 60, 72],
    },
    {
      title: "Winning Trades",
      value: formatNumber(winning),
      icon: TrendingUp,
      color: "#34d399",
      spark: [8, 12, 10, 14, 18, 22, 24, 28, 30, 34, 36, 40],
    },
    {
      title: "Losing Trades",
      value: formatNumber(losing),
      icon: TrendingDown,
      color: "#fb7185",
      spark: [12, 10, 14, 12, 16, 14, 18, 16, 14, 18, 16, 14],
    },
  ];

  return (
    <>
      <PageHeader
        title="Trades"
        description="Live trading activity from clients under your partner code. P/L attribution updated in real time."
      >
        <Badge tone="emerald" dot>
          Net P/L: {totalPL >= 0 ? "+" : "-"}
          {formatCurrency(Math.abs(totalPL), { maximumFractionDigits: 2 })}
        </Badge>
        <Button variant="primary" size="md">
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </PageHeader>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i}>
              <div
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06]"
                style={{ background: `${s.color}1f`, color: s.color }}
              >
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-4 text-xs font-medium text-white/55">
                {s.title}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                {s.value}
              </p>
              <div className="mt-3 -mx-1">
                <Sparkline data={s.spark} color={s.color} />
              </div>
            </Card>
          );
        })}
      </section>

      <Card>
        <CardHeader
          title="Notional Volume (USD)"
          subtitle="Total notional traded by referred accounts"
          right={<Badge tone="brand" dot>2026</Badge>}
        />
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={volumeAnalytics}
              margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="grad-trade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                  <stop offset="100%" stopColor="#047857" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.4)"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.4)"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1_000_000).toFixed(0)}M`}
                width={48}
              />
              <Tooltip
                content={<ChartTooltip prefix="$" />}
                cursor={{ fill: "rgba(255,255,255,0.03)" }}
              />
              <Bar dataKey="usd" fill="url(#grad-trade)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <TradesTable rows={18} />
    </>
  );
}
