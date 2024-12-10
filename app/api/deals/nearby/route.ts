import { NextResponse } from 'next/server'
import { Deal, DealCategory } from '@/types'
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
      discount: 50,
      currency: 'USD'
    },
    merchant: {
      id: 'pizza-express',
      name: 'Pizza Express',
      rating: 4.5,
      location: {
        address: '123 Main St, San Francisco, CA',
        coordinates: {
          lat: 37.7858,
          lng: -122.4064
        }
      }
    },
    category: DealCategory.FOOD,
    coordinates: {
      lat: 37.7858,
      lng: -122.4064
    },
    imageUrl: '/images/deals/pizza.jpg'
  }
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lng = parseFloat(searchParams.get('lng') || '0')
  const radius = parseInt(searchParams.get('radius') || '10')

  try {
    // In production, this would fetch from real APIs
    const nearbyDeals = MOCK_DEALS.map(deal => ({
      ...deal,
      coordinates: {
        lat: lat + (Math.random() - 0.5) * 0.02, // Random offset within ~1km
        lng: lng + (Math.random() - 0.5) * 0.02,
      },
      distance: calculateDistance(
        lat,
        lng,
        deal.coordinates.lat,
        deal.coordinates.lng
      )
    })).filter(deal => deal.distance <= radius)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))

    return NextResponse.json(nearbyDeals)
  } catch (error) {
    console.error('Error fetching nearby deals:', error)
    return NextResponse.json({ error: 'Failed to fetch deals' }, { status: 500 })
  }
} 