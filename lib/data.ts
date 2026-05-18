// Mock data for the Partner Dashboard

export type StatTrend = "up" | "down";

export interface Stat {
  id: string;
  title: string;
  value: string;
  rawValue: number;
  growth: number; // percent
  trend: StatTrend;
  icon: string;
  accent: "brand" | "emerald" | "violet" | "amber";
  spark: number[];
}

export const dashboardStats: Stat[] = [
  {
    id: "client-registrations",
    title: "Client Registrations",
    value: "2,883",
    rawValue: 2883,
    growth: 12.8,
    trend: "up",
    icon: "Users",
    accent: "brand",
    spark: [40, 52, 48, 60, 70, 66, 78, 82, 90, 96, 110, 124],
  },
  {
    id: "account-registrations",
    title: "Account Registrations",
    value: "2,577",
    rawValue: 2577,
    growth: 9.3,
    trend: "up",
    icon: "UserPlus",
    accent: "emerald",
    spark: [30, 36, 44, 48, 52, 56, 60, 70, 74, 82, 88, 96],
  },
  {
    id: "volume-lots",
    title: "Volume (Lots)",
    value: "891",
    rawValue: 891,
    growth: 6.4,
    trend: "up",
    icon: "Activity",
    accent: "violet",
    spark: [12, 18, 22, 30, 28, 36, 32, 42, 48, 56, 60, 72],
  },
  {
    id: "volume-usd",
    title: "Volume (mln USD)",
    value: "91,767,900",
    rawValue: 91767900,
    growth: 14.2,
    trend: "up",
    icon: "BarChart3",
    accent: "brand",
    spark: [80, 88, 96, 102, 96, 110, 118, 124, 132, 140, 156, 168],
  },
  {
    id: "deposits",
    title: "Deposits",
    value: "$73,685",
    rawValue: 73685,
    growth: 8.7,
    trend: "up",
    icon: "ArrowDownToLine",
    accent: "emerald",
    spark: [22, 26, 30, 28, 34, 40, 46, 50, 58, 62, 68, 74],
  },
  {
    id: "net-deposits",
    title: "Net Deposits",
    value: "$21,810",
    rawValue: 21810,
    growth: -3.2,
    trend: "down",
    icon: "Wallet",
    accent: "amber",
    spark: [42, 38, 40, 36, 34, 38, 30, 28, 32, 30, 26, 24],
  },
  {
    id: "withdrawals",
    title: "Withdrawals",
    value: "$51,875",
    rawValue: 51875,
    growth: 4.1,
    trend: "up",
    icon: "ArrowUpFromLine",
    accent: "violet",
    spark: [18, 22, 28, 30, 34, 38, 36, 42, 46, 50, 52, 56],
  },
  {
    id: "commission",
    title: "Commission",
    value: "$16,038",
    rawValue: 16038,
    growth: 17.5,
    trend: "up",
    icon: "BadgeDollarSign",
    accent: "emerald",
    spark: [8, 12, 14, 18, 22, 24, 28, 30, 34, 38, 42, 46],
  },
];

export const monthlyPerformance = [
  { month: "Jan", deposits: 38420, withdrawals: 21400, commission: 6420 },
  { month: "Feb", deposits: 42180, withdrawals: 25210, commission: 7180 },
  { month: "Mar", deposits: 51360, withdrawals: 30420, commission: 8420 },
  { month: "Apr", deposits: 48270, withdrawals: 27890, commission: 9215 },
  { month: "May", deposits: 56420, withdrawals: 34125, commission: 10210 },
  { month: "Jun", deposits: 60125, withdrawals: 36210, commission: 11420 },
  { month: "Jul", deposits: 65120, withdrawals: 40210, commission: 12235 },
  { month: "Aug", deposits: 68240, withdrawals: 42210, commission: 13420 },
  { month: "Sep", deposits: 70410, withdrawals: 45120, commission: 13985 },
  { month: "Oct", deposits: 72120, withdrawals: 48210, commission: 14820 },
  { month: "Nov", deposits: 73685, withdrawals: 51875, commission: 15820 },
  { month: "Dec", deposits: 74980, withdrawals: 52890, commission: 16038 },
];

