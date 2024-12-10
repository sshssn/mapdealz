import * as React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/ui/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MapDealz - Find Local Deals Near You",
  description: "Discover amazing deals and discounts in your area. Save money while supporting local businesses.",
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en" className="dark bg-black" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-black overflow-x-hidden p-0 m-0")}>
        {children}
        <Footer />
      </body>
    </html>
  )
} 