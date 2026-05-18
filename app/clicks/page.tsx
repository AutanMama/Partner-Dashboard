"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkline } from "@/components/ui/Sparkline";
import { Button } from "@/components/ui/Button";
import {
  MousePointerClick,
  Users,
  Percent,
  Globe2,
  Copy,
  Smartphone,
} from "lucide-react";
import {
  clicksDaily,
  trafficSources,
  trafficDevices,
  trafficCountries,
} from "@/lib/data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "@/components/dashboard/ChartTooltip";
import { formatNumber } from "@/lib/utils";

const PIE_COLORS = ["#4d8bff", "#34d399", "#a78bfa", "#fbbf24", "#fb7185"];
const DEVICE_COLORS = ["#4d8bff", "#34d399", "#a78bfa"];

export default function ClicksPage() {
  const summary = [
    {
      title: "Total Clicks",
      value: "48,712",
      icon: MousePointerClick,
      color: "#4d8bff",
      delta: "+18.4%",
      spark: [20, 26, 32, 28, 36, 42, 46, 52, 58, 64, 72, 80],
    },
    {
      title: "Unique Visitors",
      value: "32,184",
      icon: Users,
      color: "#34d399",
      delta: "+12.1%",
      spark: [12, 16, 20, 18, 24, 28, 32, 36, 40, 44, 50, 56],
    },
    {
      title: "Conversion Rate",
      value: "5.92%",
      icon: Percent,
      color: "#a78bfa",
      delta: "+0.8%",
      spark: [3, 3.4, 3.8, 4, 4.2, 4.6, 5, 5.2, 5.4, 5.6, 5.8, 5.9].map(
        (n) => n * 10,
      ),
    },
    {
      title: "Countries Reached",
      value: "47",
      icon: Globe2,
      color: "#fbbf24",
      delta: "+5",
      spark: [22, 24, 28, 30, 32, 34, 36, 38, 40, 42, 44, 47],
    },
  ];

  return (
    <>
      <PageHeader
        title="Clicks & Traffic"
        description="Referral link performance, geographic reach and conversion funnel for your partner campaigns."
      >
        <Button variant="secondary" size="md">
          <Copy className="h-3.5 w-3.5" />
          Copy Partner Link
        </Button>
        <Button variant="primary" size="md">
          New Campaign
        </Button>
      </PageHeader>

      <Card hoverable={false} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">
            Your unique referral link
          </p>
          <p className="mt-1 truncate font-mono text-sm text-white">
            https://broker.apexib.com/partner/ricodan-00oc?ref=tier1
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="emerald" dot>
            Active
          </Badge>
          <Button variant="secondary" size="sm">
            <Copy className="h-3.5 w-3.5" />
            Copy
          </Button>
        </div>
      </Card>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i}>
              <div className="flex items-start justify-between">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06]"
                  style={{ background: `${s.color}1f`, color: s.color }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <Badge tone="emerald" dot>
                  {s.delta}
                </Badge>
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

      <section className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 xl:col-span-8">
          <CardHeader
            title="Daily Click Analytics"
            subtitle="Last 14 days of referral activity"
          />
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clicksDaily} barCategoryGap="32%">
                <defs>
                  <linearGradient id="grad-click" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4d8bff" stopOpacity={1} />
                    <stop offset="100%" stopColor="#1138b8" stopOpacity={0.3} />
                  </linearGradient>
                  <linearGradient id="grad-unique" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                    <stop offset="100%" stopColor="#065f46" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="day"
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
                  width={36}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                />
                <Bar dataKey="clicks" fill="url(#grad-click)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="unique" fill="url(#grad-unique)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 sm:col-span-6 xl:col-span-4">
          <CardHeader
            title="Traffic Sources"
            subtitle="Where your clicks originate"
          />
          <div className="flex items-center gap-4">
            <div className="h-[200px] w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSources}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {trafficSources.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip suffix="%" />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {trafficSources.map((s, i) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    <span className="text-white/70">{s.name}</span>
                  </div>
                  <span className="font-semibold text-white">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 xl:col-span-4">
          <CardHeader
            title="Devices"
            subtitle="Visitor device split"
            right={<Smartphone className="h-4 w-4 text-white/50" />}
          />
          <div className="flex items-center gap-4">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficDevices}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={70}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {trafficDevices.map((_, i) => (
                      <Cell
                        key={i}
                        fill={DEVICE_COLORS[i % DEVICE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip suffix="%" />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {trafficDevices.map((s, i) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: DEVICE_COLORS[i] }}
                    />
                    <span className="text-white/70">{s.name}</span>
                  </div>
                  <span className="font-semibold text-white">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="col-span-12 overflow-hidden xl:col-span-8" hoverable={false}>
          <CardHeader
            title="Top Countries"
            subtitle="Geographic distribution of referral clicks"
          />
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-white/40">
                  <th className="px-5 py-3 font-medium">Country</th>
                  <th className="px-3 py-3 font-medium">Clicks</th>
                  <th className="px-3 py-3 font-medium">Conversion</th>
                  <th className="px-5 py-3 font-medium">Share</th>
                </tr>
              </thead>
              <tbody>
                {trafficCountries.map((c) => {
                  const max = trafficCountries[0].clicks;
                  const pct = Math.round((c.clicks / max) * 100);
                  return (
                    <tr
                      key={c.country}
                      className="border-t border-white/[0.04] transition hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3">
                        <span className="mr-2 text-base">{c.flag}</span>
                        <span className="font-medium text-white">
                          {c.country}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-white/75">
                        {formatNumber(c.clicks)}
                      </td>
                      <td className="px-3 py-3 text-emerald-300">{c.conv}%</td>
                      <td className="px-5 py-3">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </>
  );
}
