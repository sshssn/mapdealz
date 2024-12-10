import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Deal, DealCategory, Store } from '@/types'
import { calculateDistance } from '@/lib/utils'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

// This would be replaced with actual API calls in production
const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    title: '50% Off Pizza Margherita',
    description: 'Authentic Italian pizza with fresh mozzarella and basil',
    price: {
      current: 9.99,
      original: 19.99,
      currency: 'OMR',
      discount: 50,
    },
    merchant: {
      location: {
        address: '123 Main St, San Francisco, USA'
      },
      rating: 4.5
    },
    category: DealCategory.FOOD_DRINK,
    coordinates: {
      lat: 37.7858,
      lng: -122.4064,
    },
    image: '/images/deals/pizza-thumb.jpg',
    store: 'Carrefour' as Store,
    url: '/deals/pizza-margherita',
    storeLogo: '/logos/carrefour.png'
  },
  {
    id: '2',
    title: '30% Off All Clothing',
    description: 'Seasonal clearance sale on all clothing items',
    price: {
      current: 69.99,
      original: 99.99,
      currency: 'OMR',
      discount: 30,
    },
    merchant: {
      location: {
        address: '456 Market St, San Francisco, USA'
      },
      rating: 4.2
    },
    category: DealCategory.SHOPPING,
    coordinates: {
      lat: 37.7868,
      lng: -122.4074,
    },
    image: '/images/deals/fashion-thumb.jpg',
    store: 'Namshi' as Store,
    url: '/deals/clothing-sale',
    storeLogo: '/logos/namshi.png'
  },
]

async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lng = parseFloat(searchParams.get('lng') || '0')

  let filteredDeals = [...MOCK_DEALS]

  if (category) {
    filteredDeals = filteredDeals.filter(deal => deal.category === category)
  }

  // Calculate distance for each deal
  filteredDeals = filteredDeals.map(deal => ({
    ...deal,
    distance: calculateDistance(lat, lng, deal.coordinates.lat, deal.coordinates.lng)
  }))

  // Sort by distance
  filteredDeals.sort((a, b) => (a.distance || 0) - (b.distance || 0))

  return NextResponse.json(filteredDeals)
}

export const GET = handler