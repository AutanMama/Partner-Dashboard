"use client";

import { Calendar, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { Granularity } from "@/lib/granularData";

type FilterBarProps = {
  granularity: Granularity;
  onGranularityChange: (g: Granularity) => void;
  year: string;
  onYearChange: (y: string) => void;
  date: string;
  onDateChange: (d: string) => void;
  onReset?: () => void;
  onApply?: () => void;
};

export function FilterBar({
  granularity,
  onGranularityChange,
  year,
  onYearChange,
  date,
  onDateChange,
  onReset,
  onApply,
}: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="panel flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
          Filter by
        </span>
        <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
          {(["Day", "Month", "Year"] as Granularity[]).map((g) => (
            <button
              key={g}
              onClick={() => onGranularityChange(g)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                granularity === g
                  ? "bg-brand-500 text-white"
                  : "text-white/65 hover:text-white",
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="group relative flex items-center">
          <Calendar className="pointer-events-none absolute left-3 h-4 w-4 text-white/45" />
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="field pl-9 w-44"
          />
        </label>

        <select
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="field w-28"
        >
          {[2023, 2024, 2025, 2026, 2027].map((y) => (
            <option key={y} value={y} className="bg-canvas">
              {y}
            </option>
          ))}
        </select>

        <Button variant="secondary" size="md" onClick={onReset}>
          <RefreshCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
        <Button variant="primary" size="md" onClick={onApply}>
          Apply Filter
        </Button>
      </div>
    </motion.div>
  );
}
