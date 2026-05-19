"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  User,
  GraduationCap,
  Wrench,
  Gift,
  Copy,
  PieChart,
  Trophy,
  UsersRound,
  Megaphone,
  ChevronDown,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

const desktopNav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/trades", label: "Trades", icon: CandlestickChart },
  { href: "/clicks", label: "Clicks", icon: MousePointerClick },
  { href: "/reports", label: "Reports", icon: FileBarChart2 },
  { href: "/commissions", label: "Commissions", icon: BadgeDollarSign },
  { href: "/analytics", label: "Analytics", icon: LineChart },
  { href: "/settings", label: "Settings", icon: Settings },
];

const partnerLinks = [
  { label: "Levels", href: "/commissions", badge: "new" },
  { label: "My Dashboard", href: "/" },
  { label: "My Payouts", href: "/commissions" },
  { label: "My Campaigns", href: "/clicks" },
  { label: "Rewards Center", href: "/reports" },
  { label: "My Commission Scheme", href: "/commissions" },
  { label: "Referral Links", href: "/clicks" },
  { label: "Copy Collaboration", href: "/trades", badge: "new" },
];

const mobileMenu = [
  { label: "My Profile", icon: User, href: "/settings" },
  { label: "Education", icon: GraduationCap, href: "/reports", chevron: true },
  { label: "Trading Tools", icon: Wrench, href: "/trades", chevron: true },
  { label: "Promotions", icon: Gift, href: "/clicks", chevron: true, badge: "new" },
  { label: "Copy Trading", icon: Copy, href: "/trades", chevron: true },
  { label: "PAMM", icon: PieChart, href: "/analytics", chevron: true },
  { label: "Rewards Center", icon: Trophy, href: "/reports", chevron: true, badge: "new" },
];

/* ============================================================
   Desktop sidebar — keeps the productive left-rail navigation.
   ============================================================ */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-[252px] flex-col gap-2 border-r border-white/[0.06] bg-canvas px-4 py-5">
      <Link href="/" className="flex items-center gap-2.5 px-1">
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-500 text-white shadow-red">
          <span className="text-[11px] font-extrabold tracking-tight">HF</span>
        </div>
        <div className="leading-tight">
          <p className="text-base font-bold text-white tracking-tight">
            HF<span className="text-brand-500">M</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/45">
            HF Markets · Partners
          </p>
        </div>
      </Link>

      <p className="mt-5 px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
        Workspace
      </p>

      <nav className="flex flex-col gap-1">
        {desktopNav.map((item) => {
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
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                "text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white",
                active && "nav-active text-white",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 transition-colors",
                  active ? "text-brand-500" : "text-white/45 group-hover:text-white/85",
                )}
              />
              <span className="tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-white/[0.06] bg-panel p-4">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/15 text-brand-500">
            <Trophy className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-white">Tier 1 Partner</p>
            <p className="text-[10px] text-white/50">Payout multiplier · 1.4x</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className="h-full rounded-full bg-brand-500"
            style={{ width: "72%" }}
          />
        </div>
        <p className="mt-2 text-[10px] text-white/45">
          $4,210 to reach Tier 2 status
        </p>
      </div>
    </aside>
  );
}

/* ============================================================
   Mobile profile menu — matches the Exness-style side drawer.
   ============================================================ */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const [partnersOpen, setPartnersOpen] = useState(true);

  return (
    <aside className="flex h-full w-[88vw] max-w-[360px] flex-col bg-canvas">
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div className="flex items-start gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-500 text-sm font-bold text-white">
            MA
          </div>
          <div className="leading-tight">
            <p className="text-base font-semibold text-white">
              Hi Mahmud Abba Bissalah
            </p>
            <p className="mt-0.5 text-xs text-white/55">m*****@gmail.com</p>
            <button className="mt-1 inline-flex items-center gap-1 text-xs text-white/65 hover:text-white">
              Wallet ID: 65071014
              <Copy className="h-3 w-3" />
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-lg text-white/55 hover:bg-white/[0.05] hover:text-white"
          aria-label="Close menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 h-px w-full bg-white/[0.06]" />

      <div className="flex-1 overflow-y-auto px-2 py-2">
        <ul className="flex flex-col">
          {mobileMenu.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.label}>
                <Link
                  href={it.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/90 hover:bg-white/[0.04]"
                >
                  <Icon className="h-[18px] w-[18px] text-white/65" />
                  <span className="flex-1 tracking-tight">{it.label}</span>
                  {it.badge ? (
                    <span className="rounded bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      {it.badge}
                    </span>
                  ) : null}
                  {it.chevron ? (
                    <ChevronDown className="h-4 w-4 -rotate-90 text-white/40" />
                  ) : null}
                </Link>
              </li>
            );
          })}

          {/* Partners (expandable) */}
          <li>
            <button
              onClick={() => setPartnersOpen((v) => !v)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/90 hover:bg-white/[0.04]"
            >
              <UsersRound className="h-[18px] w-[18px] text-white/65" />
              <span className="flex-1 text-left tracking-tight">Partners</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-white/55 transition-transform",
                  partnersOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {partnersOpen ? (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden pl-8"
                >
                  {partnerLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        onClick={onClose}
                        className="flex items-center gap-3 py-2.5 text-sm text-white/80 hover:text-white"
                      >
                        <span className="h-1 w-1 rounded-full bg-white/40" />
                        <span className="flex-1">{l.label}</span>
                        {l.badge ? (
                          <span className="rounded bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            {l.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </li>

          <li>
            <Link
              href="/clicks"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-white/90 hover:bg-white/[0.04]"
            >
              <Megaphone className="h-[18px] w-[18px] text-white/65" />
              <span className="flex-1 tracking-tight">Refer a Friend</span>
              <span className="rounded bg-brand-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                new
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3 border-t border-white/[0.06] px-4 py-4 pb-safe">
        <Button variant="green" size="md" className="flex-1">
          Deposit
        </Button>
        <Button variant="outline" size="md" className="flex-1">
          My Wallet
        </Button>
      </div>
    </aside>
  );
}
