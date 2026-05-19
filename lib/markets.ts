// Live market data — deterministic seed + tiny random tick so it "breathes"

export type AssetClass = "Forex" | "Metals" | "Crypto" | "Indices" | "Energies";

export interface Instrument {
  symbol: string;
  name: string;
  asset: AssetClass;
  price: number;
  digits: number;
  spread: number;
  change: number; // % daily
  high: number;
  low: number;
  volume24h: number; // notional, USD
  spark: number[];
}

const seed = (n: number) => {
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const makeSpark = (n: number, base = 50, range = 28) =>
  Array.from({ length: 24 }).map(
    (_, i) => base + Math.sin((n + i) / 3) * range + (seed(n + i) - 0.5) * 6,
  );

export const instruments: Instrument[] = [
  // Forex majors
  { symbol: "EUR/USD", name: "Euro / US Dollar", asset: "Forex", price: 1.08642, digits: 5, spread: 0.7, change: 0.42, high: 1.0892, low: 1.0820, volume24h: 1_840_000_000, spark: makeSpark(1, 50, 18) },
  { symbol: "GBP/USD", name: "Pound / US Dollar", asset: "Forex", price: 1.26418, digits: 5, spread: 0.9, change: -0.18, high: 1.2678, low: 1.2624, volume24h: 1_120_000_000, spark: makeSpark(2, 50, 22) },
  { symbol: "USD/JPY", name: "US Dollar / Yen", asset: "Forex", price: 154.218, digits: 3, spread: 0.6, change: 0.28, high: 154.62, low: 153.78, volume24h: 980_000_000, spark: makeSpark(3, 50, 24) },
  { symbol: "AUD/USD", name: "Aussie / US Dollar", asset: "Forex", price: 0.66428, digits: 5, spread: 1.1, change: -0.51, high: 0.6680, low: 0.6628, volume24h: 540_000_000, spark: makeSpark(4, 50, 28) },
  { symbol: "USD/CAD", name: "US Dollar / Loonie", asset: "Forex", price: 1.36842, digits: 5, spread: 1.0, change: 0.12, high: 1.3712, low: 1.3658, volume24h: 480_000_000, spark: makeSpark(5, 50, 18) },
  { symbol: "USD/CHF", name: "US Dollar / Swiss", asset: "Forex", price: 0.91124, digits: 5, spread: 1.2, change: -0.34, high: 0.9148, low: 0.9094, volume24h: 320_000_000, spark: makeSpark(6, 50, 22) },
  { symbol: "NZD/USD", name: "Kiwi / US Dollar", asset: "Forex", price: 0.60214, digits: 5, spread: 1.4, change: 0.08, high: 0.6048, low: 0.6004, volume24h: 240_000_000, spark: makeSpark(7, 50, 26) },
  // Metals
  { symbol: "XAU/USD", name: "Gold Spot", asset: "Metals", price: 2384.42, digits: 2, spread: 0.18, change: 1.24, high: 2401.18, low: 2362.4, volume24h: 2_410_000_000, spark: makeSpark(8, 50, 32) },
  { symbol: "XAG/USD", name: "Silver Spot", asset: "Metals", price: 28.642, digits: 3, spread: 0.022, change: 2.18, high: 29.04, low: 28.12, volume24h: 480_000_000, spark: makeSpark(9, 50, 38) },
  // Crypto
  { symbol: "BTC/USD", name: "Bitcoin", asset: "Crypto", price: 71248.42, digits: 2, spread: 12.4, change: 3.42, high: 72180, low: 69820, volume24h: 28_400_000_000, spark: makeSpark(10, 50, 40) },
  { symbol: "ETH/USD", name: "Ethereum", asset: "Crypto", price: 3812.18, digits: 2, spread: 0.92, change: 2.18, high: 3848, low: 3712, volume24h: 14_200_000_000, spark: makeSpark(11, 50, 36) },
  { symbol: "SOL/USD", name: "Solana", asset: "Crypto", price: 168.42, digits: 2, spread: 0.18, change: 5.18, high: 172.4, low: 158.4, volume24h: 3_240_000_000, spark: makeSpark(12, 50, 44) },
  // Indices
  { symbol: "US30", name: "Dow Jones 30", asset: "Indices", price: 39842.4, digits: 1, spread: 1.4, change: 0.48, high: 39920, low: 39712, volume24h: 12_400_000_000, spark: makeSpark(13, 50, 24) },
  { symbol: "NAS100", name: "Nasdaq 100", asset: "Indices", price: 18642.8, digits: 1, spread: 1.2, change: 0.92, high: 18712, low: 18482, volume24h: 18_200_000_000, spark: makeSpark(14, 50, 30) },
  { symbol: "SPX500", name: "S&P 500", asset: "Indices", price: 5284.42, digits: 2, spread: 0.4, change: 0.62, high: 5302, low: 5240, volume24h: 9_400_000_000, spark: makeSpark(15, 50, 22) },
  // Energies
  { symbol: "WTI", name: "Crude Oil WTI", asset: "Energies", price: 79.42, digits: 2, spread: 0.04, change: -1.42, high: 81.12, low: 78.62, volume24h: 4_840_000_000, spark: makeSpark(16, 50, 32) },
  { symbol: "BRENT", name: "Brent Oil", asset: "Energies", price: 83.18, digits: 2, spread: 0.05, change: -0.92, high: 84.62, low: 82.24, volume24h: 3_120_000_000, spark: makeSpark(17, 50, 30) },
];

// Top live trades stream (for /trades order flow strip)
export interface LiveTrade {
  id: string;
  symbol: string;
  side: "Buy" | "Sell";
  lot: number;
  price: number;
  time: string;
}

export function makeLiveTrades(count = 18, tick = 0): LiveTrade[] {
  return Array.from({ length: count }).map((_, i) => {
    const inst = instruments[Math.floor(seed(i + tick + 1) * instruments.length)];
    const side = seed(i + tick + 3) > 0.5 ? "Buy" : "Sell";
    const lot = +(0.01 + seed(i + tick + 5) * 4.99).toFixed(2);
    const drift = (seed(i + tick + 7) - 0.5) * 0.001 * inst.price;
    const price = +(inst.price + drift).toFixed(inst.digits);
    const secs = i * 3 + Math.floor(seed(i + tick + 9) * 4);
    return {
      id: `T-${(508720 + i + tick * 100).toString(36).toUpperCase()}`,
      symbol: inst.symbol,
      side,
      lot,
      price,
      time: secs < 60 ? `${secs}s ago` : `${Math.floor(secs / 60)}m ${secs % 60}s ago`,
    };
  });
}

// Minute-level intraday candles for headline chart
export function intradayPrice(symbol: string, len = 96) {
  const base =
    instruments.find((i) => i.symbol === symbol)?.price ?? 1.0;
  return Array.from({ length: len }).map((_, i) => {
    const t = i / len;
    const ts = new Date(2026, 4, 18, 0, i * 15).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const value = base * (1 + Math.sin(i / 6) * 0.004 + (seed(i + 31) - 0.5) * 0.0025 + t * 0.002);
    return { time: ts, price: +value.toFixed(5) };
  });
}
