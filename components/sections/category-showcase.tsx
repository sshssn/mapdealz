"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const categories = [
  {
    id: "food",
    title: "Food & Drink",
    description: "Restaurants, Cafes, Bars & More",
    color: "from-orange-500/20 to-pink-500/20",
    deals: 234,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "activities",
    title: "Things to Do",
    description: "Activities, Events & Entertainment",
    color: "from-blue-500/20 to-purple-500/20",
    deals: 156,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "beauty",
    title: "Beauty & Spas",
    description: "Salons, Massage & Wellness",
    color: "from-pink-500/20 to-purple-500/20",
    deals: 189,
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "shopping",
    title: "Shopping",
    description: "Retail, Fashion & Local Stores",
    color: "from-green-500/20 to-blue-500/20",
    deals: 312,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60"
  }
]

export const CategoryShowcase = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">Popular Categories</h2>
          <p className="text-muted-foreground">
            Browse deals by category
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActiveIndex((prev) => Math.min(categories.length - 4, prev + 1))}
            disabled={activeIndex >= categories.length - 4}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.slice(activeIndex, activeIndex + 4).map((category, index) => (
          <motion.div
            key={category.id}
            className="group relative overflow-hidden rounded-2xl cursor-pointer h-[200px]"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute inset-0">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="relative p-6 flex flex-col h-full justify-end text-white">
              <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
              <p className="text-sm text-white/80 mb-4">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {category.deals} deals
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View All
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 