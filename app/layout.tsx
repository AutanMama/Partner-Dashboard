import type { Metadata } from "next";
import "./globals.css";
import { DashboardShell } from "@/components/layout/DashboardShell";

export const metadata: Metadata = {
  title: "ApexIB — Partner Dashboard",
  description:
    "Modern, real-time analytics suite for forex Introducing Brokers, affiliates and partner programs.",
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
