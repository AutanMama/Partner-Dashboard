"use client";

import { formatCompact } from "@/lib/utils";

export function ChartTooltip({
  active,
  payload,
  label,
  prefix = "",
  suffix = "",
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  prefix?: string;
  suffix?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-panel-elevated px-3 py-2.5 shadow-soft">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
        {label}
      </p>
      <div className="flex flex-col gap-1">
        {payload.map((p, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-6 text-xs"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: p.color }}
              />
              <span className="capitalize text-white/65">{p.name}</span>
            </div>
            <span className="font-medium text-white">
              {prefix}
              {formatCompact(p.value)}
              {suffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
