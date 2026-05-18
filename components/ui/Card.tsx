"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type CardProps = HTMLMotionProps<"div"> & {
  hoverable?: boolean;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, hoverable = true, ...props },
  ref,
) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass rounded-2xl p-5",
        hoverable && "glass-hover",
        className,
      )}
      {...props}
    />
  );
});

export function CardHeader({
  title,
  subtitle,
  right,
  className,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 mb-4",
        className,
      )}
    >
      <div>
        <h3 className="text-sm font-semibold text-white/90 tracking-tight">
          {title}
        </h3>
        {subtitle ? (
          <p className="text-xs text-white/50 mt-0.5">{subtitle}</p>
        ) : null}
      </div>
      {right}
    </div>
  );
}
