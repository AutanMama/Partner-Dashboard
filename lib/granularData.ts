// Granularity-aware data — Day / Month / Year switches between three
// completely different datasets so the FilterBar actually does something.

import type { Stat } from "./data";

export type Granularity = "Day" | "Month" | "Year";

const MULTIPLIER: Record<Granularity, number> = {
  Day: 1,
  Month: 30,
  Year: 365,
};

interface RawStat {
  id: string;
  title: string;
  baseValue: number;
  growthDay: number;
  growthMonth: number;
  growthYear: number;
  prefix?: string;
  suffix?: string;
  trendByG?: Partial<Record<Granularity, "up" | "down">>;
  icon: string;
  accent: Stat["accent"];
  sparkBase: number;
  sparkRange: number;
}

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

const rawStats: RawStat[] = [
  {
    id: "client-registrations",
    title: "Client Registrations",
    baseValue: 96,
    growthDay: 4.2,
    growthMonth: 12.8,
    growthYear: 38.4,
    icon: "Users",
    accent: "brand",
    sparkBase: 40,
    sparkRange: 80,
  },
  {
    id: "account-registrations",
    title: "Account Registrations",
    baseValue: 86,
    growthDay: 3.1,
    growthMonth: 9.3,
    growthYear: 29.2,
    icon: "UserPlus",
    accent: "emerald",
    sparkBase: 30,
    sparkRange: 68,
  },
  {
    id: "volume-lots",
    title: "Volume (Lots)",
    baseValue: 29.7,
    growthDay: 1.8,
    growthMonth: 6.4,
    growthYear: 18.9,
    icon: "Activity",
    accent: "violet",
    sparkBase: 12,
    sparkRange: 50,
  },
  {
    id: "volume-usd",
    title: "Volume (mln USD)",
    baseValue: 3_058_930,
    prefix: "",
    growthDay: 5.4,
    growthMonth: 14.2,
    growthYear: 42.8,
    icon: "BarChart3",
    accent: "brand",
    sparkBase: 60,
    sparkRange: 90,
  },
  {
    id: "deposits",
    title: "Deposits",
    baseValue: 2456,
    prefix: "$",
    growthDay: 2.4,
    growthMonth: 8.7,
    growthYear: 24.8,
    icon: "ArrowDownToLine",
    accent: "emerald",
    sparkBase: 22,
    sparkRange: 56,
  },
  {
    id: "net-deposits",
    title: "Net Deposits",
    baseValue: 727,
    prefix: "$",
    growthDay: -1.1,
    growthMonth: -3.2,
    growthYear: 8.2,
    trendByG: { Day: "down", Month: "down", Year: "up" },
    icon: "Wallet",
    accent: "amber",
    sparkBase: 38,
    sparkRange: 30,
  },
  {
    id: "withdrawals",
    title: "Withdrawals",
    baseValue: 1729,
    prefix: "$",
    growthDay: 1.2,
    growthMonth: 4.1,
    growthYear: 16.4,
    icon: "ArrowUpFromLine",
    accent: "violet",
    sparkBase: 18,
    sparkRange: 42,
  },
  {
    id: "commission",
    title: "Commission",
    baseValue: 534,
    prefix: "$",
    growthDay: 5.8,
    growthMonth: 17.5,
    growthYear: 52.4,
    icon: "BadgeDollarSign",
    accent: "emerald",
    sparkBase: 8,
    sparkRange: 44,
  },
];

const formatValue = (raw: number, r: RawStat) => {
  const isMoney = (r.prefix ?? "") === "$";
  if (r.id === "volume-lots") return raw.toFixed(0);
  if (r.id === "volume-usd")
    return new Intl.NumberFormat("en-US").format(Math.round(raw));
  if (isMoney) {
    return (
      "$" + new Intl.NumberFormat("en-US").format(Math.round(raw))
    );
  }
  return new Intl.NumberFormat("en-US").format(Math.round(raw));
};

export function getStats(g: Granularity): Stat[] {
  const mult = MULTIPLIER[g];
  return rawStats.map((r, i) => {
    const raw = r.baseValue * mult;
    const growth =
      g === "Day" ? r.growthDay : g === "Month" ? r.growthMonth : r.growthYear;
    const trend: "up" | "down" =
      r.trendByG?.[g] ?? (growth >= 0 ? "up" : "down");
    return {
      id: r.id,
      title: r.title,
      value: formatValue(raw, r),
      rawValue: raw,
      growth: Math.abs(growth),
      trend,
      icon: r.icon,
      accent: r.accent,
      spark: spark(i + 1 + (g === "Day" ? 0 : g === "Month" ? 14 : 28), r.sparkBase, r.sparkRange, 14),
    };
  });
}

// Performance series for the headline chart, by granularity
export function getPerformance(g: Granularity) {
  if (g === "Day") {
    return Array.from({ length: 24 }).map((_, i) => {
      const hour = `${String(i).padStart(2, "0")}:00`;
      const dep = 220 + Math.sin(i / 3) * 80 + i * 14;
      const wit = 120 + Math.sin(i / 4) * 50 + i * 10;
      const com = 28 + Math.sin(i / 5) * 12 + i * 3.4;
      return {
        label: hour,
        deposits: Math.max(0, Math.round(dep)),
        withdrawals: Math.max(0, Math.round(wit)),
        commission: Math.max(0, Math.round(com)),
      };
    });
  }
  if (g === "Month") {
    return Array.from({ length: 30 }).map((_, i) => ({
      label: `${i + 1}`,
      deposits: Math.round(1800 + Math.sin(i / 4) * 540 + i * 120),
      withdrawals: Math.round(1200 + Math.sin(i / 5) * 360 + i * 90),
      commission: Math.round(280 + Math.sin(i / 6) * 80 + i * 16),
    }));
  }
  // Year
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months.map((m, i) => ({
    label: m,
    deposits: Math.round(38000 + i * 3200 + Math.sin(i / 3) * 5000),
    withdrawals: Math.round(21000 + i * 2400 + Math.sin(i / 4) * 4200),
    commission: Math.round(6400 + i * 820 + Math.sin(i / 5) * 980),
  }));
}

// "Live" hero KPIs (with their own pulse cadence)
export const livePulse = [
  { label: "Active clients", value: 1284, dir: "+" as const, delta: "+12" },
  { label: "Open positions", value: 318, dir: "+" as const, delta: "+4" },
  { label: "Pending KYC", value: 27, dir: "-" as const, delta: "-3" },
  { label: "24h flow", value: "$73,685", dir: "+" as const, delta: "+8.7%" },
];
