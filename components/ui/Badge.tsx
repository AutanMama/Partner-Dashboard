import { cn } from "@/lib/utils";

type Tone =
  | "emerald"
  | "brand"
  | "amber"
  | "rose"
  | "violet"
  | "slate";

const toneMap: Record<Tone, string> = {
  emerald:
    "bg-emerald-500/12 text-emerald-300 border-emerald-400/25",
  brand:
    "bg-brand-500/12 text-brand-300 border-brand-400/25",
  amber:
    "bg-amber-500/12 text-amber-300 border-amber-400/25",
  rose: "bg-rose-500/12 text-rose-300 border-rose-400/25",
  violet:
    "bg-violet-500/12 text-violet-300 border-violet-400/25",
  slate:
    "bg-white/[0.04] text-white/70 border-white/10",
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
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "emerald" && "bg-emerald-400",
            tone === "brand" && "bg-brand-400",
            tone === "amber" && "bg-amber-400",
            tone === "rose" && "bg-rose-400",
            tone === "violet" && "bg-violet-400",
            tone === "slate" && "bg-white/60",
          )}
        />
      ) : null}
      {children}
    </span>
  );
}
