// Granularity-aware data — Day / Month / Year
//
// Partnership has only been active for 3 months and is growing at
// ~40% month-over-month. That means:
//
//   - Year view  = lifetime to date (all 3 months combined). These are
//                  the headline numbers the partner can quote.
//   - Month view = the current (3rd) month alone, which is ~45% of
//                  the lifetime total and shows a +40% MoM growth.
//   - Day  view  = today, roughly the daily run-rate of this month.
//
// Math:  if m1 + m1*1.4 + m1*1.96 = lifetime  →  m3 = lifetime * 1.96/4.36
//        ≈ 0.4495 of lifetime.  So Month ≈ 45% of Year.

import type { Stat } from "./data";

export type Granularity = "Day" | "Month" | "Year";

// Single source of truth for the lifetime totals
export const LIFETIME = {
  clientRegs: 2883,
  accountRegs: 2577,
  volumeLots: 891,
  volumeUsd: 91_767_900,
  deposits: 73_685,
  netDeposits: 21_810,
  withdrawals: 51_875,
  commission: 16_038,
};

// Year = lifetime (3-month partnership), Month = m3, Day = m3 / 30
const MONTH_OF_LIFETIME = 0.4495;
const DAY_OF_MONTH = 1 / 30;

const FACTOR: Record<Granularity, number> = {
  Day: MONTH_OF_LIFETIME * DAY_OF_MONTH,
  Month: MONTH_OF_LIFETIME,
  Year: 1,
};

// Growth percentages per granularity
//   Day   = vs yesterday (a slight wiggle)
//   Month = +40% MoM uniformly (the partnership growth story)
//   Year  = vs program inception, big numbers since it's a 3-month-old book
const GROWTH: Record<Granularity, number> = {
  Day: 4.8,
  Month: 40.0,
  Year: 96.0, // m1 → m3 growth = 1.96x, i.e. +96%
};

// Net Deposits is special — the user's original spec showed -3.2% on Month
const NET_DEPOSITS_GROWTH: Record<Granularity, number> = {
  Day: -1.1,
  Month: -3.2,
  Year: 18.4,
};

const seed = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const spark = (n: number, base = 50, range = 28, len = 14) =>
  Array.from({ length: len }).map(
    (_, i) =>
      base +
      Math.sin((n + i) / 2.4) * range * 0.55 +
      (seed(n + i) - 0.4) * range * 0.4 +
      i * (range / len),
  );

interface RawStat {
  id: string;
  title: string;
  lifetime: number;
  prefix?: string;
  icon: string;
  accent: Stat["accent"];
  sparkBase: number;
  sparkRange: number;
  // Override growth (used for Net Deposits)
  growthMap?: Record<Granularity, number>;
}

const rawStats: RawStat[] = [
  {
    id: "client-registrations",
    title: "Client Registrations",
    lifetime: LIFETIME.clientRegs,
    icon: "Users",
    accent: "brand",
    sparkBase: 40,
    sparkRange: 80,
  },
  {
    id: "account-registrations",
    title: "Account Registrations",
    lifetime: LIFETIME.accountRegs,
    icon: "UserPlus",
    accent: "emerald",
    sparkBase: 30,
    sparkRange: 68,
  },
  {
    id: "volume-lots",
    title: "Volume (Lots)",
    lifetime: LIFETIME.volumeLots,
    icon: "Activity",
    accent: "violet",
    sparkBase: 12,
    sparkRange: 50,
  },
  {
    id: "volume-usd",
    title: "Volume (mln USD)",
    lifetime: LIFETIME.volumeUsd,
    icon: "BarChart3",
    accent: "brand",
    sparkBase: 60,
    sparkRange: 90,
  },
  {
    id: "deposits",
    title: "Deposits",
    lifetime: LIFETIME.deposits,
    prefix: "$",
    icon: "ArrowDownToLine",
    accent: "emerald",
    sparkBase: 22,
    sparkRange: 56,
  },
  {
    id: "net-deposits",
    title: "Net Deposits",
    lifetime: LIFETIME.netDeposits,
    prefix: "$",
    icon: "Wallet",
    accent: "amber",
    sparkBase: 38,
    sparkRange: 30,
    growthMap: NET_DEPOSITS_GROWTH,
  },
  {
    id: "withdrawals",
    title: "Withdrawals",
    lifetime: LIFETIME.withdrawals,
    prefix: "$",
    icon: "ArrowUpFromLine",
    accent: "violet",
    sparkBase: 18,
    sparkRange: 42,
  },
  {
    id: "commission",
    title: "Commission",
    lifetime: LIFETIME.commission,
    prefix: "$",
    icon: "BadgeDollarSign",
    accent: "emerald",
    sparkBase: 8,
    sparkRange: 44,
  },
];

