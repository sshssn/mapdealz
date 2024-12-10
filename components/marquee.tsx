"use client"

import { cn } from "@/lib/utils"
import { Deal } from "@/types"
import Link from "next/link"

interface MarqueeProps {
  items: Deal[]
  direction?: "left" | "right"
  speed?: number
  className?: string
}

export function Marquee({
  items,
  direction = "left",
  speed = 20,
  className,
}: MarqueeProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="flex whitespace-nowrap animate-scroll"
        style={{
          animationDirection: direction === "left" ? "normal" : "reverse",
          animationDuration: `${speed}s`,
        }}
      >
        {items.map((deal, i) => (
          <Link
            key={`${deal.id}-${i}`}
            href={deal.url}
            className="mx-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="font-semibold">{deal.title}</span>
            <span>•</span>
            <span>
              {deal.price.currency} {deal.price.current}
            </span>
            <span>•</span>
            <span className="text-green-500">{deal.price.discount}% OFF</span>
          </Link>
        ))}
      </div>
    </div>
  )
} 