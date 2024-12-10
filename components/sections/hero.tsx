"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Sparkles, 
  Gem, 
  HandHeart, 
  Star, 
  MapPin, 
  Gift, 
  Crown, 
  Flame,
  Search,
  ShoppingBag,
  Navigation
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MotionComponentProps } from "@/lib/motion-types"

const MotionDiv = motion.div as React.FC<MotionComponentProps<"div">>
const MotionH1 = motion.h1 as React.FC<MotionComponentProps<"h1">>

const marqueeItems = [
  { text: "Best Deals Near You", icon: Sparkles },
  { text: "Save Money Daily", icon: Gem },
  { text: "Support Local Business", icon: HandHeart },
  { text: "Exclusive Offers", icon: Star },
  { text: "Location-Based Deals", icon: MapPin },
  { text: "Daily Rewards", icon: Gift },
  { text: "Premium Discounts", icon: Crown },
  { text: "Hot Deals Alert", icon: Flame }
]

export function Hero() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-[90%] md:max-w-[80%] mx-auto text-center space-y-8">
          <MotionH1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 via-pink-300 to-blue-400 text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Amazing Deals Near You
          </MotionH1>

          <MotionDiv
            className="text-lg md:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find the best local deals, discounts, and offers in your area
          </MotionDiv>

          {/* Search Bar */}
          <MotionDiv
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-pink-500/30 to-blue-500/30 rounded-full blur-xl"></div>
              <div className="relative flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="text"
                    placeholder="Search for deals..."
                    className="w-full pl-10 bg-background/50 backdrop-blur-sm border-white/10"
                  />
                </div>
                <Button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20">
                  <Navigation className="w-4 h-4 mr-2" />
                  Near Me
                </Button>
              </div>
            </div>
          </MotionDiv>

          {/* Stats */}
          <MotionDiv
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-1 backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl md:text-3xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Active Deals</div>
            </div>
            <div className="space-y-1 backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl md:text-3xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Local Stores</div>
            </div>
            <div className="space-y-1 backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl md:text-3xl font-bold">10k+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="space-y-1 backdrop-blur-sm bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-2xl md:text-3xl font-bold">30%</div>
              <div className="text-sm text-muted-foreground">Avg. Savings</div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  )
} 