export const clientGrowthDaily = Array.from({ length: 30 }).map((_, i) => ({
  day: `D${i + 1}`,
  clients: 40 + Math.round(Math.sin(i / 3) * 14 + i * 2.4),
  accounts: 30 + Math.round(Math.cos(i / 4) * 10 + i * 1.9),
}));

export const clientGrowthMonthly = monthlyPerformance.map((m, i) => ({
  month: m.month,
  clients: 120 + i * 38 + (i % 2 === 0 ? 25 : 10),
  accounts: 100 + i * 32 + (i % 2 === 0 ? 18 : 6),
}));

export const clientGrowthYearly = [
  { year: "2022", clients: 920, accounts: 780 },
  { year: "2023", clients: 1430, accounts: 1180 },
  { year: "2024", clients: 1980, accounts: 1620 },
  { year: "2025", clients: 2420, accounts: 2100 },
  { year: "2026", clients: 2883, accounts: 2577 },
];

export const volumeAnalytics = monthlyPerformance.map((m, i) => ({
  month: m.month,
  lots: 40 + i * 6 + (i % 3 === 0 ? 18 : 4),
  usd: 5200000 + i * 720000 + (i % 2 === 0 ? 320000 : 0),
}));

export const trafficClicks = monthlyPerformance.map((m, i) => ({
  month: m.month,
  clicks: 1200 + i * 220 + (i % 2 === 0 ? 180 : 80),
  registrations: 80 + i * 22 + (i % 3 === 0 ? 24 : 6),
  conversion: +(3.4 + (i % 5) * 0.4).toFixed(2),
}));

export const trafficSources = [
  { name: "Direct", value: 38 },
  { name: "Social Media", value: 24 },
  { name: "Email", value: 14 },
  { name: "Referral", value: 12 },
  { name: "Paid Ads", value: 12 },
];

export const trafficDevices = [
  { name: "Desktop", value: 56 },
  { name: "Mobile", value: 36 },
  { name: "Tablet", value: 8 },
];

export const trafficCountries = [
  { country: "United States", flag: "🇺🇸", clicks: 4820, conv: 5.8 },
  { country: "United Kingdom", flag: "🇬🇧", clicks: 3210, conv: 4.6 },
  { country: "Germany", flag: "🇩🇪", clicks: 2840, conv: 4.2 },
  { country: "Singapore", flag: "🇸🇬", clicks: 2310, conv: 6.1 },
  { country: "UAE", flag: "🇦🇪", clicks: 1980, conv: 5.4 },
  { country: "Nigeria", flag: "🇳🇬", clicks: 1640, conv: 4.0 },
  { country: "Japan", flag: "🇯🇵", clicks: 1420, conv: 3.8 },
];

export const clicksDaily = Array.from({ length: 14 }).map((_, i) => ({
  day: `${i + 1} May`,
  clicks: 320 + Math.round(Math.sin(i / 2) * 60 + i * 12),
  unique: 240 + Math.round(Math.cos(i / 3) * 40 + i * 10),
}));

export type ClientStatus = "Active" | "Pending" | "Suspended" | "Inactive";
export type AccountType = "Standard" | "Pro" | "ECN" | "Islamic" | "VIP";

export interface Client {
  id: string;
  name: string;
  email: string;
  country: string;
  flag: string;
  registered: string;
  trading: "Active" | "Idle" | "Paused";
  deposit: number;
  account: AccountType;
  status: ClientStatus;
}

