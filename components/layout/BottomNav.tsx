"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  ArrowLeftRight,
  TrendingUp,
  Newspaper,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Menu", icon: Menu, match: "/" as const },
  { href: "/trades", label: "Trades", icon: ArrowLeftRight, match: "/trades" },
  { href: "/analytics", label: "Markets", icon: TrendingUp, match: "/analytics" },
  { href: "/reports", label: "News", icon: Newspaper, match: "/reports" },
  { href: "/settings", label: "More", icon: MoreHorizontal, match: "/settings" },
];

export function BottomNav({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-white/[0.06] bg-canvas/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <ul className="grid grid-cols-5">
        {items.map((it, i) => {
          const Icon = it.icon;
          const active =
            it.match === "/"
              ? pathname === "/"
              : pathname.startsWith(it.match);
          const isMenu = i === 0;

          const content = (
            <div className="flex h-full flex-col items-center justify-center gap-1 py-2.5">
              <Icon
                className={cn(
                  "h-5 w-5 transition-colors",
                  active ? "text-brand-500" : "text-white/65",
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium tracking-tight",
                  active ? "text-white" : "text-white/65",
                )}
              >
                {it.label}
              </span>
            </div>
          );

          return (
            <li key={it.label}>
              {isMenu ? (
                <button
                  onClick={onMenuClick}
                  className="block h-full w-full"
                  aria-label="Open menu"
                >
                  {content}
                </button>
              ) : (
                <Link href={it.href} className="block h-full">
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
