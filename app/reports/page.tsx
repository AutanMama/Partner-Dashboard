"use client";

import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Columns3,
  RefreshCcw,
  Search,
  SlidersHorizontal,
  Server,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  activityPeriods,
  getReportRows,
  type ActivityPeriod,
  type GroupBy,
  type ReportTab,
} from "@/lib/reportsData";

/* ------------------------------------------------------------------ */
/*  Static configuration                                              */
/* ------------------------------------------------------------------ */

const tabs: { id: ReportTab; label: string }[] = [
  { id: "overall", label: "Overall Performance" },
  { id: "client", label: "Client" },
  { id: "trades", label: "Trades" },
  { id: "clicks", label: "Clicks" },
];

const groupOptions: GroupBy[] = [
  "Day",
  "Week",
  "Month",
  "Year",
  "Country",
  "Campaign",
];

type SortKey = "label" | "volume" | "commission";
type SortDir = "asc" | "desc";

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>("overall");
  const [group, setGroup] = useState<GroupBy>("Year");
  const [period, setPeriod] = useState<ActivityPeriod>("All Time");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("label");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expanded, setExpanded] = useState<string | null>("2026");

  const [activityOpen, setActivityOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showTotals, setShowTotals] = useState(true);

  const baseRows = useMemo(
    () => getReportRows(tab, group, period),
    [tab, group, period],
  );
  const showEmpty = baseRows.length === 0;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let r = baseRows;
    if (q) r = r.filter((row) => row.label.toLowerCase().includes(q));
    r = [...r].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "label") return a.label.localeCompare(b.label) * dir;
      if (sortKey === "volume") return (a.volume - b.volume) * dir;
      return (a.commission - b.commission) * dir;
    });
    return r;
  }, [baseRows, query, sortKey, sortDir]);

  const totalVolume = rows.reduce((s, r) => s + r.volume, 0);
  const totalCommission = rows.reduce((s, r) => s + r.commission, 0);

  function toggleSort(k: SortKey) {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir("desc");
    }
  }

  function toggleExpand(key: string) {
    setExpanded((prev) => (prev === key ? null : key));
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Reports
        </h1>
      </div>

      {/* TABS */}
      <div className="-mx-4 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:px-0">
        <div className="flex min-w-max items-center gap-6 border-b border-white/[0.06]">
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id);
                  setExpanded(null);
                }}
                className={cn(
                  "relative pb-3 pt-1 text-sm font-semibold tracking-tight transition-colors",
                  active ? "tab-active" : "text-white/45 hover:text-white/80",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* GROUP BY */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-white">Group by:</p>
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {groupOptions.map((g) => (
              <button
                key={g}
                onClick={() => {
                  setGroup(g);
                  setExpanded(null);
                }}
                className={cn("pill shrink-0", group === g && "pill-active")}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ACTIVITY PERIOD */}
      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-medium text-white/55">Activity Period:</p>
        <button
          onClick={() => setActivityOpen(true)}
          className="field flex items-center justify-between text-left"
        >
          <span>{period}</span>
          <ChevronDown className="h-4 w-4 text-white/45" />
        </button>
      </div>

      {/* PERIOD TOTALS */}
      <button
        onClick={() => setShowTotals((v) => !v)}
        className="field flex items-center justify-between"
      >
        <span className="font-medium">Period Totals</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-white/55 transition-transform",
            showTotals && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {showTotals && !showEmpty ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="panel grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
              <Total label="Records" value={String(rows.length)} />
              <Total
                label="Total Volume"
                value={(totalVolume / 1_000_000).toFixed(2) + " M"}
              />
              <Total
                label="Total Commission"
                value={"$" + totalCommission.toFixed(2)}
              />
              <Total label="Group by" value={group} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* SEARCH + ACTIONS */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="field pl-9"
          />
        </div>
        <button
          className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-panel text-white/75 hover:text-white"
          aria-label="Columns"
        >
          <Columns3 className="h-4 w-4" />
        </button>
        <button
          onClick={() => setFiltersOpen(true)}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-panel px-3.5 text-sm font-medium text-white"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* TABLE */}
      <div className="panel overflow-hidden p-0">
        {/* Header row */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-3 border-b-2 border-brand-500 px-4 py-3 sm:px-5">
          <SortHeader
            label={groupColumnLabel(group)}
            active={sortKey === "label"}
            dir={sortDir}
            onClick={() => toggleSort("label")}
          />
          <SortHeader
            label="Volume"
            active={sortKey === "volume"}
            dir={sortDir}
            align="right"
            onClick={() => toggleSort("volume")}
          />
          <SortHeader
            label="Commission"
            active={sortKey === "commission"}
            dir={sortDir}
            align="right"
            onClick={() => toggleSort("commission")}
          />
        </div>

        {/* Rows */}
        {rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 px-4 py-16">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/[0.04] text-white/40">
              <Server className="h-5 w-5" />
            </div>
            <p className="text-sm text-white/55">No data available.</p>
          </div>
        ) : (
          <ul>
            {rows.map((r, idx) => {
              const isOpen = expanded === r.key;
              return (
                <li key={r.key} className="border-b border-white/[0.04] last:border-b-0">
                  <button
                    onClick={() => toggleExpand(r.key)}
                    className="grid w-full grid-cols-[1.4fr_1fr_1fr_24px] items-center gap-3 px-4 py-3.5 text-sm text-left transition-colors hover:bg-white/[0.02] sm:px-5"
                  >
                    <span className="truncate font-medium text-white">
                      {r.label}
                    </span>
                    <span className="text-right text-white/85">
                      {formatVol(r.volume)}
                    </span>
                    <span className="text-right text-white/85">
                      ${r.commission.toFixed(4)}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 justify-self-end text-white/45 transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white/[0.02] px-4 py-3 sm:px-5">
                          <ul className="flex flex-col divide-y divide-white/[0.04]">
                            {r.details.map((d, di) => (
                              <li
                                key={di}
                                className="flex items-center justify-between py-2.5 text-sm"
                              >
                                <span className="text-white/70">{d.label}</span>
                                <span
                                  className={cn(
                                    "font-semibold tabular-nums",
                                    d.tone === "red"
                                      ? "text-brand-500"
                                      : "text-white",
                                  )}
                                >
                                  {d.value}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  {/* Subtle red underline like the screenshot, only on first row */}
                  {idx === 0 ? (
                    <div className="h-px w-full bg-brand-500/60" />
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}

        {/* Totals footer */}
        {rows.length > 0 ? (
          <div className="border-t border-white/[0.05] bg-white/[0.015] px-4 py-3 sm:px-5">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_24px] items-center gap-3 text-sm">
              <span className="text-white/65">{rows.length} records</span>
              <span className="text-right font-semibold text-white">
                {formatVol(totalVolume)}
              </span>
              <span className="text-right font-semibold text-white">
                ${totalCommission.toFixed(4)}
              </span>
              <span />
            </div>
          </div>
        ) : null}
      </div>

      {/* Pagination (decorative) */}
      {rows.length > 0 ? (
        <div className="flex items-center justify-end gap-1">
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] text-white/60 hover:text-white">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="h-9 min-w-9 rounded-lg border border-brand-500 bg-brand-500/15 px-3 text-xs font-semibold text-white">
            1
          </button>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.08] text-white/60 hover:text-white">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {/* ---------- Modals ---------- */}
      <ActivityPeriodSheet
        open={activityOpen}
        onClose={() => setActivityOpen(false)}
        value={period}
        onChange={(v) => {
          setPeriod(v);
          setActivityOpen(false);
        }}
      />
      <FiltersSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        period={period}
        onPeriod={() => {
          setFiltersOpen(false);
          setTimeout(() => setActivityOpen(true), 120);
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function Total({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-white/45">
        {label}
      </p>
      <p className="mt-1 text-sm font-bold tabular-nums text-white">{value}</p>
    </div>
  );
}

function SortHeader({
  label,
  active,
  dir,
  onClick,
  align = "left",
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
  align?: "left" | "right";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 text-[12px] font-semibold text-white",
        align === "right" && "justify-end",
      )}
    >
      <span>{label}</span>
      <span className="flex flex-col">
        <ArrowUp
          className={cn(
            "h-[10px] w-[10px] -mb-[3px]",
            active && dir === "asc" ? "text-brand-500" : "text-white/35",
          )}
        />
        <ArrowDown
          className={cn(
            "h-[10px] w-[10px]",
            active && dir === "desc" ? "text-brand-500" : "text-white/35",
          )}
        />
      </span>
    </button>
  );
}

function ActivityPeriodSheet({
  open,
  onClose,
  value,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  value: ActivityPeriod;
  onChange: (v: ActivityPeriod) => void;
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[70] max-h-[80vh] overflow-hidden rounded-t-2xl border-t border-white/10 bg-canvas pb-safe sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[420px] sm:rounded-l-2xl sm:rounded-t-none"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:bg-white/[0.05] hover:text-white"
                  aria-label="Close"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <p className="text-lg font-bold text-white">Activity Period</p>
              </div>
              <button
                onClick={() => onChange("All Time")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/85 hover:border-brand-500/40 hover:text-white"
              >
                Reset
                <RefreshCcw className="h-3 w-3" />
              </button>
            </div>

            <ul className="overflow-y-auto">
              {activityPeriods.map((p) => {
                const active = value === p;
                return (
                  <li key={p}>
                    <button
                      onClick={() => onChange(p)}
                      className="flex w-full items-center justify-between border-b border-white/[0.04] px-5 py-4 text-left text-sm text-white/90 hover:bg-white/[0.025]"
                    >
                      <span>{p}</span>
                      {active ? (
                        <Check className="h-4 w-4 text-accent-green" />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function FiltersSheet({
  open,
  onClose,
  period,
  onPeriod,
}: {
  open: boolean;
  onClose: () => void;
  period: ActivityPeriod;
  onPeriod: () => void;
}) {
  const rows = [
    { label: "Activity Period", value: period, onClick: onPeriod },
    { label: "Campaign", value: "All" },
    { label: "Country", value: "All" },
    { label: "Tier", value: "Tier 1" },
    { label: "Subaffiliate", value: "" },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[55] bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[58] max-h-[85vh] overflow-hidden rounded-t-2xl border-t border-white/10 bg-canvas pb-safe sm:inset-y-0 sm:left-auto sm:right-0 sm:w-[420px] sm:rounded-l-2xl sm:rounded-t-none"
          >
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={onClose}
                  className="grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:bg-white/[0.05] hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <p className="text-lg font-bold text-white">Filters</p>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/85 hover:border-brand-500/40 hover:text-white">
                Reset
                <RefreshCcw className="h-3 w-3" />
              </button>
            </div>

            <ul className="overflow-y-auto px-4 py-3">
              {rows.map((r) => (
                <li key={r.label}>
                  <button
                    onClick={r.onClick}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-4 text-left transition hover:bg-white/[0.025]"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {r.label}
                      </p>
                      {r.value ? (
                        <p className="mt-0.5 text-xs text-white/55">
                          {r.value}
                        </p>
                      ) : null}
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/45" />
                  </button>
                  <div className="h-px w-full bg-white/[0.04]" />
                </li>
              ))}
            </ul>

            <div className="border-t border-white/[0.06] p-4">
              <button
                onClick={onClose}
                className="h-12 w-full rounded-lg bg-brand-500 text-sm font-bold text-white hover:bg-brand-400"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function groupColumnLabel(g: GroupBy) {
  switch (g) {
    case "Day":
      return "Date";
    case "Week":
      return "Week";
    case "Month":
      return "Month";
    case "Year":
      return "Year";
    case "Country":
      return "Country";
    case "Campaign":
      return "Campaign";
  }
}

function formatVol(v: number) {
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(4);
  return v.toFixed(4);
}