const fmtInt = (n: number) =>
  new Intl.NumberFormat("en-US").format(Math.round(n));

const formatValue = (raw: number, r: RawStat) => {
  if (r.id === "volume-lots") return fmtInt(raw);
  if (r.id === "volume-usd") return fmtInt(raw);
  if (r.prefix === "$") return "$" + fmtInt(raw);
  return fmtInt(raw);
};

export function getStats(g: Granularity): Stat[] {
  const factor = FACTOR[g];
  return rawStats.map((r, i) => {
    const raw = r.lifetime * factor;
    const growthValue = (r.growthMap ?? GROWTH)[g];
    const trend: "up" | "down" = growthValue >= 0 ? "up" : "down";
    return {
      id: r.id,
      title: r.title,
      value: formatValue(raw, r),
      rawValue: raw,
      growth: Math.abs(growthValue),
      trend,
      icon: r.icon,
      accent: r.accent,
      spark: spark(
        i + 1 + (g === "Day" ? 0 : g === "Month" ? 14 : 28),
        r.sparkBase,
        r.sparkRange,
        14,
      ),
    };
  });
}

// Performance series for the headline chart.
//   Day   = 24 hourly buckets (today)
//   Month = 30 daily buckets (current month, climbing pattern that
//           ends at the +40% MoM commission peak)
//   Year  = 3 monthly buckets (the 3 months of the partnership,
//           1.0x → 1.4x → 1.96x growth)
export function getPerformance(g: Granularity) {
  if (g === "Day") {
    // 24 hours of activity. Spread the m3 daily run-rate across the day.
    const dailyDeposits = LIFETIME.deposits * MONTH_OF_LIFETIME * DAY_OF_MONTH;
    const dailyWithdrawals =
      LIFETIME.withdrawals * MONTH_OF_LIFETIME * DAY_OF_MONTH;
    const dailyCommission =
      LIFETIME.commission * MONTH_OF_LIFETIME * DAY_OF_MONTH;
    return Array.from({ length: 24 }).map((_, i) => {
      const hour = `${String(i).padStart(2, "0")}:00`;
      // Trading volume peaks during London + NY overlap
      const cycle = Math.exp(-Math.pow((i - 14) / 6, 2)) * 1.3 + 0.4;
      return {
        label: hour,
        deposits: Math.max(0, Math.round((dailyDeposits / 24) * 24 * cycle)),
        withdrawals: Math.max(
          0,
          Math.round((dailyWithdrawals / 24) * 24 * cycle * 0.8),
        ),
        commission: Math.max(
          0,
          Math.round((dailyCommission / 24) * 24 * cycle * 0.5),
        ),
      };
    });
  }

  if (g === "Month") {
    // 30 daily buckets within the current month, growing slightly toward end
    return Array.from({ length: 30 }).map((_, i) => {
      const day = i + 1;
      // Slight upward drift through the month
      const drift = 0.7 + (i / 30) * 0.8;
      const noise = 0.85 + seed(i + 11) * 0.3;
      return {
        label: String(day),
        deposits: Math.round(
          (LIFETIME.deposits * MONTH_OF_LIFETIME * DAY_OF_MONTH) *
            drift *
            noise,
        ),
        withdrawals: Math.round(
          (LIFETIME.withdrawals * MONTH_OF_LIFETIME * DAY_OF_MONTH) *
            drift *
            noise *
            0.78,
        ),
        commission: Math.round(
          (LIFETIME.commission * MONTH_OF_LIFETIME * DAY_OF_MONTH) *
            drift *
            noise,
        ),
      };
    });
  }

  // Year — 3 months of partnership with 1.0x / 1.4x / 1.96x growth
  const months = ["Mar", "Apr", "May"]; // partnership started in March
  const weights = [1, 1.4, 1.96];
  const totalW = weights.reduce((a, b) => a + b, 0); // 4.36
  return months.map((m, i) => {
    const w = weights[i] / totalW;
    return {
      label: m,
      deposits: Math.round(LIFETIME.deposits * w),
      withdrawals: Math.round(LIFETIME.withdrawals * w),
      commission: Math.round(LIFETIME.commission * w),
    };
  });
}
