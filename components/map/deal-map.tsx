"use client"

import dynamic from "next/dynamic"

interface DealMapProps {
  deals: Array<{
    id: string
    title: string
    description: string
    category: string
    store: string
    location: [number, number]
    image: string
    price: number
    originalPrice: number
  }>
}

// Explicitly type the dynamic import
const DynamicMap = dynamic<DealMapProps>(() => 
  import("./leaflet-map").then((mod) => {
    const { default: Component } = mod
    return Component
  }),
  {
    ssr: false,
    loading: () => (
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-600/30 blur-3xl animate-gradient-xy" />
        <div className="relative w-full h-full backdrop-blur-xl bg-background/50 rounded-2xl p-1">
          <div className="w-full h-full bg-card rounded-2xl animate-pulse" />
        </div>
      </div>
    ),
  }
)

export function DealMap({ deals }: DealMapProps) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Glowing background effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-600/30 blur-3xl animate-gradient-xy" />
      
      {/* Frosted glass container */}
      <div className="relative w-full h-full backdrop-blur-xl bg-background/50 rounded-2xl p-1">
        <DynamicMap deals={deals} />
      </div>
    </div>
  )
} 