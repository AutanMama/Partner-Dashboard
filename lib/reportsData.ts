// Mock data for the Reports page
// 4 tabs (Overall Performance / Client / Trades / Clicks)
// 6 group-by options (Day / Week / Month / Year / Country / Campaign)

export type ReportTab = "overall" | "client" | "trades" | "clicks";
export type GroupBy = "Day" | "Week" | "Month" | "Year" | "Country" | "Campaign";

export interface ReportRow {
  key: string;
  label: string;
  volume: number;
  commission: number;
  details: { label: string; value: string; tone?: "default" | "red" }[];
}

const buildOverallDetails = (volume: number, commission: number) => [
  { label: "Trading Account Registrations", value: String(Math.max(0, Math.round(volume * 0.0008))), tone: "red" as const },
  { label: "Wallet Registrations", value: String(Math.max(0, Math.round(volume * 0.003))) },
  { label: "Trades", value: String(Math.max(0, Math.round(volume * 0.012))), tone: "red" as const },
  { label: "Internal Transfers In", value: `$${(volume * 0.001).toFixed(2)}` },
  { label: "Net Internals", value: `$${(volume * 0.0005).toFixed(2)}` },
  { label: "Internal transfers out", value: `$${(volume * 0.0006).toFixed(2)}` },
  { label: "Volume (Million USD)", value: (volume / 1_000_000).toFixed(2) },
];

const buildClientDetails = (volume: number) => [
  { label: "New Clients", value: String(Math.round(volume * 0.0006)), tone: "red" as const },
  { label: "Active Clients", value: String(Math.round(volume * 0.0004)) },
  { label: "Funded Accounts", value: String(Math.round(volume * 0.00035)) },
  { label: "KYC Pending", value: String(Math.round(volume * 0.00012)) },
  { label: "Average Deposit", value: `$${(volume * 0.00045).toFixed(2)}` },
];

const buildTradesDetails = (volume: number) => [
  { label: "Total Lots", value: (volume * 0.000012).toFixed(2) },
  { label: "Winning Trades", value: String(Math.round(volume * 0.0085)) },
  { label: "Losing Trades", value: String(Math.round(volume * 0.0042)), tone: "red" as const },
  { label: "Avg P/L", value: `$${(volume * 0.000004).toFixed(2)}` },
  { label: "Top Instrument", value: "EUR/USD" },
];

const buildClicksDetails = (volume: number) => [
  { label: "Total Clicks", value: String(Math.round(volume * 0.0042)) },
  { label: "Unique Visitors", value: String(Math.round(volume * 0.0028)) },
  { label: "Conversion Rate", value: `${(2.4 + (volume % 100) / 80).toFixed(2)}%` },
  { label: "Top Source", value: "Telegram" },
  { label: "Top Country", value: "Nigeria" },
];

// ---- Base data sets ----

const monthsLong = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",
];

const countries = [
  { code: "Nigeria", flag: "🇳🇬", volume: 28_400_000, commission: 4820.42 },
  { code: "United States", flag: "🇺🇸", volume: 19_650_000, commission: 3120.18 },
  { code: "United Kingdom", flag: "🇬🇧", volume: 14_320_000, commission: 2240.66 },
  { code: "Singapore", flag: "🇸🇬", volume: 9_870_000, commission: 1820.45 },
  { code: "Germany", flag: "🇩🇪", volume: 6_540_000, commission: 1140.12 },
  { code: "UAE", flag: "🇦🇪", volume: 4_210_000, commission: 824.31 },
];

const campaigns = [
  { code: "TG-Signals-2026", volume: 18_420_000, commission: 3120.55 },
  { code: "YouTube-Pro-Tips", volume: 12_180_000, commission: 2080.71 },
  { code: "Email Newsletter", volume: 7_640_000, commission: 1240.18 },
  { code: "Instagram-Reels", volume: 5_140_000, commission: 884.04 },
  { code: "Blog SEO", volume: 3_180_000, commission: 612.28 },
  { code: "WhatsApp Status", volume: 1_820_000, commission: 410.55 },
];

// ---- Builders per tab ----

function rowFromBase(
  tab: ReportTab,
  key: string,
  label: string,
  volume: number,
  commission: number,
): ReportRow {
  const details =
    tab === "overall"
      ? buildOverallDetails(volume, commission)
      : tab === "client"
        ? buildClientDetails(volume)
        : tab === "trades"
          ? buildTradesDetails(volume)
          : buildClicksDetails(volume);
  return { key, label, volume, commission, details };
}

function dayRows(tab: ReportTab): ReportRow[] {
  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(2026, 4, 12 + i); // May 12 → 18 2026
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const volume = 820_000 + i * 240_000 + (i % 2 === 0 ? 120_000 : 0);
    const commission = 180.42 + i * 64.18;
    return rowFromBase(tab, dateStr, dateStr, volume, commission);
  });
}

function weekRows(tab: ReportTab): ReportRow[] {
  return Array.from({ length: 6 }).map((_, i) => {
    const week = `Week ${18 - i}, 2026`;
    const volume = 5_200_000 - i * 480_000;
    const commission = 1240.42 - i * 110.24;
    return rowFromBase(tab, `W${18 - i}-2026`, week, volume, commission);
  });
}

function monthRows(tab: ReportTab): ReportRow[] {
  return monthsLong.slice(0, 5).map((m, i) => {
    const volume = 12_400_000 + i * 1_840_000;
    const commission = 2840.18 + i * 412.66;
    return rowFromBase(tab, `${m}-2026`, `${m} 2026`, volume, commission);
  });
}

function yearRows(tab: ReportTab): ReportRow[] {
  // 2026 — exact numbers from the partner's program statement
  const volume = 91_767_900;
  const commission = 16_038;

  if (tab === "overall") {
    return [
      {
        key: "2026",
        label: "2026",
        volume,
        commission,
        details: [
          { label: "Trading Account Registrations", value: "2,577", tone: "red" },
          { label: "Wallet Registrations", value: "2,883" },
          { label: "Trades", value: "3,399", tone: "red" },
          { label: "Internal Transfers In", value: "$11,289" },
          { label: "Net Internals", value: "$22,766" },
          { label: "Internal transfers out", value: "$18,777" },
          { label: "Volume (Million USD)", value: "91.77" },
        ],
      },
    ];
  }

  return [rowFromBase(tab, "2026", "2026", volume, commission)];
}

function countryRows(tab: ReportTab): ReportRow[] {
  return countries.map((c) =>
    rowFromBase(tab, c.code, `${c.flag}  ${c.code}`, c.volume, c.commission),
  );
}

function campaignRows(tab: ReportTab): ReportRow[] {
  return campaigns.map((c) =>
    rowFromBase(tab, c.code, c.code, c.volume, c.commission),
  );
}

export function getReportRows(tab: ReportTab, group: GroupBy): ReportRow[] {
  switch (group) {
    case "Day":
      return dayRows(tab);
    case "Week":
      return weekRows(tab);
    case "Month":
      return monthRows(tab);
    case "Year":
      return yearRows(tab);
    case "Country":
      return countryRows(tab);
    case "Campaign":
      return campaignRows(tab);
  }
}

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