const firstNames = [
  "Liam","Olivia","Noah","Emma","Oliver","Ava","Elijah","Sophia","James","Isabella",
  "Mateo","Mia","Lucas","Amelia","Ezra","Harper","Levi","Evelyn","Adrian","Luna",
  "Kenji","Aaliyah","Hiro","Zara","Omar","Yuki","Aisha","Diego","Chen","Priya",
];
const lastNames = [
  "Carter","Bennett","Reyes","Khan","Müller","Tanaka","Okafor","Silva","Schmidt","Nguyen",
  "Kowalski","Rossi","Hassan","Park","Singh","Ivanov","Andersen","Lopez","Hoffmann","Suzuki",
];
const countries = [
  { c: "United States", f: "🇺🇸" },
  { c: "United Kingdom", f: "🇬🇧" },
  { c: "Germany", f: "🇩🇪" },
  { c: "Singapore", f: "🇸🇬" },
  { c: "UAE", f: "🇦🇪" },
  { c: "Nigeria", f: "🇳🇬" },
  { c: "Japan", f: "🇯🇵" },
  { c: "Canada", f: "🇨🇦" },
  { c: "Australia", f: "🇦🇺" },
  { c: "Switzerland", f: "🇨🇭" },
];
const accounts: AccountType[] = ["Standard", "Pro", "ECN", "Islamic", "VIP"];
const statuses: ClientStatus[] = ["Active", "Pending", "Suspended", "Inactive"];
const tradings: Client["trading"][] = ["Active", "Idle", "Paused"];

