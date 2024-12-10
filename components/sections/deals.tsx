"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Tag, ShoppingBag, Store } from "lucide-react"
import { MotionComponentProps } from "@/lib/motion-types"

const MotionDiv = motion.div as React.FC<MotionComponentProps<"div">>

interface Deal {
  name: string
  category: string
  discount: number
  original_price: number
  discounted_price: number
  url: string
  source: string
}

// Mock data for local development
const MOCK_DEALS = [
  {
    name: "Samsung 65-inch QLED TV",
    category: "Electronics",
    discount: 30,
    original_price: 999.99,
    discounted_price: 699.99,
    url: "https://oman.sharafdg.com/tv-deals",
    source: "Sharaf DG"
  },
  {
    name: "Apple iPhone 15 Pro",
    category: "Electronics",
    discount: 15,
    original_price: 499.99,
    discounted_price: 424.99,
    url: "https://amazon.ae/iphone",
    source: "Amazon UAE"
  },
  {
    name: "Nike Air Max 2024",
    category: "Fashion",
    discount: 40,
    original_price: 200,
    discounted_price: 120,
    url: "https://www.namshi.com/nike-deals",
    source: "Namshi"
  }
]

export function DealsSection() {
  const [deals, setDeals] = React.useState<Deal[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchDeals() {
      try {
        if (process.env.NODE_ENV === 'development') {
          // Use mock data in development
          setDeals(MOCK_DEALS)
        } else {
          // Use Netlify function in production
          const response = await fetch('/.netlify/functions/getDeals')
          const data = await response.json()
          setDeals(data.deals || [])
        }
      } catch (error) {
        console.error('Error fetching deals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Loading Deals...</h2>
        </div>
      </section>
    )
  }

  if (!deals.length) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">No Deals Found</h2>
          <p className="text-center text-muted-foreground">Check back later for amazing deals!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Top Deals
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <MotionDiv
              key={index}
              className="bg-background/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{deal.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{deal.source}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{deal.name}</h3>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {deal.discount}% OFF
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm line-through text-muted-foreground">
                    OMR {deal.original_price.toFixed(2)}
                  </div>
                  <div className="text-lg font-bold text-primary">
                    OMR {deal.discounted_price.toFixed(2)}
                  </div>
                </div>
              </div>
              
              <a
                href={deal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-lg py-2 hover:opacity-90 transition-opacity"
              >
                <ShoppingBag className="w-5 h-5" />
                View Deal
              </a>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
} 