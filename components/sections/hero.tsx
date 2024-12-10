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
  Search
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
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Marquee Effect - Brought to front */}
      <div className="absolute top-[5vh] left-0 right-0 overflow-hidden border-b border-primary/10 z-20 bg-black/95">
        <div className="marquee-container relative flex py-3">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16">
            {marqueeItems.map((item, i) => (
              <span 
                key={i} 
                className="marquee-item px-6 py-3 text-sm font-semibold flex items-center gap-4 hover:scale-110 transition-transform duration-200"
              >
                <span className="w-6 h-6 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-500 rounded-lg p-1">
                  <item.icon className="w-full h-full text-white" />
                </span>
                <span className="bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500 text-transparent bg-clip-text whitespace-nowrap">
                  {item.text}
                </span>
              </span>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16">
            {marqueeItems.map((item, i) => (
              <span 
                key={`${i}-clone`} 
                className="marquee-item px-6 py-3 text-sm font-semibold flex items-center gap-4 hover:scale-110 transition-transform duration-200"
              >
                <span className="w-6 h-6 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-500 rounded-lg p-1">
                  <item.icon className="w-full h-full text-white" />
                </span>
                <span className="bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500 text-transparent bg-clip-text whitespace-nowrap">
                  {item.text}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/80 z-10" />
        <div className="relative w-full h-full transform scale-[0.7]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover"
          >
            <source src="/gradientback.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <MotionDiv
          className="max-w-3xl mx-auto text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <MotionH1
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-purple-500 to-pink-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Discover Amazing Deals{" "}
            <span className="text-primary">
              Near You
            </span>
          </MotionH1>
          
          <MotionDiv
            className="relative max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-600/5 rounded-2xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg">
              <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-500 to-orange-500 whitespace-nowrap overflow-hidden text-ellipsis">
                Find the best local deals and save money while supporting your community
              </p>
            </div>
          </MotionDiv>

          <MotionDiv
            className="flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for deals..."
                className="pl-9 pr-4 bg-background/50 backdrop-blur-sm border-primary/20"
              />
            </div>
            <div className="relative flex-1 w-full">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location..."
                className="pl-9 pr-4 bg-background/50 backdrop-blur-sm border-primary/20"
              />
            </div>
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-primary via-purple-500 to-pink-600 hover:from-primary/90 hover:via-purple-500/90 hover:to-pink-600/90"
            >
              Find Deals
            </Button>
          </MotionDiv>

          <MotionDiv
            className="flex items-center justify-center gap-8 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: "Active Deals", value: "2,500+" },
              { label: "Happy Users", value: "10,000+" },
              { label: "Local Businesses", value: "500+" }
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-600">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </MotionDiv>
        </MotionDiv>
      </div>
    </section>
  )
} 