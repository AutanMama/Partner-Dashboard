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
  client: "bg-brand-500/12 text-brand-300",
  deposit: "bg-emerald-500/12 text-emerald-300",
  trade: "bg-violet-500/12 text-violet-300",
  withdrawal: "bg-amber-500/12 text-amber-300",
  commission: "bg-emerald-500/12 text-emerald-300",
} as const;

export function RecentActivity() {
  return (
    <Card className="col-span-12 xl:col-span-5">
      <CardHeader
        title="Recent Activity"
        subtitle="Live partner network events"
        right={
          <button className="inline-flex items-center gap-1 text-xs font-medium text-brand-300 hover:text-brand-200">
            View all <ArrowRight className="h-3 w-3" />
          </button>
        }
      />
      <ul className="flex flex-col gap-1.5">
        {recentActivity.map((a, i) => {
          const Icon = typeIcon[a.type];
          return (
            <motion.li
              key={a.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-white/[0.03]"
            >
              <div
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/[0.06]",
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
                          ? "text-emerald-300"
                          : "text-rose-300",
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
