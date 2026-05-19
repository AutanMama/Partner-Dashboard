"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CandlestickChart,
  MousePointerClick,
  FileBarChart2,
  BadgeDollarSign,
  LineChart,
  Settings,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const nav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/trades", label: "Trades", icon: CandlestickChart },
  { href: "/clicks", label: "Clicks", icon: MousePointerClick },
  { href: "/reports", label: "Reports", icon: FileBarChart2 },
  { href: "/commissions", label: "Commissions", icon: BadgeDollarSign },
  { href: "/analytics", label: "Analytics", icon: LineChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  onClose,
  mobile = false,
}: {
  onClose?: () => void;
  mobile?: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-[260px] flex-col gap-2 border-r border-white/[0.06] bg-ink-900/80 backdrop-blur-xl",
        "px-4 py-5",
      )}
    >
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-gradient-brand grid place-items-center shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-ink-900" />
          </div>
          <div className="leading-tight">
            <p className="font-display font-bold text-white tracking-tight">
              Apex<span className="text-brand-400">IB</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
              Partner Suite
            </p>
          </div>
        </Link>
        {mobile ? (
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-white/60 hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <p className="mt-4 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
        Workspace
      </p>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
                "text-white/65 transition-colors hover:text-white",
                active && "nav-active text-white",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  active ? "text-brand-300" : "text-white/45 group-hover:text-white/85",
                )}
              />
              <span className="tracking-tight">{item.label}</span>
              {active ? (
                <motion.span
                  layoutId="nav-active-indicator"
                  className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_12px_2px_rgba(38,103,255,0.6)]"
                />
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/15 text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-white">Tier 1 Partner</p>
              <p className="text-[10px] text-white/50">
                Payout multiplier · 1.4x
              </p>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-500 to-emerald-400"
              style={{ width: "72%" }}
            />
          </div>
          <p className="mt-2 text-[10px] text-white/45">
            $4,210 to reach Tier 2 status
          </p>
        </div>
      </div>
    </aside>
  );
}
