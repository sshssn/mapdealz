import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/hero"
import { CategoryShowcase } from "@/components/sections/category-showcase"
import { TrendingDeals } from "@/components/sections/trending-deals"
import { DealMap } from "@/components/map/deal-map"
import { DealsSection } from "@/components/sections/deals"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col pt-16">
        {/* Hero Section */}
        <Hero />
        
        {/* Category Showcase */}
        <section className="container px-4 py-12">
          <CategoryShowcase />
        </section>

        {/* Trending Deals */}
        <section className="bg-accent/30 py-16">
          <div className="container px-4">
            <TrendingDeals />
          </div>
        </section>

        {/* Map and Deals */}
        <section className="container px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Deals Near You</h2>
              </div>
              <div className="grid gap-4">
                {/* Deals will be listed here */}
              </div>
            </div>
            <div className="lg:sticky lg:top-24 h-[calc(100vh-6rem)]">
              <div className="w-full h-full rounded-2xl bg-accent/30 flex items-center justify-center">
                Map Coming Soon
              </div>
            </div>
          </div>
        </section>

        <DealsSection />
      </main>
    </>
  )
}
