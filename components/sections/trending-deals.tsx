"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Flame, Star, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MotionComponentProps } from "@/lib/motion-types"

const MotionDiv = motion.div as React.FC<MotionComponentProps<"div">>

const trendingDeals = [
  {
    id: "1",
    title: "Luxury Spa Day Package",
    description: "Full day of pampering with massage, facial, and more",
    merchant: "Serenity Spa & Wellness",
    originalPrice: 299,
    discountedPrice: 149,
    savings: 50,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=60",
    rating: 4.8,
    reviews: 234,
    bought: 1543,
    endingSoon: true,
    featured: true
  },
  {
    id: "2",
    title: "Fine Dining Experience",
    description: "5-course tasting menu at Michelin-starred restaurant",
    merchant: "Le Petit Bistro",
    originalPrice: 200,
    discountedPrice: 120,
    savings: 40,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=60",
    rating: 4.9,
    reviews: 189,
    bought: 892,
    endingSoon: false,
    featured: true
  },
  {
    id: "3",
    title: "Adventure Park All-Day Pass",
    description: "Access to all rides and attractions",
    merchant: "Thrill Zone Adventures",
    originalPrice: 89,
    discountedPrice: 45,
    savings: 49,
    image: "https://images.unsplash.com/photo-1536768139911-e290a59011e4?w=800&auto=format&fit=crop&q=60",
    rating: 4.7,
    reviews: 567,
    bought: 2341,
    endingSoon: true,
    featured: false
  }
]

export const TrendingDeals = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Flame className="w-8 h-8 text-orange-500" />
            Trending Now
          </h2>
          <p className="text-muted-foreground">
            Hot deals that are flying off the shelves
          </p>
        </div>
        <Button variant="ghost" className="gap-2">
          View All <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingDeals.map((deal, index) => (
          <MotionDiv
            key={deal.id}
            className="group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="bg-background rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute top-4 left-4 flex gap-2">
                  {deal.featured && (
                    <Badge variant="default" className="bg-primary">
                      Featured
                    </Badge>
                  )}
                  {deal.endingSoon && (
                    <Badge variant="secondary" className="gap-1">
                      <Clock className="w-3 h-3" /> Ending Soon
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{deal.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                    {deal.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {deal.rating}
                  </div>
                  <span>•</span>
                  <div>{deal.reviews} reviews</div>
                  <span>•</span>
                  <div>{deal.bought}+ bought</div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="text-2xl font-bold">
                      ${deal.discountedPrice}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="line-through">${deal.originalPrice}</span>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                        {deal.savings}% OFF
                      </Badge>
                    </div>
                  </div>
                  <Button className="rounded-full">
                    View Deal
                  </Button>
                </div>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  )
} 