"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ar'

interface Translations {
  [key: string]: {
    en: string
    ar: string
  }
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.deals': { en: 'Deals', ar: 'العروض' },
  'nav.categories': { en: 'Categories', ar: 'الفئات' },
  'nav.about': { en: 'About', ar: 'عن التطبيق' },
  'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'nav.signin': { en: 'Sign In', ar: 'تسجيل الدخول' },
  'nav.signup': { en: 'Sign Up', ar: 'إنشاء حساب' },
  
  // Categories
  'category.food': { en: 'Food & Drink', ar: 'المأكولات والمشروبات' },
  'category.shopping': { en: 'Shopping', ar: 'التسوق' },
  'category.beauty': { en: 'Beauty & Spa', ar: 'الجمال والسبا' },
  'category.activities': { en: 'Activities', ar: 'الأنشطة' },
  'category.travel': { en: 'Travel', ar: 'السفر' },
  'category.services': { en: 'Services', ar: 'الخدمات' },
  'category.health': { en: 'Health & Fitness', ar: 'الصحة واللياقة' },
  'category.entertainment': { en: 'Entertainment', ar: 'الترفيه' },

  // Buttons
  'button.viewDeal': { en: 'View Deal', ar: 'عرض العرض' },
  'button.findDeals': { en: 'Find Deals', ar: 'ابحث عن العروض' },
  'button.search': { en: 'Search', ar: 'بحث' },
  'button.filter': { en: 'Filter', ar: 'تصفية' },
  'button.apply': { en: 'Apply', ar: 'تطبيق' },
  'button.clear': { en: 'Clear', ar: 'مسح' },

  // Hero Section
  'hero.title': { en: 'Discover Amazing Deals', ar: 'اكتشف عروضاً مذهلة' },
  'hero.subtitle': { en: 'Near You', ar: 'بالقرب منك' },
  'hero.description': { 
    en: 'Find the best local deals and save money while supporting your community',
    ar: 'اعثر على أفضل العروض المحلية ووفر المال مع دعم مجتمعك'
  },
  'hero.searchPlaceholder': { en: 'Search for deals...', ar: 'ابحث عن العروض...' },
  'hero.locationPlaceholder': { en: 'Enter your location...', ar: 'أدخل موقعك...' },

  // Stats
  'stats.activeDeals': { en: 'Active Deals', ar: 'العروض النشطة' },
  'stats.happyUsers': { en: 'Happy Users', ar: 'المستخدمون السعداء' },
  'stats.localBusinesses': { en: 'Local Businesses', ar: 'الشركات المحلية' },

  // Features
  'features.title': { en: 'Why Choose MapDealz?', ar: 'لماذا تختار MapDealz؟' },
  'features.location': { en: 'Location-Based', ar: 'خدمة مبنية على الموقع' },
  'features.locationDesc': { 
    en: 'Find the best deals near you instantly',
    ar: 'اعثر على أفضل العروض بالقرب منك فوراً'
  },
  'features.updates': { en: 'Real-Time Updates', ar: 'تحديثات فورية' },
  'features.updatesDesc': {
    en: 'Latest deals updated continuously',
    ar: 'أحدث العروض يتم تحديثها باستمرار'
  },
  'features.navigation': { en: 'Smart Navigation', ar: 'تنقل ذكي' },
  'features.navigationDesc': {
    en: 'Easy directions to your chosen deals',
    ar: 'اتجاهات سهلة للعروض التي تختارها'
  },

  // Footer
  'footer.made': { en: 'Made in Oman with', ar: 'صنع في عمان مع' },
  'footer.by': { en: 'by', ar: 'بواسطة' },
  'footer.rights': { en: 'All rights reserved', ar: 'جميع الحقوق محفوظة' },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: () => 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  const dir = (): 'ltr' | 'rtl' => language === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 