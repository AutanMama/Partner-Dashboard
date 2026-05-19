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
    bg: "bg-brand-500/12",
    text: "text-brand-500",
    line: "#e11d2a",
  },
  emerald: {
    bg: "bg-accent-green/12",
    text: "text-accent-green",
    line: "#19c37d",
  },
  violet: {
    bg: "bg-white/[0.06]",
    text: "text-white/80",
    line: "#a78bfa",
  },
  amber: {
    bg: "bg-amber-500/12",
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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="panel overflow-hidden p-4 transition-colors hover:border-white/15"
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "grid h-9 w-9 place-items-center rounded-lg",
            accent.bg,
          )}
        >
          <Icon className={cn("h-4 w-4", accent.text)} />
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
            positive
              ? "bg-accent-green/12 text-accent-green"
              : "bg-brand-500/12 text-brand-400",
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

      <div className="mt-3 min-w-0">
        <p className="truncate text-[11px] font-medium uppercase tracking-wider text-white/45">
          {stat.title}
        </p>
        <p className="mt-1 truncate text-lg font-bold tracking-tight text-white sm:text-xl xl:text-2xl">
          {stat.value}
        </p>
      </div>

      <div className="mt-3 -mx-1">
        <Sparkline data={stat.spark} color={accent.line} height={40} />
      </div>
    </motion.div>
  );
}
