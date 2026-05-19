"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { monthlyPerformance } from "@/lib/data";
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

export function MonthlyPerformanceChart() {
  return (
    <Card className="col-span-12 xl:col-span-8">
      <CardHeader
        title="Monthly Performance"
        subtitle="Deposits, withdrawals & commission across 2026"
        right={
          <div className="flex items-center gap-2">
            <Badge tone="red" dot>
              Deposits
            </Badge>
            <Badge tone="slate" dot>
              Withdrawals
            </Badge>
            <Badge tone="green" dot>
              Commission
            </Badge>
          </div>
        }
      />
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={monthlyPerformance}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="grad-deposits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e11d2a" stopOpacity={0.55} />
                <stop offset="100%" stopColor="#e11d2a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-withdrawals" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9ca3af" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#9ca3af" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad-commission" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#19c37d" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#19c37d" stopOpacity={0} />
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
            <Tooltip
              content={<ChartTooltip prefix="$" />}
              cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="deposits"
              stroke="#e11d2a"
              strokeWidth={2.4}
              fill="url(#grad-deposits)"
            />
            <Area
              type="monotone"
              dataKey="withdrawals"
              stroke="#9ca3af"
              strokeWidth={2.2}
              fill="url(#grad-withdrawals)"
            />
            <Area
              type="monotone"
              dataKey="commission"
              stroke="#19c37d"
              strokeWidth={2.4}
              fill="url(#grad-commission)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
