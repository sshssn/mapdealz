import { Handler } from '@netlify/functions'
import axios from 'axios'

const MOCK_DEALS = [
  {
    name: "Samsung 65-inch QLED TV",
    category: "Electronics",
    discount: 30,
    original_price: 999.99,
    discounted_price: 699.99,
    url: "https://oman.sharafdg.com/tv-deals",
    source: "Sharaf DG",
    location: "Oman"
  },
  {
    name: "Apple iPhone 15 Pro",
    category: "Electronics",
    discount: 15,
    original_price: 499.99,
    discounted_price: 424.99,
    url: "https://amazon.ae/iphone",
    source: "Amazon UAE",
    location: "UAE"
  },
  {
    name: "Nike Air Max 2024",
    category: "Fashion",
    discount: 40,
    original_price: 200,
    discounted_price: 120,
    url: "https://www.namshi.com/nike-deals",
    source: "Namshi",
    location: "Oman"
  }
]

export const handler: Handler = async (event, context) => {
  try {
    // In a real application, you would fetch deals from your database or external API
    // For now, we'll return mock data
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deals: MOCK_DEALS
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch deals' })
    }
  }
} 