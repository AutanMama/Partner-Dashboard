"use client";

import { useState } from "react";
import { Calendar, Filter, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Granularity = "Day" | "Month" | "Year";

export function FilterBar() {
  const [granularity, setGranularity] = useState<Granularity>("Month");
  const [year, setYear] = useState("2026");
  const [date, setDate] = useState("2026-05-18");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass flex flex-col gap-4 rounded-2xl p-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
          <Filter className="h-3.5 w-3.5" />
          Filter by
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
          {(["Day", "Month", "Year"] as Granularity[]).map((g) => (
            <button
              key={g}
              onClick={() => setGranularity(g)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition",
                granularity === g
                  ? "bg-gradient-brand text-white shadow-glow"
                  : "text-white/55 hover:text-white",
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="group relative flex items-center">
          <Calendar className="pointer-events-none absolute left-3 h-4 w-4 text-white/45" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 w-44 rounded-xl border border-white/[0.06] bg-white/[0.03] pl-9 pr-3 text-sm text-white outline-none transition focus:border-brand-400/40"
          />
        </label>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="h-10 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 text-sm text-white outline-none transition focus:border-brand-400/40"
        >
          {[2023, 2024, 2025, 2026, 2027].map((y) => (
            <option key={y} value={y} className="bg-ink-900">
              {y}
            </option>
          ))}
        </select>

        <Button variant="secondary" size="md">
          <RefreshCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
        <Button variant="primary" size="md">
          Apply Filter
        </Button>
      </div>
    </motion.div>
  );
}
