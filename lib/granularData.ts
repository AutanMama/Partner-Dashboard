// Dashboard granular data — uses the exact same monthly figures
// as the Reports page (single source of truth: MARCH / APRIL / MAY).
//
//   Year  view  →  lifetime totals (3 months combined)
//   Month view  →  current month (May), with +40 % MoM growth indicator
//                  (this is the partnership's average growth narrative)
//   Day   view  →  today's slice (1/31 of May), with small daily growth

import type { Stat } from "./data";
import { MARCH, APRIL, MAY, LIFETIME } from "./reportsData";

export type Granularity = "Day" | "Month" | "Year";

// Volume in lots — derived from notional USD (1 standard lot ≈ $103k)
// so lifetime 91.77M USD ≈ 891 lots (matches user's original spec)
const lotsFromUsd = (usd: number) => Math.round(usd / 103_005);

// External money flow (Deposits / Net / Withdrawals).
// These are separate from "Internal Transfers" — the original spec gave:
//   Deposits $73,685   Net Deposits $21,810   Withdrawals $51,875
// Distributed across months in the same proportion as Volume USD.
const DEPOSITS_TOTAL = 73_685;
const NET_DEP_TOTAL = 21_810;
const WITHDRAW_TOTAL = 51_875;

function externalForMonth(volumeShare: number) {
  return {
    deposits: Math.round(DEPOSITS_TOTAL * volumeShare),
    netDeposits: Math.round(NET_DEP_TOTAL * volumeShare),
    withdrawals: Math.round(WITHDRAW_TOTAL * volumeShare),
  };
}

const marShare = MARCH.volume / LIFETIME.volume; // 0.200
const aprShare = APRIL.volume / LIFETIME.volume; // 0.402
const mayShare = MAY.volume / LIFETIME.volume;   // 0.398

// Growth indicators
//   Day   → small daily wiggle
//   Month → +40 % (the partnership's headline MoM growth story)
//   Year  → cumulative growth from program inception (m1 → m3)
const GROWTH: Record<Granularity, number> = {
  Day: 4.8,
  Month: 40.0,
  Year: 96.0,
};

const NET_DEP_GROWTH: Record<Granularity, number> = {
  Day: -1.1,
  Month: -3.2,
  Year: 18.4,
};

const seed = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const spark = (n: number, base: number, range: number, len = 14) =>
  Array.from({ length: len }).map(
    (_, i) =>
      base +
      Math.sin((n + i) / 2.4) * range * 0.55 +
      (seed(n + i) - 0.4) * range * 0.4 +
      i * (range / len),
  );

const fmtInt = (n: number) => new Intl.NumberFormat("en-US").format(Math.round(n));

interface StatBlueprint {
  id: string;
  title: string;
  // values per granularity
  day: number;
  month: number;
  year: number;
  prefix?: string;
  icon: string;
  accent: Stat["accent"];
  sparkBase: number;
  sparkRange: number;
  growthMap?: Record<Granularity, number>;
}

const dayExt = externalForMonth(mayShare / 31); // ~1/31 of May share
const monthExt = externalForMonth(mayShare); // May share of lifetime
const yearExt = externalForMonth(1);

const blueprints: StatBlueprint[] = [
  {
    id: "client-registrations",
    title: "Client Registrations",
    day: Math.round(MAY.walletRegs / 31),
    month: MAY.walletRegs,
    year: LIFETIME.walletRegs,
    icon: "Users",
    accent: "brand",
    sparkBase: 40,
    sparkRange: 80,
  },
  {
    id: "account-registrations",
    title: "Account Registrations",
    day: Math.round(MAY.accountRegs / 31),
    month: MAY.accountRegs,
    year: LIFETIME.accountRegs,
    icon: "UserPlus",
    accent: "emerald",
    sparkBase: 30,
    sparkRange: 68,
  },
  {
    id: "volume-lots",
    title: "Volume (Lots)",
    day: Math.round(lotsFromUsd(MAY.volume) / 31),
    month: lotsFromUsd(MAY.volume),
    year: lotsFromUsd(LIFETIME.volume),
    icon: "Activity",
    accent: "violet",
    sparkBase: 12,
    sparkRange: 50,
  },
  {
    id: "volume-usd",
    title: "Volume (mln USD)",
    day: Math.round(MAY.volume / 31),
    month: MAY.volume,
    year: LIFETIME.volume,
    icon: "BarChart3",
    accent: "brand",
    sparkBase: 60,
    sparkRange: 90,
  },
  {
    id: "deposits",
    title: "Deposits",
    day: dayExt.deposits,
    month: monthExt.deposits,
    year: yearExt.deposits,
    prefix: "$",
    icon: "ArrowDownToLine",
    accent: "emerald",
    sparkBase: 22,
    sparkRange: 56,
  },
  {
    id: "net-deposits",
    title: "Net Deposits",
    day: dayExt.netDeposits,
    month: monthExt.netDeposits,
    year: yearExt.netDeposits,
    prefix: "$",
    icon: "Wallet",
    accent: "amber",
    sparkBase: 38,
    sparkRange: 30,
    growthMap: NET_DEP_GROWTH,
  },
  {
    id: "withdrawals",
    title: "Withdrawals",
    day: dayExt.withdrawals,
    month: monthExt.withdrawals,
    year: yearExt.withdrawals,
    prefix: "$",
    icon: "ArrowUpFromLine",
    accent: "violet",
    sparkBase: 18,
    sparkRange: 42,
  },
  {
    id: "commission",
    title: "Commission",
    day: Math.round(MAY.commission / 31),
    month: MAY.commission,
    year: LIFETIME.commission,
    prefix: "$",
    icon: "BadgeDollarSign",
    accent: "emerald",
    sparkBase: 8,
    sparkRange: 44,
  },
];

