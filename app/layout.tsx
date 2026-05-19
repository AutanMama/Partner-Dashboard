import type { Metadata } from "next";
import "./globals.css";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const metadata: Metadata = {
  title: "HFM — Partner Dashboard",
  description:
    "HF Markets partner dashboard — real-time analytics for Introducing Brokers, affiliates and sub-partners.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
