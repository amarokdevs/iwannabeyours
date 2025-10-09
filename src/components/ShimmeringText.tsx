"use client";

import { cn } from "@/lib/utils";

interface ShimmeringTextProps {
  text: string;
  className?: string;
}

export function ShimmeringText({ text, className }: ShimmeringTextProps) {
  return (
    <p
      className={cn(
        "shimmer-text text-2xl sm:text-3xl md:text-4xl font-bold",
        className
      )}
    >
      {text}
    </p>
  );
}
