"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow hover:from-brand-400 hover:to-brand-600",
  secondary:
    "bg-white/[0.06] text-white hover:bg-white/[0.1] border border-white/10",
  ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/[0.05]",
  outline:
    "bg-transparent text-white border border-white/15 hover:border-brand-400/50 hover:text-brand-200",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-9 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  function Button(
    { className, variant = "primary", size = "md", children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium tracking-tight transition-all duration-200 active:translate-y-[0.5px] disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
