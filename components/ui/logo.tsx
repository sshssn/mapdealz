"use client"

import * as React from "react"
import { MapPin, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { MotionComponentProps } from "@/lib/motion-types"

const MotionDiv = motion.div as React.FC<MotionComponentProps<"div">>
const MotionSpan = motion.span as React.FC<MotionComponentProps<"span">>

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <MotionDiv
      className={cn(
        "relative flex items-center gap-2",
        className
      )}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <MotionDiv
        className="relative"
        whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <MapPin className="w-8 h-8 text-primary" />
        <MotionDiv
          className="absolute -top-1 -right-1"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
        </MotionDiv>
      </MotionDiv>
      <MotionSpan
        className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-2xl"
        whileHover={{
          backgroundPosition: ["0%", "100%"],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundSize: "200% auto",
        }}
      >
        MapDealz
      </MotionSpan>
    </MotionDiv>
  )
}
