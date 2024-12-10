"use client"

import * as React from "react"
import { Tag, MapPin, Star, Search } from "lucide-react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DealCategory } from "@/types"

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
    deals,
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
          deals.map((deal) => (
            <div
              key={deal.id}
              className="p-4 rounded-lg border bg-card hover:bg-accent/10 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-semibold">{deal.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{deal.merchant.location.address}</span>
                    {deal.distance && (
                      <>
                        <span>•</span>
                        <span>{deal.distance.toFixed(1)} km</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{deal.merchant.rating}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">
                  {deal.price.currency} {deal.price.current}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {deal.price.currency} {deal.price.original}
                </span>
                <span className="text-sm font-medium text-green-600 ml-auto">
                  {deal.price.discount}% OFF
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
