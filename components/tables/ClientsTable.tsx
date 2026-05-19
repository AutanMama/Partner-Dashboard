"use client";

import { useMemo, useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  SlidersHorizontal,
  MoreHorizontal,
} from "lucide-react";
import { clients, type Client, type ClientStatus } from "@/lib/data";
import { cn, formatCurrency } from "@/lib/utils";

const statusTone: Record<
  ClientStatus,
  "green" | "amber" | "red" | "slate"
> = {
  Active: "green",
  Pending: "amber",
  Suspended: "red",
  Inactive: "slate",
};

export function ClientsTable({
  initialRows = 8,
  hideHeader = false,
}: {
  initialRows?: number;
  hideHeader?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | ClientStatus>("All");
  const [page, setPage] = useState(1);
  const pageSize = initialRows;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return clients.filter((c) => {
      const matchesQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q);
      const matchesS = status === "All" || c.status === status;
      return matchesQ && matchesS;
    });
  }, [query, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages);
  const rows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <Card hoverable={false} className="overflow-hidden">
      {!hideHeader ? (
        <CardHeader
          title="Registered Clients"
          subtitle={`${filtered.length} clients under your partner code`}
          right={
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filter
              </Button>
              <Button variant="primary" size="sm">
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </div>
          }
        />
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search clients…"
            className="field pl-9 h-10"
          />
        </div>
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
          {(["All", "Active", "Pending", "Suspended", "Inactive"] as const).map(
            (s) => (
              <button
                key={s}
                onClick={() => {
                  setStatus(s);
                  setPage(1);
                }}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-[11px] font-medium transition",
                  status === s
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:text-white",
                )}
              >
                {s}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="mt-4 -mx-5 overflow-x-auto">
        <table className="w-full min-w-[860px] text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-white/40">
              <th className="px-5 py-3 font-medium">Client</th>
              <th className="px-3 py-3 font-medium">Country</th>
              <th className="px-3 py-3 font-medium">Registered</th>
              <th className="px-3 py-3 font-medium">Trading</th>
              <th className="px-3 py-3 font-medium">Deposit</th>
              <th className="px-3 py-3 font-medium">Account</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((c: Client) => (
              <tr
                key={c.id}
                className="group border-t border-white/[0.04] transition hover:bg-white/[0.02]"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-500/20 text-xs font-bold text-white">
                      {c.name
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-medium text-white">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-white/45">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-white/75">
                  <span className="mr-1.5">{c.flag}</span>
                  {c.country}
                </td>
                <td className="px-3 py-3 text-white/60">{c.registered}</td>
                <td className="px-3 py-3">
                  <Badge
                    tone={
                      c.trading === "Active"
                        ? "green"
                        : c.trading === "Idle"
                          ? "slate"
                          : "amber"
                    }
                    dot
                  >
                    {c.trading}
                  </Badge>
                </td>
                <td className="px-3 py-3 font-medium text-white">
                  {formatCurrency(c.deposit)}
                </td>
                <td className="px-3 py-3">
                  <Badge tone="red">{c.account}</Badge>
                </td>
                <td className="px-3 py-3">
                  <Badge tone={statusTone[c.status]} dot>
                    {c.status}
                  </Badge>
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="grid h-8 w-8 place-items-center rounded-lg text-white/45 transition group-hover:bg-white/[0.05] group-hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-16 text-center">
                  <div className="mx-auto max-w-xs">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.04] text-white/40">
                      <Search className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-white">
                      No clients found
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      Try adjusting your search query or filters.
                    </p>
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-white/45">
          Showing {(safePage - 1) * pageSize + 1}–
          {Math.min(safePage * pageSize, filtered.length)} of {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.06] text-white/60 transition hover:border-brand-500/40 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                "h-8 min-w-8 rounded-lg border px-2 text-xs font-medium transition",
                safePage === i + 1
                  ? "border-brand-500/50 bg-brand-500/15 text-white"
                  : "border-white/[0.06] text-white/55 hover:text-white",
              )}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={safePage >= pages}
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/[0.06] text-white/60 transition hover:border-brand-500/40 hover:text-white disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
