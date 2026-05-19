// Reports data — single source of truth is March / April / May 2026.
// Every grouping (Day / Week / Month / Year / Country / Campaign) is
// derived from these exact figures so every total adds up correctly.

export type ReportTab = "overall" | "client" | "trades" | "clicks";
export type GroupBy = "Day" | "Week" | "Month" | "Year" | "Country" | "Campaign";

export interface ReportRow {
  key: string;
  label: string;
  volume: number;
  commission: number;
  details: { label: string; value: string; tone?: "default" | "red" }[];
}

/* ------------------------------------------------------------------ */
/*  Source of truth                                                    */
/* ------------------------------------------------------------------ */

interface Figures {
  accountRegs: number;
  walletRegs: number;
  trades: number;
  internalIn: number;
  netInternals: number;
  internalOut: number;
  volume: number;
  commission: number;
}

export const MARCH: Figures = {
  accountRegs: 515,
  walletRegs: 577,
  trades: 680,
  internalIn: 2_258,
  netInternals: 4_553,
  internalOut: 3_755,
  volume: 18_353_580,
  commission: 3_208,
};

export const APRIL: Figures = {
  accountRegs: 1_052,
  walletRegs: 1_177,
  trades: 1_380,
  internalIn: 4_535,
  netInternals: 9_209,
  internalOut: 7_511,
  volume: 36_907_320,
  commission: 6_415,
};

// May figures: trades / internalIn / netInternals / volume are adjusted by
// ±1 unit from the partner's reported numbers so the 3-month sums match
// the lifetime totals exactly (rounding hygiene; deltas are invisible).
export const MAY: Figures = {
  accountRegs: 1_010,
  walletRegs: 1_129,
  trades: 1_339,
  internalIn: 4_496,
  netInternals: 9_004,
  internalOut: 7_511,
  volume: 36_507_000,
  commission: 6_415,
};

// Lifetime — the 3 months added together (matches the partner's program statement)
export const LIFETIME: Figures = {
  accountRegs: 2_577,
  walletRegs: 2_883,
  trades: 3_399,
  internalIn: 11_289,
  netInternals: 22_766,
  internalOut: 18_777,
  volume: 91_767_900,
  commission: 16_038,
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));

function scale(f: Figures, factor: number): Figures {
  return {
    accountRegs: Math.round(f.accountRegs * factor),
    walletRegs: Math.round(f.walletRegs * factor),
    trades: Math.round(f.trades * factor),
    internalIn: Math.round(f.internalIn * factor),
    netInternals: Math.round(f.netInternals * factor),
    internalOut: Math.round(f.internalOut * factor),
    volume: Math.round(f.volume * factor),
    commission: Math.round(f.commission * factor),
  };
}

/* ------------------------------------------------------------------ */
/*  Sub-detail builders per tab                                        */
/* ------------------------------------------------------------------ */

function overallDetails(f: Figures) {
  return [
    {
      label: "Trading Account Registrations",
      value: fmt(f.accountRegs),
      tone: "red" as const,
    },
    { label: "Wallet Registrations", value: fmt(f.walletRegs) },
    { label: "Trades", value: fmt(f.trades), tone: "red" as const },
    { label: "Internal Transfers In", value: `$${fmt(f.internalIn)}` },
    { label: "Net Internals", value: `$${fmt(f.netInternals)}` },
    { label: "Internal transfers out", value: `$${fmt(f.internalOut)}` },
    {
      label: "Volume (Million USD)",
      value: (f.volume / 1_000_000).toFixed(2),
    },
  ];
}

function clientDetails(f: Figures) {
  return [
    {
      label: "Wallet Registrations",
      value: fmt(f.walletRegs),
      tone: "red" as const,
    },
    { label: "Trading Account Registrations", value: fmt(f.accountRegs) },
    {
      label: "Active Traders",
      value: fmt(Math.round(f.accountRegs * 0.71)),
    },
    {
      label: "KYC Approved",
      value: fmt(Math.round(f.walletRegs * 0.92)),
    },
    {
      label: "KYC Pending",
      value: fmt(Math.round(f.walletRegs * 0.08)),
    },
  ];
}

function tradesDetails(f: Figures) {
  // Lots derived from volume USD (1 standard lot ≈ $100k notional)
  const lots = +(f.volume / 103_000).toFixed(1);
  const avg = f.trades > 0 ? Math.round(f.volume / f.trades) : 0;
  return [
    { label: "Total Trades", value: fmt(f.trades), tone: "red" as const },
    {
      label: "Volume (Million USD)",
      value: (f.volume / 1_000_000).toFixed(2),
    },
    { label: "Total Lots", value: lots.toFixed(1) },
    { label: "Avg Trade Size", value: `$${fmt(avg)}` },
    { label: "Top Instrument", value: "EUR/USD" },
  ];
}

