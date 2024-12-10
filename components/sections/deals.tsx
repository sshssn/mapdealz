"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Tag, ShoppingBag, Store } from "lucide-react"
import { MotionComponentProps } from "@/lib/motion-types"

const MotionDiv = motion.div as React.FC<MotionComponentProps<"div">>

interface Deal {
  id: string;
  title: string;
  description: string;
  category: string;
  discount: number;
  original_price: number;
  discounted_price: number;
  url: string;
  source: string;
}

// Mock data for local development
const MOCK_DEALS = [
  {
    id: "1",
    title: "Samsung 65-inch QLED TV",
    description: "4K Ultra HD Smart TV with HDR",
    category: "Electronics",
    discount: 30,
    original_price: 999.99,
    discounted_price: 699.99,
    url: "https://oman.sharafdg.com/tv-deals",
    source: "Sharaf DG"
  },
  {
    id: "2",
    title: "Apple iPhone 15 Pro",
    description: "The latest iPhone with advanced features",
    category: "Electronics",
    discount: 15,
    original_price: 499.99,
    discounted_price: 424.99,
    url: "https://amazon.ae/iphone",
    source: "Amazon UAE"
  },
  {
    id: "3",
    title: "Nike Air Max 2024",
    description: "The iconic Air Max shoe with a modern twist",
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
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Top Deals
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {deals.map((deal) => (
            <div key={deal.id} className="flex flex-col h-full">
              <div className="flex-1 bg-background/50 backdrop-blur-sm rounded-2xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold">{deal.title}</h3>
                <p className="text-sm md:text-base">{deal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 