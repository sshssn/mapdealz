"use client"

import dynamic from "next/dynamic"

const DealMap = dynamic(() => import("@/components/deal-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-muted/10">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  ),
})

export function MapWrapper() {
  return <DealMap />
} 