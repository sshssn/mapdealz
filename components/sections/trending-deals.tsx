"use client"

import * as React from "react"
import { Star, Clock } from "lucide-react"

const trendingDeals = [
  {
    id: "1",
    title: "iPhone 15 Pro Max",
    description: "Latest Apple flagship with titanium design",
    merchant: "SharafDG",
    originalPrice: 599.990,
    discountedPrice: 499.990,
    savings: 17,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800",
    rating: 4.8,
    reviews: 120,
    bought: 300,
    endingSoon: false,
    featured: true
  },
  {
    id: "2",
    title: "Nike Air Jordan",
    description: "Premium athletic sneakers for ultimate comfort",
    merchant: "Namshi",
    originalPrice: 89.990,
    discountedPrice: 69.990,
    savings: 22,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800",
    rating: 4.9,
    reviews: 150,
    bought: 200,
    endingSoon: true,
    featured: true
  },
  {
    id: "3",
    title: "Samsung 65\" QLED 4K TV",
    description: "Quantum HDR, Smart Hub, Gaming Features",
    merchant: "Noon",
    originalPrice: 999.990,
    discountedPrice: 799.990,
    savings: 20,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800",
    rating: 4.7,
    reviews: 300,
    bought: 500,
    endingSoon: false,
    featured: false
  },
  {
    id: "5",
    title: "Kindle Paperwhite",
    description: "6.8\" display, waterproof, 300 ppi, adjustable light",
    merchant: "Amazon",
    originalPrice: 149.990,
    discountedPrice: 119.990,
    savings: 20,
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?q=80&w=800",
    rating: 4.6,
    reviews: 180,
    bought: 150,
    endingSoon: false,
    featured: true
  },
  {
    id: "6",
    title: "MacBook Air M2",
    description: "13.6\" Liquid Retina, 8GB RAM, 256GB SSD",
    merchant: "SharafDG",
    originalPrice: 899.990,
    discountedPrice: 799.990,
    savings: 11,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800",
    rating: 4.9,
    reviews: 89,
    bought: 120,
    endingSoon: true,
    featured: false
  },
  {
    id: "7",
    title: "Adidas Ultra Boost",
    description: "Premium running shoes with Boost technology",
    merchant: "Namshi",
    originalPrice: 79.990,
    discountedPrice: 59.990,
    savings: 25,
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=800",
    rating: 4.7,
    reviews: 156,
    bought: 280,
    endingSoon: false,
    featured: true
  },
  {
    id: "8",
    title: "PlayStation 5",
    description: "Next-gen gaming console with DualSense controller",
    merchant: "Noon",
    originalPrice: 499.990,
    discountedPrice: 449.990,
    savings: 10,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=800",
    rating: 4.9,
    reviews: 342,
    bought: 500,
    endingSoon: true,
    featured: true
  },
  {
    id: "10",
    title: "Echo Show 10",
    description: "HD smart display with motion and Alexa",
    merchant: "Amazon",
    originalPrice: 249.990,
    discountedPrice: 199.990,
    savings: 20,
    image: "https://images.unsplash.com/photo-1512446816042-444d641267d4?q=80&w=800",
    rating: 4.8,
    reviews: 234,
    bought: 320,
    endingSoon: true,
    featured: true
  }
]

export const TrendingDeals = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {trendingDeals.map((deal) => (
        <div
          key={deal.id}
          className="group"
          role="article"
          aria-label={`Deal for ${deal.title}`}
        >
          <div className="relative backdrop-blur-md bg-white/10 rounded-2xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 h-[400px] flex flex-col">
            <div className="relative h-48">
              <div className="absolute inset-0">
                <img
                  src={deal.image}
                  alt={`Product image for ${deal.title}`}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute top-4 left-4 flex gap-2">
                {deal.featured && (
                  <div className="backdrop-blur-md bg-white/20 px-3 py-1 rounded-full border border-white/20">
                    <span className="text-xs font-medium text-white">Featured</span>
                  </div>
                )}
                {deal.endingSoon && (
                  <div className="backdrop-blur-md bg-white/20 px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-white" />
                    <span className="text-xs font-medium text-white">Ending Soon</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-base text-white/90 line-clamp-1">{deal.title}</h3>
                  <p className="text-xs text-white/60 line-clamp-2 mt-1 min-h-[32px]">
                    {deal.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    {deal.rating}
                  </div>
                  <span>•</span>
                  <div>{deal.reviews} reviews</div>
                  <span>•</span>
                  <div>{deal.bought}+ bought</div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-white">
                      OMR {deal.discountedPrice.toFixed(3)}
                    </div>
                    <div className="text-xs text-white/60 flex items-center gap-2">
                      <span className="line-through">OMR {deal.originalPrice.toFixed(3)}</span>
                      <div className="backdrop-blur-md bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                        <span className="text-[10px] font-medium text-green-400">{deal.savings}% OFF</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="backdrop-blur-md bg-violet-500 hover:bg-violet-600 px-4 py-2 rounded-full text-white font-medium transition-colors shadow-lg border border-violet-400/20"
                    aria-label={`View deal for ${deal.title}`}
                  >
                    View Deal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 