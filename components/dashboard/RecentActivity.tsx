"use client";

import { Card, CardHeader } from "@/components/ui/Card";
import { recentActivity } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  UserPlus,
  ArrowDownToLine,
  CandlestickChart,
  ArrowUpFromLine,
  BadgeDollarSign,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const typeIcon = {
  client: UserPlus,
  deposit: ArrowDownToLine,
  trade: CandlestickChart,
  withdrawal: ArrowUpFromLine,
  commission: BadgeDollarSign,
} as const;

const typeAccent = {
  client: "bg-brand-500/12 text-brand-500",
  deposit: "bg-accent-green/12 text-accent-green",
  trade: "bg-white/[0.06] text-white/80",
  withdrawal: "bg-amber-500/12 text-amber-300",
  commission: "bg-accent-green/12 text-accent-green",
} as const;

export function RecentActivity() {
  return (
    <Card className="col-span-12 xl:col-span-5">
      <CardHeader
        title="Recent Activity"
        subtitle="Live partner network events"
        right={
          <button className="inline-flex items-center gap-1 text-xs font-medium text-brand-400 hover:text-brand-400">
            View all <ArrowRight className="h-3 w-3" />
          </button>
        }
      />
      <ul className="flex flex-col gap-1">
        {recentActivity.map((a, i) => {
          const Icon = typeIcon[a.type];
          return (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition hover:bg-white/[0.025]"
            >
              <div
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                  typeAccent[a.type],
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-white">
                    {a.title}
                  </p>
                  {a.amount ? (
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        a.amount.startsWith("+")
                          ? "text-accent-green"
                          : "text-brand-400",
                      )}
                    >
                      {a.amount}
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <p className="truncate text-xs text-white/50">{a.detail}</p>
                  <span className="text-[10px] text-white/40 whitespace-nowrap">
                    {a.time}
                  </span>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </Card>
  );
}
