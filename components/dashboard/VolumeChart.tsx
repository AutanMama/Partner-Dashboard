"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { volumeAnalytics } from "@/lib/data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";

export function VolumeChart() {
  return (
    <Card className="col-span-12 xl:col-span-7">
      <CardHeader
        title="Volume Analytics"
        subtitle="Trading volume performance by lots"
        right={
          <Badge tone="emerald" dot>
            +14.2% YoY
          </Badge>
        }
      />
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={volumeAnalytics}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
            barCategoryGap="28%"
          >
            <defs>
              <linearGradient id="grad-bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4d8bff" stopOpacity={1} />
                <stop offset="100%" stopColor="#1138b8" stopOpacity={0.4} />
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
              width={36}
            />
            <Tooltip
              content={<ChartTooltip suffix=" lots" />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar
              dataKey="lots"
              fill="url(#grad-bar)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
