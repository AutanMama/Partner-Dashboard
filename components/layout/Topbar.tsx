"use client";

import {
  Bell,
  ChevronDown,
  Search,
  Wallet,
  LogOut,
  User as UserIcon,
  Settings as SettingsIcon,
  HelpCircle,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useLiveClock() {
  const [now, setNow] = useState<string>("--:--:--");
  useEffect(() => {
    setNow(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    const id = setInterval(() => {
      setNow(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function Topbar({ onMenuClick: _onMenuClick }: { onMenuClick: () => void }) {
  void _onMenuClick;
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const clock = useLiveClock();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      ref={ref}
      className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-white/[0.06] bg-canvas/95 px-4 backdrop-blur-xl sm:h-16 sm:px-6"
    >
      <div className="relative hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          placeholder="Search clients, trades, reports…"
          className="field pl-10"
        />
      </div>

      {/* Mobile title slot */}
      <div className="md:hidden flex flex-1 items-center gap-2 truncate">
        <div className="grid h-7 w-7 place-items-center rounded-md bg-brand-500 text-[10px] font-extrabold text-white">
          HF
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold tracking-tight text-white">
            HF<span className="text-brand-500">M</span>
          </p>
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/45">
            HF Markets
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-white/[0.06] bg-panel px-3 py-1.5 text-xs lg:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent-green">
            Live
          </span>
          <span className="font-mono text-[11px] tabular-nums text-white/70">
            {clock} UTC
          </span>
        </div>

        <div className="hidden items-center gap-2 rounded-lg border border-white/[0.06] bg-panel px-3 py-1.5 text-xs sm:flex">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-accent-green/15 text-accent-green">
            <Wallet className="h-3.5 w-3.5" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">
              Balance
            </p>
            <p className="font-semibold text-white">$16,038.42</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="relative grid h-10 w-10 place-items-center rounded-lg border border-white/[0.06] bg-panel text-white/75 transition hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-canvas" />
          </button>
          <AnimatePresence>
            {notifOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-12 w-80 origin-top-right rounded-xl border border-white/[0.06] bg-panel-elevated p-2 shadow-soft"
              >
                <div className="flex items-center justify-between p-2.5">
                  <p className="text-xs font-semibold text-white">
                    Notifications
                  </p>
                  <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-medium text-brand-400">
                    3 new
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {[
                    {
                      t: "Commission paid",
                      d: "$4,820 transferred to your bank",
                      time: "5m",
                    },
                    {
                      t: "New referral",
                      d: "Yuki Tanaka registered via link",
                      time: "1h",
                    },
                    {
                      t: "Weekly report ready",
                      d: "Your performance report is available",
                      time: "3h",
                    },
                  ].map((n, i) => (
                    <div
                      key={i}
                      className="cursor-pointer rounded-lg px-3 py-2.5 transition hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">{n.t}</p>
                        <span className="text-[10px] text-white/40">
                          {n.time}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-white/55">{n.d}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-panel px-2 py-1.5 transition hover:border-white/15"
          >
            <div className="grid h-7 w-7 place-items-center rounded-md bg-brand-500 text-xs font-bold text-white">
              MA
            </div>
            <div className="hidden text-left leading-tight sm:block">
              <p className="text-xs font-semibold text-white">Mahmud A. Bissalah</p>
              <p className="text-[10px] text-white/45">Tier 1 Partner</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-white/40" />
          </button>
          <AnimatePresence>
            {profileOpen ? (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-12 w-60 origin-top-right rounded-xl border border-white/[0.06] bg-panel-elevated p-2 shadow-soft"
              >
                <div className="flex items-center gap-3 rounded-lg bg-white/[0.03] p-3">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-brand-500 text-sm font-bold text-white">
                    MA
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">
                      Mahmud Abba Bissalah
                    </p>
                    <p className="text-[10px] text-white/45">
                      m*****@gmail.com
                    </p>
                  </div>
                </div>
                <div className="my-2 h-px bg-white/[0.06]" />
                {[
                  { i: UserIcon, l: "My profile" },
                  { i: SettingsIcon, l: "Settings" },
                  { i: HelpCircle, l: "Help & Support" },
                ].map((it, i) => {
                  const Ic = it.i;
                  return (
                    <button
                      key={i}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-white/75 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <Ic className="h-3.5 w-3.5 text-white/45" />
                      {it.l}
                    </button>
                  );
                })}
                <div className="my-1 h-px bg-white/[0.06]" />
                <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-brand-400 transition hover:bg-brand-500/[0.08]">
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
