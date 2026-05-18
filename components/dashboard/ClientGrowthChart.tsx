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
          <div className="flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] p-1">
            {(["Daily", "Monthly", "Yearly"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded-md px-2 py-1 text-[11px] font-medium transition",
                  view === v
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white",
                )}
              >
                {v}
              </button>
            ))}
          </div>
        }
      />
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
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
              stroke="#4d8bff"
              strokeWidth={2.4}
              dot={false}
              activeDot={{ r: 4, fill: "#4d8bff" }}
            />
            <Line
              type="monotone"
              dataKey="accounts"
              stroke="#34d399"
              strokeWidth={2.4}
              dot={false}
              activeDot={{ r: 4, fill: "#34d399" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