const formatValue = (raw: number, b: StatBlueprint) => {
  if (b.prefix === "$") return "$" + fmtInt(raw);
  return fmtInt(raw);
};

export function getStats(g: Granularity): Stat[] {
  return blueprints.map((b, i) => {
    const raw = g === "Day" ? b.day : g === "Month" ? b.month : b.year;
    const growthValue = (b.growthMap ?? GROWTH)[g];
    const trend: "up" | "down" = growthValue >= 0 ? "up" : "down";
    return {
      id: b.id,
      title: b.title,
      value: formatValue(raw, b),
      rawValue: raw,
      growth: Math.abs(growthValue),
      trend,
      icon: b.icon,
      accent: b.accent,
      spark: spark(
        i + 1 + (g === "Day" ? 0 : g === "Month" ? 14 : 28),
        b.sparkBase,
        b.sparkRange,
        14,
      ),
    };
  });
}

// Performance series for the headline chart.
//   Day   → 24 hourly buckets of today (May's daily run-rate, London/NY bell)
//   Month → 30 daily buckets of May (slight upward drift)
//   Year  → 3 monthly buckets: March / April / May
export function getPerformance(g: Granularity) {
  if (g === "Day") {
    const dayDep = monthExt.deposits / 31;
    const dayWit = monthExt.withdrawals / 31;
    const dayCom = MAY.commission / 31;
    return Array.from({ length: 24 }).map((_, i) => {
      const hour = `${String(i).padStart(2, "0")}:00`;
      // peak around London + NY overlap (12:00 – 16:00 UTC)
      const cycle = Math.exp(-Math.pow((i - 14) / 6, 2)) * 1.3 + 0.4;
      return {
        label: hour,
        deposits: Math.max(0, Math.round(dayDep * cycle)),
        withdrawals: Math.max(0, Math.round(dayWit * cycle * 0.78)),
        commission: Math.max(0, Math.round(dayCom * cycle * 0.85)),
      };
    });
  }

  if (g === "Month") {
    return Array.from({ length: 30 }).map((_, i) => {
      const day = i + 1;
      const drift = 0.7 + (i / 30) * 0.8;
      const noise = 0.85 + seed(i + 11) * 0.3;
      return {
        label: String(day),
        deposits: Math.round((monthExt.deposits / 31) * drift * noise),
        withdrawals: Math.round((monthExt.withdrawals / 31) * drift * noise * 0.78),
        commission: Math.round((MAY.commission / 31) * drift * noise),
      };
    });
  }

  // Year — the real 3-month curve (March / April / May)
  return [
    {
      label: "Mar",
      deposits: Math.round(DEPOSITS_TOTAL * marShare),
      withdrawals: Math.round(WITHDRAW_TOTAL * marShare),
      commission: MARCH.commission,
    },
    {
      label: "Apr",
      deposits: Math.round(DEPOSITS_TOTAL * aprShare),
      withdrawals: Math.round(WITHDRAW_TOTAL * aprShare),
      commission: APRIL.commission,
    },
    {
      label: "May",
      deposits: Math.round(DEPOSITS_TOTAL * mayShare),
      withdrawals: Math.round(WITHDRAW_TOTAL * mayShare),
      commission: MAY.commission,
    },
  ];
}
