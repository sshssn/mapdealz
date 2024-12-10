"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Languages } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <motion.button
        className="relative px-3 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4" />
          <span className="text-sm font-medium">
            {language === "en" ? "English" : "العربية"}
          </span>
        </div>

        {/* RGB Glow Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600/30 via-pink-500/30 to-blue-500/30 rounded-full blur-xl animate-pulse"></div>
      </motion.button>

      {/* Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full right-0 mt-2 w-36"
        >
          {/* Glassmorphism Dropdown */}
          <div className="relative p-1 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
            {/* RGB Glow Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-600/20 via-pink-500/20 to-blue-500/20 rounded-lg blur-lg"></div>

            {/* Options */}
            <button
              className={cn(
                "w-full px-3 py-2 text-sm rounded-md transition-colors",
                language === "en" ? "bg-white/20" : "hover:bg-white/10"
              )}
              onClick={() => toggleLanguage()}
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              English
            </button>
            <button
              className={cn(
                "w-full px-3 py-2 text-sm rounded-md transition-colors",
                language === "ar" ? "bg-white/20" : "hover:bg-white/10"
              )}
              onClick={() => toggleLanguage()}
              dir="rtl"
            >
              العربية
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
} 