"use client"

import * as React from "react"
import { Tag, MapPin, Star, Search } from "lucide-react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DealCategory, Deal } from "@/types"
import DealMap from "@/components/deal-map"
import { DealCard } from "@/components/deal-card"

const CATEGORIES = [
  { id: DealCategory.FOOD_DRINK, label: "Food & Drink" },
  { id: DealCategory.SHOPPING, label: "Shopping" },
  { id: DealCategory.BEAUTY_SPA, label: "Beauty & Spa" },
  { id: DealCategory.ACTIVITIES, label: "Activities" },
  { id: DealCategory.TRAVEL, label: "Travel" },
  { id: DealCategory.SERVICES, label: "Services" },
  { id: DealCategory.HEALTH_FITNESS, label: "Health & Fitness" },
  { id: DealCategory.ENTERTAINMENT, label: "Entertainment" },
]

export const DealsList: React.FC = () => {
  const {
    deals = [],
    userLocation,
    loading,
    error,
    searchQuery,
    filter,
    setSearchQuery,
    setFilter,
    searchDeals,
    fetchNearbyDeals,
    fetchDealsByCategory,
  } = useStore()

  const [selectedCategory, setSelectedCategory] = React.useState<DealCategory | null>(null)

  React.useEffect(() => {
    if (userLocation) {
      fetchNearbyDeals(filter.distance)
    }
  }, [userLocation, filter.distance, fetchNearbyDeals])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      searchDeals(searchQuery)
    }
  }

  const handleCategorySelect = (category: DealCategory) => {
    setSelectedCategory(category)
    fetchDealsByCategory(category)
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
        {error}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <MapPin className="h-6 w-6 text-blue-500" />
          <div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Deals Near You
            </span>
            <p className="text-sm font-normal text-muted-foreground mt-1">
              Discover the best local deals in your area
            </p>
          </div>
        </h2>
      </div>

      <section className="relative">
        <DealMap deals={deals} />
      </section>

      <form onSubmit={handleSearch} className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="search"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategorySelect(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-muted rounded-lg p-4 h-32" />
            ))}
          </div>
        ) : deals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No deals found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
