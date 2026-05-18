"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { ClientsTable } from "@/components/tables/ClientsTable";
import { Card } from "@/components/ui/Card";
import { Sparkline } from "@/components/ui/Sparkline";
import { Plus, Download, Users, UserCheck, UserX, Globe2 } from "lucide-react";
import { clients } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default function ClientsPage() {
  const active = clients.filter((c) => c.status === "Active").length;
  const pending = clients.filter((c) => c.status === "Pending").length;
  const countries = new Set(clients.map((c) => c.country)).size;

  const summary = [
    {
      title: "Total Clients",
      value: formatNumber(clients.length),
      icon: Users,
      color: "#4d8bff",
      spark: [10, 14, 18, 24, 30, 36, 40, 44, 50, 58, 64, 72],
    },
    {
      title: "Active Clients",
      value: formatNumber(active),
      icon: UserCheck,
      color: "#34d399",
      spark: [22, 26, 30, 28, 34, 40, 46, 50, 58, 62, 68, 74],
    },
    {
      title: "Pending KYC",
      value: formatNumber(pending),
      icon: UserX,
      color: "#fbbf24",
      spark: [12, 10, 14, 16, 12, 18, 20, 16, 22, 24, 20, 26],
    },
    {
      title: "Countries",
      value: formatNumber(countries),
      icon: Globe2,
      color: "#a78bfa",
      spark: [4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10],
    },
  ];

  return (
    <>
      <PageHeader
        title="Clients"
        description="Manage every client referred under your partner link, monitor KYC progress and deposit activity."
      >
        <Button variant="secondary" size="md">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
        <Button variant="primary" size="md">
          <Plus className="h-3.5 w-3.5" />
          Invite Client
        </Button>
      </PageHeader>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summary.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="overflow-hidden">
              <div className="flex items-start justify-between">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06]"
                  style={{ background: `${s.color}1f`, color: s.color }}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-4 text-xs font-medium text-white/55">
                {s.title}
              </p>
              <p className="mt-1 font-display text-2xl font-bold text-white">
                {s.value}
              </p>
              <div className="mt-3 -mx-1">
                <Sparkline data={s.spark} color={s.color} />
              </div>
            </Card>
          );
        })}
      </section>

      <ClientsTable initialRows={10} />
    </>
  );
}
