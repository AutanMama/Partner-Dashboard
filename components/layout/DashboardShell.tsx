"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { AnimatePresence, motion } from "framer-motion";


export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Single source of truth: drawer closes whenever the route changes.
  // Avoids the race between Link onClick and route navigation that left
  // AnimatePresence in a stuck state on mobile.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div className="bg-app min-h-screen">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <div className="sticky top-0 hidden h-screen lg:block">
          <Sidebar />
        </div>

        {/* Mobile drawer — backdrop + panel each wrapped in their own
            AnimatePresence so framer-motion tracks them independently. */}
        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              key="mobile-drawer"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <Sidebar mobile onClose={() => setMobileOpen(false)} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="relative flex min-w-0 flex-1 flex-col overflow-x-hidden">
          <Topbar onMenuClick={() => setMobileOpen(true)} />
          <main className="relative w-full flex-1 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-30" />
            <div className="mx-auto flex w-full max-w-[1480px] min-w-0 flex-col gap-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
