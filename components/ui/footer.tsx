import * as React from "react"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative py-8 overflow-hidden bg-black">
      <div className="container relative">
        <div className="flex justify-center">
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative backdrop-blur-xl bg-white/10 rounded-full px-6 py-2 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:bg-white/20 transition-all duration-300">
              <p className="text-sm flex items-center gap-1">
                <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Made with
                </span>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  in Muscat, Oman by{' '}
                </span>
                <a 
                  href="https://theaffinitylabs.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gradient-to-r from-violet-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent font-semibold hover:opacity-80 transition-opacity"
                >
                  The Affinity Labs
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 