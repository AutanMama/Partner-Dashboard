"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkline } from "@/components/ui/Sparkline";
import {
  BadgeDollarSign,
  Clock,
  CheckCircle2,
  TrendingUp,
  Download,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  commissionBreakdown,
  commissionPayouts,
  monthlyPerformance,
} from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { ChartTooltip } from "@/components/dashboard/ChartTooltip";

export default function CommissionsPage() {
  const totalEarned = 16038;
  const pending = 858;
  const paid = totalEarned - pending;

  const cards = [
    {
      title: "Total Commission",
      value: formatCurrency(totalEarned),
      icon: BadgeDollarSign,
      color: "#34d399",
      delta: "+17.5%",
      spark: [8, 12, 14, 18, 22, 24, 28, 30, 34, 38, 42, 46],
    },
    {
      title: "Paid Out",
      value: formatCurrency(paid),
      icon: CheckCircle2,
      color: "#4d8bff",
      delta: "+12.4%",
      spark: [6, 10, 12, 16, 20, 22, 26, 28, 32, 36, 40, 44],
    },
    {
      title: "Pending",
      value: formatCurrency(pending),
      icon: Clock,
      color: "#fbbf24",
      delta: "Scheduled 21 May",
      spark: [10, 12, 8, 14, 10, 12, 16, 14, 18, 14, 16, 18],
    },
    {
      title: "Avg / Client",
      value: formatCurrency(5.56, { maximumFractionDigits: 2 }),
      icon: TrendingUp,
      color: "#a78bfa",
      delta: "+0.42",
      spark: [3, 3.5, 4, 4.2, 4.6, 4.8, 5, 5.1, 5.3, 5.4, 5.5, 5.56].map(
        (n) => n * 10,
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Commissions"
        description="Track lifetime earnings, payout schedules and per-tier commission breakdown across your network."
      >
        <Button variant="secondary" size="md">
          <Download className="h-3.5 w-3.5" />
          Statement
        </Button>
        <Button variant="primary" size="md">
          Request Payout
        </Button>
      </PageHeader>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <Card key={i}>
              <div className="flex items-start justify-between">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06]"
                  style={{ background: `${c.color}1f`, color: c.color }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <Badge tone="green" dot>
                  {c.delta}
                </Badge>
              </div>
              <p className="mt-4 text-xs font-medium text-white/55">
                {c.title}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                {c.value}
              </p>
              <div className="mt-3 -mx-1">
                <Sparkline data={c.spark} color={c.color} />
              </div>
            </Card>
          );
        })}
      </section>

      <section className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 xl:col-span-8">
          <CardHeader
            title="Commission Growth"
            subtitle="Cumulative commission earnings by month"
            right={<Badge tone="green" dot>2026</Badge>}
          />
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyPerformance}
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="grad-comm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
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
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                  width={48}
                />
                <Tooltip content={<ChartTooltip prefix="$" />} />
                <Area
                  type="monotone"
                  dataKey="commission"
                  stroke="#34d399"
                  strokeWidth={2.6}
                  fill="url(#grad-comm)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 xl:col-span-4">
          <CardHeader
            title="Commission Breakdown"
            subtitle="By tier and bonus type"
          />
          <ul className="flex flex-col gap-3.5">
            {commissionBreakdown.map((b, i) => {
              const max = commissionBreakdown[0].value;
              const pct = Math.round((b.value / max) * 100);
              return (
                <li key={i}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/70">{b.tier}</span>
                    <span className="font-semibold text-white">
                      {formatCurrency(b.value)}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </section>

      <Card hoverable={false} className="overflow-hidden">
        <CardHeader
          title="Recent Payouts"
          subtitle="Last 5 commission transfers"
          right={
            <Button variant="secondary" size="sm">
              View all
            </Button>
          }
        />
        <div className="-mx-5 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-white/40">
                <th className="px-5 py-3 font-medium">Payout ID</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Method</th>
                <th className="px-3 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {commissionPayouts.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-white/[0.04] transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3 font-mono text-[12px] text-white/65">
                    {p.id}
                  </td>
                  <td className="px-3 py-3 text-white/65">{p.date}</td>
                  <td className="px-3 py-3 text-white/85">{p.method}</td>
                  <td className="px-3 py-3 font-semibold text-white">
                    {formatCurrency(p.amount)}
                  </td>
                  <td className="px-5 py-3">
                    <Badge
                      tone={p.status === "Paid" ? "green" : "amber"}
                      dot
                    >
                      {p.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
