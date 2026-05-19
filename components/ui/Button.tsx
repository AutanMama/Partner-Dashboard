"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "green";
type Size = "sm" | "md" | "lg";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white shadow-red hover:bg-brand-400 active:bg-brand-600",
  green:
    "bg-accent-green text-black hover:bg-accent-greenDark active:bg-accent-greenDark",
  secondary:
    "bg-white/[0.04] text-white border border-white/10 hover:bg-white/[0.08]",
  ghost: "bg-transparent text-white/75 hover:text-white hover:bg-white/[0.05]",
  outline:
    "bg-transparent text-white border border-white/15 hover:border-brand-500 hover:text-brand-400",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-sm gap-2.5",
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
          "inline-flex items-center justify-center rounded-lg font-semibold tracking-tight transition-colors duration-150 active:translate-y-[0.5px] disabled:opacity-50 disabled:pointer-events-none",
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