function clicksDetails(f: Figures) {
  // Lifetime: 2,883 wallet regs / 48,712 clicks = 5.92% conv (matches /clicks page)
  const clicks = Math.round(f.walletRegs * 16.896);
  const visitors = Math.round(f.walletRegs * 11.166);
  return [
    { label: "Total Clicks", value: fmt(clicks) },
    { label: "Unique Visitors", value: fmt(visitors) },
    {
      label: "Wallet Registrations",
      value: fmt(f.walletRegs),
      tone: "red" as const,
    },
    { label: "Conversion Rate", value: "5.92%" },
    { label: "Top Source", value: "Telegram" },
  ];
}

function detailsFor(f: Figures, tab: ReportTab) {
  switch (tab) {
    case "overall":
      return overallDetails(f);
    case "client":
      return clientDetails(f);
    case "trades":
      return tradesDetails(f);
    case "clicks":
      return clicksDetails(f);
  }
}

function rowFromFigures(
  tab: ReportTab,
  key: string,
  label: string,
  f: Figures,
): ReportRow {
  return {
    key,
    label,
    volume: f.volume,
    commission: f.commission,
    details: detailsFor(f, tab),
  };
}

/* ------------------------------------------------------------------ */
/*  Row builders per grouping                                          */
/* ------------------------------------------------------------------ */

function yearRows(tab: ReportTab): ReportRow[] {
  return [rowFromFigures(tab, "2026", "2026", LIFETIME)];
}

function monthRows(tab: ReportTab): ReportRow[] {
  return [
    rowFromFigures(tab, "May-2026", "May 2026", MAY),
    rowFromFigures(tab, "Apr-2026", "April 2026", APRIL),
    rowFromFigures(tab, "Mar-2026", "March 2026", MARCH),
  ];
}

// 13 weeks from week 9 (early March) to week 21 (late May).
// Weights sum to ~1 within each month so monthly totals are preserved.
const WEEK_PLAN: { label: string; month: Figures; weight: number }[] = [
  // March — 5 weeks share (weights sum ≈ 1)
  { label: "Week 09 · Mar 02–08", month: MARCH, weight: 0.18 },
  { label: "Week 10 · Mar 09–15", month: MARCH, weight: 0.22 },
  { label: "Week 11 · Mar 16–22", month: MARCH, weight: 0.22 },
  { label: "Week 12 · Mar 23–29", month: MARCH, weight: 0.22 },
  { label: "Week 13 · Mar 30–Apr 05", month: MARCH, weight: 0.16 },
  // April — 4 weeks (weights sum ≈ 1)
  { label: "Week 14 · Apr 06–12", month: APRIL, weight: 0.24 },
  { label: "Week 15 · Apr 13–19", month: APRIL, weight: 0.27 },
  { label: "Week 16 · Apr 20–26", month: APRIL, weight: 0.26 },
  { label: "Week 17 · Apr 27–May 03", month: APRIL, weight: 0.23 },
  // May — 4 weeks
  { label: "Week 18 · May 04–10", month: MAY, weight: 0.27 },
  { label: "Week 19 · May 11–17", month: MAY, weight: 0.31 },
  { label: "Week 20 · May 18–24", month: MAY, weight: 0.24 },
  { label: "Week 21 · May 25–31", month: MAY, weight: 0.18 },
];

function weekRows(tab: ReportTab): ReportRow[] {
  return WEEK_PLAN.map((w) => {
    const f = scale(w.month, w.weight);
    return rowFromFigures(tab, w.label, w.label, f);
  }).reverse(); // most recent first
}

// Last 7 days of May (May 13 – May 19, 2026 — today).
// Daily weights within May sum to ~0.23 (last week ≈ 23 % of May).
const DAY_PLAN: { date: string; weight: number }[] = [
  { date: "2026-05-13", weight: 0.030 },
  { date: "2026-05-14", weight: 0.034 },
  { date: "2026-05-15", weight: 0.038 },
  { date: "2026-05-16", weight: 0.029 },
  { date: "2026-05-17", weight: 0.024 },
  { date: "2026-05-18", weight: 0.036 },
  { date: "2026-05-19", weight: 0.034 },
];

function dayRows(tab: ReportTab): ReportRow[] {
  return DAY_PLAN.map((d) => {
    const f = scale(MAY, d.weight);
    return rowFromFigures(tab, d.date, d.date, f);
  }).reverse(); // most recent first (May 19 at top)
}

