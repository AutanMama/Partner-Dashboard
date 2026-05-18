"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  User,
  Bell,
  Shield,
  Wallet,
  Globe,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "payouts", label: "Payouts", icon: Wallet },
  { id: "region", label: "Region", icon: Globe },
] as const;

type SectionId = (typeof sections)[number]["id"];

export default function SettingsPage() {
  const [active, setActive] = useState<SectionId>("profile");

  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your partner profile, payout preferences, security and notification settings."
      >
        <Button variant="primary" size="md">
          <Save className="h-3.5 w-3.5" />
          Save Changes
        </Button>
      </PageHeader>

      <section className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-3" hoverable={false}>
          <nav className="flex flex-col gap-1">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "nav-active text-white"
                      : "text-white/65 hover:bg-white/[0.04] hover:text-white",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4",
                      isActive ? "text-brand-300" : "text-white/45",
                    )}
                  />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </Card>

        <Card className="col-span-12 lg:col-span-9">
          {active === "profile" ? <ProfileForm /> : null}
          {active === "notifications" ? <NotificationsForm /> : null}
          {active === "security" ? <SecurityForm /> : null}
          {active === "payouts" ? <PayoutsForm /> : null}
          {active === "region" ? <RegionForm /> : null}
        </Card>
      </section>
    </>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-white/65">{label}</span>
      {children}
      {hint ? <span className="text-[11px] text-white/40">{hint}</span> : null}
    </label>
  );
}

const inputCls =
  "h-10 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-brand-400/40";

function ProfileForm() {
  return (
    <div className="flex flex-col gap-5">
      <CardHeader
        title="Profile"
        subtitle="Information shown across your partner workspace"
      />
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-xl font-bold text-white shadow-glow">
          RA
        </div>
        <div className="flex flex-col gap-1">
          <Badge tone="emerald" dot>
            Verified Partner · Tier 1
          </Badge>
          <p className="text-xs text-white/45">JPG, PNG · up to 4MB</p>
          <div className="mt-1 flex gap-2">
            <Button variant="secondary" size="sm">
              Upload
            </Button>
            <Button variant="ghost" size="sm">
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Full name">
          <input defaultValue="Rico Adams" className={inputCls} />
        </Field>
        <Field label="Partner code">
          <input defaultValue="APX-RA-00OC" className={inputCls} />
        </Field>
        <Field label="Email">
          <input defaultValue="ricodan00oc@gmail.com" className={inputCls} />
        </Field>
        <Field label="Phone">
          <input defaultValue="+1 415 555 0148" className={inputCls} />
        </Field>
        <Field label="Company">
          <input defaultValue="Apex Capital Partners LLC" className={inputCls} />
        </Field>
        <Field label="Website">
          <input defaultValue="https://apex-capital.io" className={inputCls} />
        </Field>
      </div>
    </div>
  );
}

function NotificationsForm() {
  const items = [
    { t: "Client registrations", d: "Get notified when a new client signs up", on: true },
    { t: "Deposits & withdrawals", d: "Funding activity for your referred accounts", on: true },
    { t: "Commission payouts", d: "Receive payout confirmations and statements", on: true },
    { t: "Weekly summary", d: "Curated weekly partner performance report", on: false },
    { t: "Product updates", d: "New features and platform announcements", on: false },
  ];
  return (
    <div className="flex flex-col gap-4">
      <CardHeader title="Notifications" subtitle="Choose what reaches your inbox" />
      <div className="flex flex-col divide-y divide-white/[0.05]">
        {items.map((i, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 py-3.5">
            <div>
              <p className="text-sm font-medium text-white">{i.t}</p>
              <p className="text-xs text-white/50">{i.d}</p>
            </div>
            <Toggle defaultOn={i.on} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityForm() {
  return (
    <div className="flex flex-col gap-5">
      <CardHeader title="Security" subtitle="Authentication and session management" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Current password">
          <input type="password" placeholder="••••••••" className={inputCls} />
        </Field>
        <Field label="New password">
          <input type="password" placeholder="••••••••" className={inputCls} />
        </Field>
      </div>
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Two-factor authentication</p>
            <p className="mt-0.5 text-xs text-white/55">
              Add an additional layer of security to your account.
            </p>
          </div>
          <Toggle defaultOn />
        </div>
      </div>
    </div>
  );
}

function PayoutsForm() {
  return (
    <div className="flex flex-col gap-5">
      <CardHeader
        title="Payout Preferences"
        subtitle="Where and how often you receive commission"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Preferred method">
          <select className={inputCls}>
            <option className="bg-ink-900">Bank Transfer (USD)</option>
            <option className="bg-ink-900">USDT (TRC20)</option>
            <option className="bg-ink-900">Skrill</option>
            <option className="bg-ink-900">Neteller</option>
          </select>
        </Field>
        <Field label="Payout cadence">
          <select className={inputCls}>
            <option className="bg-ink-900">Weekly</option>
            <option className="bg-ink-900">Bi-weekly</option>
            <option className="bg-ink-900">Monthly</option>
          </select>
        </Field>
        <Field label="Minimum payout">
          <input defaultValue="$100" className={inputCls} />
        </Field>
        <Field label="Tax ID">
          <input placeholder="Enter tax identification" className={inputCls} />
        </Field>
      </div>
    </div>
  );
}

function RegionForm() {
  return (
    <div className="flex flex-col gap-5">
      <CardHeader title="Region & Localization" subtitle="Language, currency, time zone" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Language">
          <select className={inputCls}>
            <option className="bg-ink-900">English (US)</option>
            <option className="bg-ink-900">English (UK)</option>
            <option className="bg-ink-900">Deutsch</option>
            <option className="bg-ink-900">Français</option>
            <option className="bg-ink-900">Español</option>
          </select>
        </Field>
        <Field label="Currency">
          <select className={inputCls}>
            <option className="bg-ink-900">USD — US Dollar</option>
            <option className="bg-ink-900">EUR — Euro</option>
            <option className="bg-ink-900">GBP — Pound Sterling</option>
            <option className="bg-ink-900">JPY — Japanese Yen</option>
          </select>
        </Field>
        <Field label="Time zone">
          <select className={inputCls}>
            <option className="bg-ink-900">UTC</option>
            <option className="bg-ink-900">America/New_York</option>
            <option className="bg-ink-900">Europe/London</option>
            <option className="bg-ink-900">Asia/Singapore</option>
          </select>
        </Field>
        <Field label="Date format">
          <select className={inputCls}>
            <option className="bg-ink-900">YYYY-MM-DD</option>
            <option className="bg-ink-900">MM/DD/YYYY</option>
            <option className="bg-ink-900">DD/MM/YYYY</option>
          </select>
        </Field>
      </div>
    </div>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        on ? "bg-gradient-brand" : "bg-white/[0.08]",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all",
          on ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}
