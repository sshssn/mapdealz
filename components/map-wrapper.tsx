"use client"

import dynamic from "next/dynamic"
import { useStore } from "@/lib/store"

const DealMap = dynamic(() => import("@/components/deal-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center">
      <div className="text-muted-foreground">Loading map...</div>
    </div>
  ),
})

export function MapWrapper() {
  const { deals = [] } = useStore()

  return <DealMap deals={deals} />
} 