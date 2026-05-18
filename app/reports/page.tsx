"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  FileText,
  FileSpreadsheet,
  FileType,
  Calendar,
  Clock,
  Download,
} from "lucide-react";
import { reports } from "@/lib/data";

const formatIcon = {
  PDF: FileType,
  Excel: FileSpreadsheet,
  CSV: FileText,
} as const;

const formatTone = {
  PDF: "rose",
  Excel: "emerald",
  CSV: "brand",
} as const;

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Generate and download partner statements, analytics exports and audited financial reports."
      >
        <Button variant="secondary" size="md">
          <Calendar className="h-3.5 w-3.5" />
          Schedule
        </Button>
        <Button variant="primary" size="md">
          Generate Custom
        </Button>
      </PageHeader>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.id} className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500/25 to-emerald-500/15 text-brand-200">
                <FileText className="h-5 w-5" />
              </div>
              <Badge tone="brand" dot>
                Ready
              </Badge>
            </div>

            <div>
              <h3 className="font-display text-base font-semibold text-white">
                {r.title}
              </h3>
              <p className="mt-1 text-sm text-white/55">{r.description}</p>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {r.range}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {r.size}
              </span>
            </div>

            <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/[0.05] pt-4">
              <div className="flex items-center gap-1.5">
                {r.formats.map((f) => {
                  const Icon = formatIcon[f];
                  return (
                    <span
                      key={f}
                      className="inline-flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-white/65"
                    >
                      <Icon className="h-3 w-3" />
                      {f}
                    </span>
                  );
                })}
              </div>
              <Button size="sm" variant="primary">
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
            </div>
          </Card>
        ))}
      </section>
    </>
  );
}
