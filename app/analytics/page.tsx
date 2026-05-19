"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { MonthlyPerformanceChart } from "@/components/dashboard/MonthlyPerformanceChart";
import { ClientGrowthChart } from "@/components/dashboard/ClientGrowthChart";
import { VolumeChart } from "@/components/dashboard/VolumeChart";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

const radarData = [
  { subject: "Conversion", A: 92, fullMark: 100 },
  { subject: "Retention", A: 78, fullMark: 100 },
  { subject: "Volume", A: 88, fullMark: 100 },
  { subject: "Deposits", A: 84, fullMark: 100 },
  { subject: "Engagement", A: 72, fullMark: 100 },
  { subject: "Network", A: 90, fullMark: 100 },
];

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Cross-channel performance, partner KPIs and quality-of-network indicators."
      />
      <FilterBar />

      <section className="grid grid-cols-12 gap-4">
        <MonthlyPerformanceChart />
        <ClientGrowthChart />
      </section>

      <section className="grid grid-cols-12 gap-4">
        <VolumeChart />
        <TrafficChart />
      </section>

      <section className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 xl:col-span-5">
          <CardHeader
            title="Partner Quality Score"
            subtitle="Composite performance across 6 KPIs"
            right={<Badge tone="green" dot>A+ rated</Badge>}
          />
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius={110}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke="#4d8bff"
                  fill="#4d8bff"
                  fillOpacity={0.35}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-12 overflow-hidden xl:col-span-7">
          <CardHeader
            title="Cohort Retention"
            subtitle="Client retention by registration month"
          />
          <div className="overflow-x-auto -mx-5">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-white/40">
                  <th className="px-5 py-3 font-medium">Cohort</th>
                  {["M0", "M1", "M2", "M3", "M4", "M5"].map((m) => (
                    <th key={m} className="px-3 py-3 font-medium">
                      {m}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { c: "Jan 2026", vals: [100, 78, 64, 52, 46, 42] },
                  { c: "Feb 2026", vals: [100, 82, 70, 58, 50, 0] },
                  { c: "Mar 2026", vals: [100, 84, 68, 60, 0, 0] },
                  { c: "Apr 2026", vals: [100, 86, 72, 0, 0, 0] },
                  { c: "May 2026", vals: [100, 88, 0, 0, 0, 0] },
                ].map((row) => (
                  <tr
                    key={row.c}
                    className="border-t border-white/[0.04]"
                  >
                    <td className="px-5 py-3 text-white/85">{row.c}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} className="px-3 py-3">
                        {v > 0 ? (
                          <div
                            className="grid h-8 min-w-[44px] place-items-center rounded-md text-[11px] font-semibold text-white"
                            style={{
                              background: `rgba(38,103,255,${0.12 + (v / 100) * 0.55})`,
                              border: `1px solid rgba(38,103,255,${0.18 + (v / 100) * 0.4})`,
                            }}
                          >
                            {v}%
                          </div>
                        ) : (
                          <div className="grid h-8 min-w-[44px] place-items-center rounded-md border border-white/[0.04] bg-white/[0.02] text-[11px] text-white/30">
                            —
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </>
  );
}
