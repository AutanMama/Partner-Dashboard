"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { MonthlyPerformanceChart } from "@/components/dashboard/MonthlyPerformanceChart";
import { ClientGrowthChart } from "@/components/dashboard/ClientGrowthChart";
import { VolumeChart } from "@/components/dashboard/VolumeChart";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ClientsTable } from "@/components/tables/ClientsTable";
import { dashboardStats } from "@/lib/data";
import { Download, Share2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Partner Dashboard"
        description="Real-time analytics on your referral network, trading volume, deposits and commission payouts."
      >
        <Button variant="secondary" size="md">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </Button>
        <Button variant="primary" size="md">
          <Download className="h-3.5 w-3.5" />
          Export PDF
        </Button>
      </PageHeader>

      <FilterBar />

      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {dashboardStats.map((s, i) => (
          <StatsCard key={s.id} stat={s} index={i} />
        ))}
      </section>

      <section className="grid grid-cols-12 gap-4">
        <MonthlyPerformanceChart />
        <ClientGrowthChart />
      </section>

      <section className="grid grid-cols-12 gap-4">
        <VolumeChart />
        <TrafficChart />
      </section>

      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-12 xl:col-span-7">
          <ClientsTable initialRows={6} />
        </div>
        <RecentActivity />
      </section>
    </>
  );
}