function seeded(i: number) {
  // deterministic pseudo-random
  const x = Math.sin(i * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export const clients: Client[] = Array.from({ length: 42 }).map((_, i) => {
  const fn = firstNames[Math.floor(seeded(i + 1) * firstNames.length)];
  const ln = lastNames[Math.floor(seeded(i + 7) * lastNames.length)];
  const co = countries[Math.floor(seeded(i + 11) * countries.length)];
  const acc = accounts[Math.floor(seeded(i + 13) * accounts.length)];
  const st = statuses[Math.floor(seeded(i + 17) * statuses.length)];
  const tr = tradings[Math.floor(seeded(i + 19) * tradings.length)];
  const deposit = Math.round(800 + seeded(i + 21) * 18000);
  const month = String(1 + Math.floor(seeded(i + 23) * 5)).padStart(2, "0");
  const day = String(1 + Math.floor(seeded(i + 25) * 27)).padStart(2, "0");
  return {
    id: `CLT-${10248 + i}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@mail.com`,
    country: co.c,
    flag: co.f,
    registered: `2026-${month}-${day}`,
    trading: tr,
    deposit,
    account: acc,
    status: st,
  };
});

export type Side = "Buy" | "Sell";
export type TradeStatus = "Open" | "Closed" | "Cancelled";

export interface Trade {
  id: string;
  instrument: string;
  lot: number;
  side: Side;
  pl: number;
  openTime: string;
  closeTime: string;
  status: TradeStatus;
}

const instruments = [
  "EUR/USD","GBP/USD","USD/JPY","AUD/USD","USD/CAD","XAU/USD",
  "BTC/USD","ETH/USD","US30","NAS100","SPX500","WTI",
];

export const trades: Trade[] = Array.from({ length: 28 }).map((_, i) => {
  const ins = instruments[Math.floor(seeded(i + 3) * instruments.length)];
  const side: Side = seeded(i + 5) > 0.5 ? "Buy" : "Sell";
  const lot = +(0.05 + seeded(i + 8) * 4.95).toFixed(2);
  const pl = +((seeded(i + 12) - 0.4) * 1800).toFixed(2);
  const day = String(1 + Math.floor(seeded(i + 14) * 27)).padStart(2, "0");
  const oh = String(Math.floor(seeded(i + 16) * 12)).padStart(2, "0");
  const ch = String(13 + Math.floor(seeded(i + 18) * 10)).padStart(2, "0");
  const status: TradeStatus =
    seeded(i + 20) > 0.85 ? "Open" : seeded(i + 22) > 0.92 ? "Cancelled" : "Closed";
  return {
    id: `TRD-${508720 + i}`,
    instrument: ins,
    lot,
    side,
    pl,
    openTime: `2026-05-${day} ${oh}:24`,
    closeTime: `2026-05-${day} ${ch}:48`,
    status,
  };
});

export interface ActivityItem {
  id: string;
  type: "client" | "deposit" | "trade" | "withdrawal" | "commission";
  title: string;
  detail: string;
  time: string;
  amount?: string;
}

export const recentActivity: ActivityItem[] = [
  {
    id: "a1",
    type: "client",
    title: "New client registered",
    detail: "Yuki Tanaka • Singapore",
    time: "2 min ago",
  },
  {
    id: "a2",
    type: "deposit",
    title: "Deposit made",
    detail: "Liam Carter • Standard account",
    amount: "+$4,250",
    time: "9 min ago",
  },
  {
    id: "a3",
    type: "trade",
    title: "Trade opened",
    detail: "EUR/USD • 1.20 lots • Buy",
    time: "14 min ago",
  },
  {
    id: "a4",
    type: "withdrawal",
    title: "Withdrawal processed",
    detail: "Aisha Khan • Pro account",
    amount: "-$1,820",
    time: "32 min ago",
  },
  {
    id: "a5",
    type: "commission",
    title: "Commission earned",
    detail: "Tier 1 partner payout",
    amount: "+$612",
    time: "1 hr ago",
  },
  {
    id: "a6",
    type: "trade",
    title: "Trade closed",
    detail: "XAU/USD • 0.50 lots • Sell",
    amount: "+$418",
    time: "1 hr ago",
  },
  {
    id: "a7",
    type: "client",
    title: "New client registered",
    detail: "Diego Reyes • UAE",
    time: "2 hr ago",
  },
];

export const commissionPayouts = [
  { id: "PO-9821", date: "2026-05-12", method: "Bank Transfer", amount: 4820, status: "Paid" },
  { id: "PO-9805", date: "2026-05-05", method: "USDT (TRC20)", amount: 3120, status: "Paid" },
  { id: "PO-9792", date: "2026-04-28", method: "Bank Transfer", amount: 5420, status: "Paid" },
  { id: "PO-9778", date: "2026-04-21", method: "Skrill", amount: 1820, status: "Paid" },
  { id: "PO-9762", date: "2026-04-14", method: "Bank Transfer", amount: 858, status: "Pending" },
];

export const commissionBreakdown = [
  { tier: "Tier 1 — Direct", value: 9420 },
  { tier: "Tier 2 — Sub-IB", value: 4120 },
  { tier: "Tier 3 — Network", value: 1820 },
  { tier: "CPA Bonuses", value: 678 },
];

export const reports = [
  {
    id: "monthly",
    title: "Monthly Performance Report",
    description: "Full breakdown of monthly KPIs, deposits and commissions.",
    range: "May 2026",
    size: "2.4 MB",
    formats: ["PDF", "Excel", "CSV"] as const,
  },
  {
    id: "yearly",
    title: "Yearly Partner Statement",
    description: "Annual partner statement with audited figures.",
    range: "Jan – Dec 2026",
    size: "8.1 MB",
    formats: ["PDF", "Excel"] as const,
  },
  {
    id: "daily",
    title: "Daily Activity Snapshot",
    description: "Yesterday's referrals, conversions and trade volume.",
    range: "18 May 2026",
    size: "640 KB",
    formats: ["PDF", "CSV"] as const,
  },
  {
    id: "clients",
    title: "Active Clients Report",
    description: "Roster of currently active funded accounts.",
    range: "May 2026",
    size: "1.2 MB",
    formats: ["Excel", "CSV"] as const,
  },
  {
    id: "trades",
    title: "Trade Volume Report",
    description: "Per-instrument volume by lots and notional USD.",
    range: "Q2 2026",
    size: "3.7 MB",
    formats: ["PDF", "Excel", "CSV"] as const,
  },
  {
    id: "campaign",
    title: "Campaign Attribution",
    description: "Click-to-deposit attribution per referral campaign.",
    range: "May 2026",
    size: "1.8 MB",
    formats: ["PDF", "Excel"] as const,
  },
];
