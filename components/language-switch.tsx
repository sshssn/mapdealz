"use client"

import * as React from "react"
import { Languages } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function LanguageSwitch() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { language, setLanguage, dir } = useLanguage()

  const handleLanguageChange = (newLang: "en" | "ar") => {
    setLanguage(newLang)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setIsOpen(false)
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  return (
    <div className="relative">
      {/* Language Switcher Button */}
      <button
        className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <div className="flex items-center gap-2" dir={dir()}>
          <Languages className="w-4 h-4" />
          <span className="text-sm font-medium">
            {language === "en" ? "English" : "العربية"}
          </span>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full mt-2 w-36",
            dir() === "rtl" ? "right-0" : "left-0"
          )}
        >
          {/* Glassmorphism Dropdown */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl overflow-hidden shadow-lg">
            <div className="p-1">
              {/* English Option */}
              <button
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                  language === "en"
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:bg-white/10"
                )}
                onClick={() => handleLanguageChange("en")}
              >
                <span className="text-sm">English</span>
              </button>

              {/* Arabic Option */}
              <button
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-right",
                  language === "ar"
                    ? "bg-white/20 text-white"
                    : "text-white/60 hover:bg-white/10"
                )}
                onClick={() => handleLanguageChange("ar")}
              >
                <span className="text-sm">العربية</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 