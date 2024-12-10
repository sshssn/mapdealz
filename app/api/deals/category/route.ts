import { NextResponse } from 'next/server'
import { Deal, DealCategory, Store } from '@/types'
import { calculateDistance } from '@/lib/utils'

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
      id: 'pizza-express',
      name: 'Pizza Express',
      rating: 4.5,
      location: {
        address: '123 Main St, San Francisco, USA',
        coordinates: {
          lat: 37.7858,
          lng: -122.4064
        }
      }
    },
    category: DealCategory.FOOD_DRINK,
    coordinates: {
      lat: 37.7858,
      lng: -122.4064,
    },
    image: '/images/deals/pizza-thumb.jpg',
    store: 'Carrefour' as Store
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
      id: 'fashion-store',
      name: 'Fashion Store',
      rating: 4.2,
      location: {
        address: '456 Market St, San Francisco, USA',
        coordinates: {
          lat: 37.7868,
          lng: -122.4074
        }
      }
    },
    category: DealCategory.SHOPPING,
    coordinates: {
      lat: 37.7868,
      lng: -122.4074,
    },
    image: '/images/deals/fashion-thumb.jpg',
    store: 'Namshi' as Store
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category') as DealCategory
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lng = parseFloat(searchParams.get('lng') || '0')

  try {
    // In production, this would fetch from real APIs
    const filteredDeals = MOCK_DEALS
      .filter(deal => deal.category === category)
      .map(deal => ({
        ...deal,
        distance: lat && lng ? calculateDistance(
          lat,
          lng,
          deal.coordinates.lat,
          deal.coordinates.lng
        ) : undefined,
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0))

    return NextResponse.json(filteredDeals)
  } catch (error) {
    console.error('Error fetching deals by category:', error)
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 })
  }
} 