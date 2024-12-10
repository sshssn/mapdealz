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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col bg-black">
      {/* Hero Section */}
      <Hero />
      
      {/* Map and Deals */}
      <section className="relative py-16 overflow-hidden bg-black">
        {/* Add loading state */}
        {loading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {/* Add error handling */}
        {error && (
          <div className="container relative px-4 py-8">
            <div className="bg-destructive/10 text-destructive rounded-lg p-4">
              {error}
            </div>
          </div>
        )}
        
        <div className="container relative px-4">
          {/* Section Header */}
          <div className="flex justify-center mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/30 via-cyan-500/30 to-purple-500/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl py-3 px-5 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 transition-all duration-300">
                <div className="text-center whitespace-nowrap">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                    Deals Near You
                  </h2>
                  <p className="text-sm text-white/90 font-medium mt-1">
                    Discover the best local deals in your area
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-12">
            {/* Products Column */}
            <div className="space-y-8">
              <TrendingDeals />
            </div>

            {/* Map Column */}
            <div className="relative">
              <div className="sticky top-24 h-[calc(100vh-12rem)]">
                {/* Keep the glow effects only around the map */}
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 via-cyan-500/30 to-purple-500/30 rounded-[2rem] blur-xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-cyan-500/20 to-purple-500/20 rounded-2xl animate-gradient-xy"></div>
                <div className="absolute -inset-[2px] bg-gradient-to-r from-violet-500/20 via-cyan-400/20 to-purple-400/20 rounded-2xl blur-lg animate-glow"></div>
                
                <div className="relative h-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                  {/* Map container */}
                  <div className="absolute inset-0">
                    <div className="relative w-full h-full">
                      <MapWrapper />
                    </div>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="mt-12 backdrop-blur-md bg-white/5 rounded-2xl p-8 border border-white/20">
                  {/* Section Header */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                      Why Choose MapDealz?
                    </h2>
                    <p className="text-white/60 mt-2">
                      Discover how we're revolutionizing your shopping experience
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Feature 1 */}
                    <div className="flex items-start gap-4 group">
                      <div className="relative mt-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                          <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white/90">Real-Time Deal Updates</h3>
                        <p className="text-sm text-white/60 mt-1">Instantly discover the latest deals and offers from your favorite stores, updated in real-time.</p>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-4 group">
                      <div className="relative mt-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white/90">Location-Based Discovery</h3>
                        <p className="text-sm text-white/60 mt-1">Find the best deals near you with our smart location-based recommendations system.</p>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start gap-4 group">
                      <div className="relative mt-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white/90">Smart Price Comparison</h3>
                        <p className="text-sm text-white/60 mt-1">Compare prices across multiple stores to ensure you get the best value for your money.</p>
                      </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex items-start gap-4 group">
                      <div className="relative mt-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                          <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white/90">Instant Notifications</h3>
                        <p className="text-sm text-white/60 mt-1">Get notified instantly when new deals matching your interests become available.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <BackToTopButton />
        </div>
      </section>
    </main>
  )
} 