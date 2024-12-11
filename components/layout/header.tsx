"use client"

import * as React from "react"
import Link from "next/link"
import { 
  Menu, 
  Utensils, 
  Ticket, 
  Sparkles, 
  ShoppingBag,
  LogIn,
  UserPlus,
  X,
  Globe 
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useScrollPosition } from "@/hooks/use-scroll-position"
import { Logo } from "@/components/ui/logo"
import { AuthModal } from "@/components/auth/auth-modal"
import { MotionComponentProps } from "@/lib/motion-types"
import { useLanguage } from "@/contexts/language-context"

const MotionDiv = motion.div as React.FC<MotionComponentProps<"div">>

const categories = [
  {
    key: 'category.food',
    href: "/category/food-drink",
    icon: Utensils
  },
  {
    key: 'category.activities',
    href: "/category/activities",
    icon: Ticket
  },
  {
    key: 'category.beauty',
    href: "/category/beauty",
    icon: Sparkles
  },
  {
    key: 'category.shopping',
    href: "/category/shopping",
    icon: ShoppingBag
  }
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [authMode, setAuthMode] = React.useState<"signin" | "signup" | null>(null)
  const scrollPosition = useScrollPosition()
  const isScrolled = scrollPosition > 0
  const { language, setLanguage, t, dir } = useLanguage()

  const openSignIn = () => setAuthMode("signin")
  const openSignUp = () => setAuthMode("signup")
  const closeAuth = () => setAuthMode(null)
  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en")

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4">
        <MotionDiv
          className={cn(
            "max-w-5xl w-full rounded-full border px-4",
            "transition-all duration-200",
            isScrolled 
              ? "bg-background/80 backdrop-blur-lg shadow-lg" 
              : "bg-background/50 backdrop-blur-sm"
          )}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <div className="flex h-14 items-center justify-between" dir={dir()}>
            <div className="flex items-center gap-8">
              <Logo />
              <nav className="hidden lg:flex items-center gap-6">
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <category.icon className="w-4 h-4" />
                    {t(category.key)}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-2"
                onClick={toggleLanguage}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === "en" ? "العربية" : "English"}</span>
              </Button>

              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={openSignIn}>
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('nav.signin')}
                </Button>
                <Button size="sm" onClick={openSignUp}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t('nav.signup')}
                </Button>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </MotionDiv>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className={cn(
                "fixed inset-x-4 top-24 p-4 rounded-2xl border bg-background/80 backdrop-blur-lg shadow-lg",
                "lg:hidden"
              )}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              dir={dir()}
            >
              <nav className="flex flex-col gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <category.icon className="w-4 h-4" />
                    {t(category.key)}
                  </Link>
                ))}
                <hr className="my-2" />
                <Button variant="ghost" size="sm" className="justify-start gap-2" onClick={toggleLanguage}>
                  <Globe className="w-4 h-4" />
                  {language === "en" ? "العربية" : "English"}
                </Button>
                <Button variant="ghost" size="sm" className="justify-start gap-2" onClick={openSignIn}>
                  <LogIn className="w-4 h-4" />
                  {t('nav.signin')}
                </Button>
                <Button size="sm" className="justify-start gap-2" onClick={openSignUp}>
                  <UserPlus className="w-4 h-4" />
                  {t('nav.signup')}
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal */}
      {authMode && (
        <AuthModal
          isOpen={true}
          onClose={closeAuth}
          mode={authMode}
        />
      )}
    </>
  )
} 