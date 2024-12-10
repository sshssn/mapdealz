"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/ui/logo"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "signin" | "signup"
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  const [currentMode, setCurrentMode] = React.useState<"signin" | "signup">(mode)

  const toggleMode = () => {
    setCurrentMode(currentMode === "signin" ? "signup" : "signin")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] h-[630px]">
        <DialogHeader className="space-y-4">
          <div className="mx-auto mb-6">
            <Logo className="scale-125" />
          </div>
          <DialogTitle className="text-2xl text-center">
            {currentMode === "signin" ? "Welcome back!" : "Create an account"}
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            {currentMode === "signin" 
              ? "Sign in to your account to continue"
              : "Sign up for a new account to get started"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {currentMode === "signup" && (
            <div className="space-y-3">
              <label className="text-sm font-medium">Full Name</label>
              <Input 
                type="text" 
                placeholder="John Doe"
                className="w-full"
              />
            </div>
          )}
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Email</label>
            <Input 
              type="email" 
              placeholder="you@example.com"
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••"
              className="w-full"
            />
          </div>

          <Button className="w-full bg-gradient-to-r from-primary via-purple-500 to-pink-600">
            {currentMode === "signin" ? "Sign In" : "Create Account"}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            {currentMode === "signin" ? (
              <>
                Don't have an account?{" "}
                <Button variant="link" className="p-0 hover:text-primary" onClick={toggleMode}>
                  Sign up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Button variant="link" className="p-0 hover:text-primary" onClick={toggleMode}>
                  Sign in
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 