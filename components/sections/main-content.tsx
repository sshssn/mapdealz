"use client"

import { useEffect, useState } from "react"
import { Hero } from "@/components/sections/hero"
import { TrendingDeals } from "@/components/sections/trending-deals"
import { MapWrapper } from "@/components/map-wrapper"
import { BackToTopButton } from "@/components/ui/back-to-top"
import { MapPin, Search, Compass } from "lucide-react"

interface MainContentProps {
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

export function MainContent({ deals }: MainContentProps) {
  return (
    <main className="min-h-screen bg-background pt-16">
      <Hero />
      
      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-8">
          {/* Map Column - Shows first on mobile */}
          <div className="lg:order-2">
            <div className="sticky top-24 space-y-6">
              {/* Map Container with Glow Effect */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 via-cyan-500/30 to-purple-500/30 rounded-[2rem] blur-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-cyan-500/20 to-purple-500/20 rounded-2xl"></div>
                <div className="absolute -inset-[2px] bg-gradient-to-r from-violet-500/20 via-cyan-400/20 to-purple-400/20 rounded-2xl blur-lg"></div>
                
                <div className="relative h-[500px] md:h-[700px] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 backdrop-blur-md bg-black/50 border border-white/10"></div>
                  <div className="relative w-full h-full">
                    <MapWrapper />
                  </div>
                </div>
              </div>

              {/* Features Checklist */}
              <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-white/20">
                <h2 className="text-xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4">
                  Why Choose MapDealz?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                      <MapPin className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white/90">Location-Based</h3>
                      <p className="text-sm text-white/60">Find the best deals near you instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                      <Search className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white/90">Real-Time Updates</h3>
                      <p className="text-sm text-white/60">Latest deals updated continuously</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                      <Compass className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white/90">Smart Navigation</h3>
                      <p className="text-sm text-white/60">Easy directions to your chosen deals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deals Column */}
          <div className="lg:order-1">
            <TrendingDeals />
          </div>
        </div>
      </div>

      <BackToTopButton />
    </main>
  )
} 