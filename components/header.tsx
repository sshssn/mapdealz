import * as React from "react"
import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full z-50 backdrop-blur-md bg-background/80 border-b">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            Share Location
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
