"use client"

import * as React from "react"
import { MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const { userLocation, deals, searchDeals } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      // In production, this would call an actual AI API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateResponse(input, deals),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // If the message contains a search intent, perform the search
      if (input.toLowerCase().includes("find") || input.toLowerCase().includes("search")) {
        const searchTerm = input.toLowerCase().replace(/find|search|for/g, "").trim()
        searchDeals(searchTerm)
      }
    } catch (error) {
      console.error("Error processing message:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 rounded-lg border bg-card shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="font-semibold">Deal Assistant</h3>
              <p className="text-sm text-muted-foreground">Ask me about deals and recommendations!</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-80 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Ask about deals..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
      <Button
        variant="outline"
        size="icon"
        className="ml-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
    </div>
  )
}

function generateResponse(input: string, deals: any[]): string {
  const lowercaseInput = input.toLowerCase()
  
  if (lowercaseInput.includes("recommend") || lowercaseInput.includes("suggest")) {
    if (deals.length === 0) {
      return "I don't see any deals in your area yet. Try sharing your location or searching for specific deals!"
    }
    const topDeal = deals.sort((a, b) => b.merchant.rating - a.merchant.rating)[0]
    return `I recommend checking out ${topDeal.title} at ${topDeal.merchant.name}. They have a ${topDeal.price.discount}% discount, and their rating is ${topDeal.merchant.rating}!`
  }

  if (lowercaseInput.includes("best deal") || lowercaseInput.includes("biggest discount")) {
    if (deals.length === 0) {
      return "I don't have any deals to compare right now. Try searching for deals first!"
    }
    const bestDeal = deals.sort((a, b) => b.price.discount - a.price.discount)[0]
    return `The best discount I can find is ${bestDeal.price.discount}% off at ${bestDeal.merchant.name} for ${bestDeal.title}.`
  }

  if (lowercaseInput.includes("how many") || lowercaseInput.includes("number of deals")) {
    return `I can see ${deals.length} deals in your area right now.`
  }

  return "I can help you find deals, make recommendations, or tell you about the best discounts available. What would you like to know?"
}
