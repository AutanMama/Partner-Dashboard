"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { getPerformance, type Granularity } from "@/lib/granularData";

export function PerformanceChart({ granularity }: { granularity: Granularity }) {
  const data = getPerformance(granularity);
  const titleSuffix =
    granularity === "Day"
      ? "Today, hour by hour"
      : granularity === "Month"
        ? "This month, day by day"
        : "This year, month by month";

  return (
    <Card className="col-span-12 xl:col-span-8">
      <CardHeader
        title="Performance"
        subtitle={`Deposits · Withdrawals · Commission — ${titleSuffix}`}
        right={
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="red" dot>Deposits</Badge>
            <Badge tone="slate" dot>Withdrawals</Badge>
            <Badge tone="green" dot>Commission</Badge>
          </div>
        }
      />
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="grad-perf-dep" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e11d2a" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#e11d2a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-perf-wit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9ca3af" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#9ca3af" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-perf-com" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#19c37d" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#19c37d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="rgba(255,255,255,0.4)"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={20}
            />
            <YAxis
              stroke="rgba(255,255,255,0.4)"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`
              }
              width={48}
            />
            <Tooltip content={<ChartTooltip prefix="$" />} />
            <Area
              type="monotone"
              dataKey="deposits"
              stroke="#e11d2a"
              strokeWidth={2.4}
              fill="url(#grad-perf-dep)"
              isAnimationActive
            />
            <Area
              type="monotone"
              dataKey="withdrawals"
              stroke="#9ca3af"
              strokeWidth={2.2}
              fill="url(#grad-perf-wit)"
              isAnimationActive
            />
            <Area
              type="monotone"
              dataKey="commission"
              stroke="#19c37d"
              strokeWidth={2.4}
              fill="url(#grad-perf-com)"
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
