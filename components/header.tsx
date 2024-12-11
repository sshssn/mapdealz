"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { LanguageSwitch } from "@/components/language-switch"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const { dir } = useLanguage()

  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-background/80 border-b">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between" dir={dir()}>
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </header>
  )
}
