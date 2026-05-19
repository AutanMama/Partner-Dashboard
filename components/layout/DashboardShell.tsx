"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar, MobileMenu } from "./Sidebar";
import { Topbar } from "./Topbar";
import { BottomNav } from "./BottomNav";
import { AnimatePresence, motion } from "framer-motion";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div className="min-h-screen bg-canvas">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="sticky top-0 hidden h-screen lg:block">
          <Sidebar />
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm lg:hidden"
            />
          ) : null}
        </AnimatePresence>
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              key="mobile-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <MobileMenu onClose={() => setMobileOpen(false)} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="relative flex min-w-0 flex-1 flex-col overflow-x-hidden">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <main className="relative w-full flex-1 overflow-x-hidden px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">
            <div className="mx-auto flex w-full max-w-[1480px] min-w-0 flex-col gap-5">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <BottomNav onMenuClick={() => setMobileOpen(true)} />
    </div>
  );
}
