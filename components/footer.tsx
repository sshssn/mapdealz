"use client"

import * as React from "react"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer className="w-full py-6">
      <div className="container mx-auto px-4 flex items-center justify-center">
        {/* Contained width for the footer content */}
        <div className="max-w-[400px] relative">
          {/* RGB Glow Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/30 via-pink-500/30 to-blue-500/30 rounded-full blur-xl animate-gradient-xy"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-pink-500/20 to-blue-500/20 rounded-full animate-pulse"></div>
          
          {/* Glass Container */}
          <motion.div 
            className="relative px-8 py-3 backdrop-blur-md bg-white/10 rounded-full border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm text-white/90 whitespace-nowrap">
              <span>Made in Oman</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" />
              <span>with by</span>
              <a 
                href="https://theaffinitylabs.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium bg-gradient-to-r from-violet-400 via-pink-300 to-blue-400 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
              >
                TheAffinityLabs
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
} 