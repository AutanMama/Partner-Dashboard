import { cn } from "@/lib/utils";

type Tone = "red" | "green" | "amber" | "slate" | "blue";

const toneMap: Record<Tone, string> = {
  red: "bg-brand-500/12 text-brand-400 border-brand-500/30",
  green: "bg-accent-green/12 text-accent-green border-accent-green/30",
  amber: "bg-amber-500/12 text-amber-300 border-amber-400/30",
  blue: "bg-sky-500/12 text-sky-300 border-sky-400/30",
  slate: "bg-white/[0.04] text-white/70 border-white/10",
};

const dotMap: Record<Tone, string> = {
  red: "bg-brand-500",
  green: "bg-accent-green",
  amber: "bg-amber-400",
  blue: "bg-sky-400",
  slate: "bg-white/60",
};

export function Badge({
  children,
  tone = "slate",
  className,
  dot = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-tight",
        toneMap[tone],
        className,
      )}
    >
      {dot ? (
        <span className={cn("h-1.5 w-1.5 rounded-full", dotMap[tone])} />
      ) : null}
      {children}
    </span>
  );
}
