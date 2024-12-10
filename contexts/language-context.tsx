"use client"

import * as React from "react"

type Language = "en" | "ar"
type Direction = "ltr" | "rtl"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  dir: Direction
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>("en")

  const value = React.useMemo(() => ({
    language,
    setLanguage,
    dir: (language === "ar" ? "rtl" : "ltr") as Direction
  }), [language])

  // Update document direction when language changes
  React.useEffect(() => {
    document.documentElement.dir = value.dir
    document.documentElement.lang = language
  }, [language, value.dir])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 