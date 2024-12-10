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
      currency: 'USD',
      discount: 50,
    },
    merchant: {
      id: 'pizza-express',
      name: 'Pizza Express',
      rating: 4.5,
      totalReviews: 128,
      location: {
        lat: 37.7858,
        lng: -122.4064,
        address: '123 Main St',
        city: 'San Francisco',
        country: 'USA',
      },
    },
    category: DealCategory.FOOD_DRINK,
    tags: ['pizza', 'italian', 'dinner'],
    images: [
      {
        thumbnail: '/images/deals/pizza-thumb.jpg',
        full: '/images/deals/pizza-full.jpg',
      },
    ],
    validUntil: '2024-03-31',
    url: '/deals/pizza-express-50-off',
    coordinates: {
      lat: 37.7858,
      lng: -122.4064,
    },
  },
  {
    id: '2',
    title: '30% Off All Clothing',
    description: 'Seasonal clearance sale on all clothing items',
    price: {
      current: 69.99,
      original: 99.99,
      currency: 'USD',
      discount: 30,
    },
    merchant: {
      id: 'fashion-store',
      name: 'Fashion Store',
      rating: 4.2,
      totalReviews: 89,
      location: {
        lat: 37.7868,
        lng: -122.4074,
        address: '456 Market St',
        city: 'San Francisco',
        country: 'USA',
      },
    },
    category: DealCategory.SHOPPING,
    tags: ['clothing', 'fashion', 'sale'],
    images: [
      {
        thumbnail: '/images/deals/fashion-thumb.jpg',
        full: '/images/deals/fashion-full.jpg',
      },
    ],
    validUntil: '2024-03-31',
    url: '/deals/fashion-store-sale',
    coordinates: {
      lat: 37.7868,
      lng: -122.4074,
    },
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lng = parseFloat(searchParams.get('lng') || '0')

  try {
    // In production, this would search through real deals data
    const searchResults = MOCK_DEALS
      .filter(deal => 
        deal.title.toLowerCase().includes(query.toLowerCase()) ||
        deal.description.toLowerCase().includes(query.toLowerCase()) ||
        deal.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        deal.merchant.name.toLowerCase().includes(query.toLowerCase())
      )
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

    return NextResponse.json(searchResults)
  } catch (error) {
    console.error('Error searching deals:', error)
    return NextResponse.json({ error: 'Failed to search deals' }, { status: 500 })
  }
} 