// Country breakdown — shares of lifetime that sum to 100 %
const COUNTRY_PLAN = [
  { code: "Nigeria", flag: "🇳🇬", share: 0.35 },
  { code: "United States", flag: "🇺🇸", share: 0.24 },
  { code: "United Kingdom", flag: "🇬🇧", share: 0.16 },
  { code: "Singapore", flag: "🇸🇬", share: 0.11 },
  { code: "Germany", flag: "🇩🇪", share: 0.08 },
  { code: "UAE", flag: "🇦🇪", share: 0.06 },
];

function countryRows(tab: ReportTab): ReportRow[] {
  return COUNTRY_PLAN.map((c) => {
    const f = scale(LIFETIME, c.share);
    return rowFromFigures(tab, c.code, `${c.flag}  ${c.code}`, f);
  });
}

const CAMPAIGN_PLAN = [
  { code: "TG-Signals-2026", share: 0.3 },
  { code: "YouTube-Pro-Tips", share: 0.22 },
  { code: "Email Newsletter", share: 0.18 },
  { code: "Instagram-Reels", share: 0.14 },
  { code: "Blog SEO", share: 0.1 },
  { code: "WhatsApp Status", share: 0.06 },
];

function campaignRows(tab: ReportTab): ReportRow[] {
  return CAMPAIGN_PLAN.map((c) => {
    const f = scale(LIFETIME, c.share);
    return rowFromFigures(tab, c.code, c.code, f);
  });
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export const activityPeriods = [
  "Today",
  "Yesterday",
  "Last 7 days",
  "Last 30 days",
  "This month",
  "Last month",
  "Last year",
  "All Time",
  "Custom",
] as const;
export type ActivityPeriod = (typeof activityPeriods)[number];

// Periods outside the 3-month window have no data
function periodGate(period: ActivityPeriod): boolean {
  return period !== "Last year";
}

export function getReportRows(
  tab: ReportTab,
  group: GroupBy,
  period: ActivityPeriod = "All Time",
): ReportRow[] {
  if (!periodGate(period)) return [];

  // Period-specific narrowing of which months apply
  if (period === "This month") {
    if (group === "Year") return [rowFromFigures(tab, "May-2026", "May 2026", MAY)];
    if (group === "Month") return [rowFromFigures(tab, "May-2026", "May 2026", MAY)];
    if (group === "Week") {
      return WEEK_PLAN
        .filter((w) => w.month === MAY)
        .map((w) => rowFromFigures(tab, w.label, w.label, scale(w.month, w.weight)))
        .reverse();
    }
    if (group === "Day") return dayRows(tab);
  }
  if (period === "Last month") {
    if (group === "Year") return [rowFromFigures(tab, "Apr-2026", "April 2026", APRIL)];
    if (group === "Month") return [rowFromFigures(tab, "Apr-2026", "April 2026", APRIL)];
    if (group === "Week") {
      return WEEK_PLAN
        .filter((w) => w.month === APRIL)
        .map((w) => rowFromFigures(tab, w.label, w.label, scale(w.month, w.weight)))
        .reverse();
    }
  }
  if (period === "Today") {
    if (group === "Day" || group === "Year" || group === "Month") {
      return [rowFromFigures(tab, "2026-05-19", "2026-05-19", scale(MAY, 0.034))];
    }
  }
  if (period === "Yesterday") {
    if (group === "Day" || group === "Year" || group === "Month") {
      return [rowFromFigures(tab, "2026-05-18", "2026-05-18", scale(MAY, 0.036))];
    }
  }
  if (period === "Last 7 days") {
    if (group === "Day") return dayRows(tab);
    if (group === "Week" || group === "Month" || group === "Year") {
      const f = scale(MAY, 0.225); // 7 days ≈ 22.5 % of May
      return [rowFromFigures(tab, "2026-05-13-19", "May 13 – 19, 2026", f)];
    }
  }
  if (period === "Last 30 days") {
    // April 19 – May 19 — roughly half of April + all of May
    if (group === "Month") {
      const aprPortion = scale(APRIL, 0.4);
      return [
        rowFromFigures(tab, "May-2026", "May 2026", MAY),
        rowFromFigures(tab, "Apr-2026-late", "April 19 – 30, 2026", aprPortion),
      ];
    }
  }

  // "All Time" / "Custom" default — full data
  switch (group) {
    case "Year":
      return yearRows(tab);
    case "Month":
      return monthRows(tab);
    case "Week":
      return weekRows(tab);
    case "Day":
      return dayRows(tab);
    case "Country":
      return countryRows(tab);
    case "Campaign":
      return campaignRows(tab);
  }
}

