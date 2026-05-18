"use client";

import { Sparkline } from "@/components/ui/Sparkline";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Activity,
  BarChart3,
  ArrowDownToLine,
  ArrowUpFromLine,
  Wallet,
  BadgeDollarSign,
  ArrowUpRight,
  ArrowDownRight,
  type LucideIcon,
} from "lucide-react";
import type { Stat } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Users,
  UserPlus,
  Activity,
  BarChart3,
  ArrowDownToLine,
  ArrowUpFromLine,
  Wallet,
  BadgeDollarSign,
};

const accentMap: Record<
  Stat["accent"],
  { bg: string; text: string; line: string }
> = {
  brand: {
    bg: "bg-brand-500/10",
    text: "text-brand-300",
    line: "#4d8bff",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    line: "#34d399",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-300",
    line: "#a78bfa",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-300",
    line: "#fbbf24",
  },
};

export function StatsCard({ stat, index = 0 }: { stat: Stat; index?: number }) {
  const Icon = iconMap[stat.icon] ?? Activity;
  const accent = accentMap[stat.accent];
  const positive = stat.trend === "up";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass glass-hover group relative overflow-hidden rounded-2xl p-5"
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl opacity-50 transition-opacity group-hover:opacity-80",
          stat.accent === "brand" && "bg-brand-500/30",
          stat.accent === "emerald" && "bg-emerald-500/25",
          stat.accent === "violet" && "bg-violet-500/25",
          stat.accent === "amber" && "bg-amber-500/25",
        )}
      />

      <div className="flex items-start justify-between">
        <div
          className={cn(
            "grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06]",
            accent.bg,
          )}
        >
          <Icon className={cn("h-4 w-4", accent.text)} />
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
            positive
              ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
              : "border-rose-400/25 bg-rose-500/10 text-rose-300",
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {positive ? "+" : ""}
          {stat.growth.toFixed(1)}%
        </div>
      </div>

      <div className="mt-4 min-w-0">
        <p className="truncate text-xs font-medium text-white/55 tracking-tight">
          {stat.title}
        </p>
        <p className="mt-1 truncate font-display text-lg font-bold tracking-tight text-white sm:text-xl xl:text-2xl">
          {stat.value}
        </p>
      </div>

      <div className="mt-4 -mx-1">
        <Sparkline data={stat.spark} color={accent.line} height={44} />
      </div>

      <p className="mt-2 text-[10px] text-white/40">
        vs. last period · 30-day trend
      </p>
    </motion.div>
  );
}
