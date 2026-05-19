"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { LiveTicker } from "@/components/markets/LiveTicker";
import { LivePulseStrip } from "@/components/dashboard/LivePulseStrip";
import { OrderFlow } from "@/components/markets/OrderFlow";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ClientsTable } from "@/components/tables/ClientsTable";
import { Download, Share2 } from "lucide-react";
import { getStats, type Granularity } from "@/lib/granularData";

export default function DashboardPage() {
  const [granularity, setGranularity] = useState<Granularity>("Month");
  const [year, setYear] = useState("2026");
  const [date, setDate] = useState("2026-05-18");

  const stats = useMemo(() => getStats(granularity), [granularity]);

  return (
    <>
      <LiveTicker />

      <PageHeader
        title="Partner Dashboard"
        description="Real-time analytics on your referral network, trading volume, deposits and commission payouts."
      >
        <Badge tone="green" dot>
          Live · {granularity.toLowerCase()}
        </Badge>
        <Button variant="secondary" size="md">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </Button>
        <Button variant="primary" size="md">
          <Download className="h-3.5 w-3.5" />
          Export PDF
        </Button>
      </PageHeader>

      <LivePulseStrip />

      <FilterBar
        granularity={granularity}
        onGranularityChange={setGranularity}
        year={year}
        onYearChange={setYear}
        date={date}
        onDateChange={setDate}
        onReset={() => {
          setGranularity("Month");
          setYear("2026");
          setDate("2026-05-18");
        }}
      />

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatsCard key={s.id} stat={s} index={i} />
        ))}
      </section>

      <section className="grid grid-cols-12 gap-3">
        <PerformanceChart granularity={granularity} />
        <OrderFlow />
      </section>

      <section className="grid grid-cols-12 gap-3">
        <div className="col-span-12 xl:col-span-7">
          <ClientsTable initialRows={6} />
        </div>
        <RecentActivity />
      </section>
    </>
  );
}
