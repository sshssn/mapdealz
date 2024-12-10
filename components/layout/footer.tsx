"use client"

import Link from "next/link"
import { 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube
} from "lucide-react"
import { Logo } from "@/components/ui/logo"

export function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="relative container px-4 pt-16">
        {/* Grid layout for footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-16">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground">
              Discover amazing deals and discounts in your area. Save money while supporting local businesses.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="/press" className="text-muted-foreground hover:text-foreground">Press</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link href="/safety" className="text-muted-foreground hover:text-foreground">Safety Center</Link></li>
              <li><Link href="/guidelines" className="text-muted-foreground hover:text-foreground">Community Guidelines</Link></li>
              <li><Link href="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@mapdealz.com" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@mapdealz.com
                </a>
              </li>
              <li>
                <a href="tel:+9681234567" className="text-muted-foreground hover:text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +968 1234 5678
                </a>
              </li>
              <li>
                <div className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Muscat, Oman
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
} 