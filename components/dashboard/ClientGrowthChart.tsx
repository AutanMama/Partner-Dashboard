"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import {
  clientGrowthDaily,
  clientGrowthMonthly,
  clientGrowthYearly,
} from "@/lib/data";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";
import { cn } from "@/lib/utils";

type View = "Daily" | "Monthly" | "Yearly";

export function ClientGrowthChart() {
  const [view, setView] = useState<View>("Monthly");

  const data =
    view === "Daily"
      ? clientGrowthDaily
      : view === "Monthly"
        ? clientGrowthMonthly
        : clientGrowthYearly;

  const xKey = view === "Daily" ? "day" : view === "Monthly" ? "month" : "year";

  return (
    <Card className="col-span-12 xl:col-span-4">
      <CardHeader
        title="Client Growth"
        subtitle="New clients vs trading accounts"
        right={
          <div className="flex items-center gap-1 rounded-full border border-white/[0.08] p-1">
            {(["Daily", "Monthly", "Yearly"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-semibold transition",
                  view === v
                    ? "bg-brand-500 text-white"
                    : "text-white/55 hover:text-white",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        }
      />
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 12, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey={xKey}
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
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="clients"
              stroke="#e11d2a"
              strokeWidth={2.4}
              dot={false}
              activeDot={{ r: 4, fill: "#e11d2a" }}
            />
            <Line
              type="monotone"
              dataKey="accounts"
              stroke="#19c37d"
              strokeWidth={2.4}
              dot={false}
              activeDot={{ r: 4, fill: "#19c37d" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
