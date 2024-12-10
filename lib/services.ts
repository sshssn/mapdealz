import { Deal, DealCategory } from '@/types'

// GCC-focused mock deals
const sampleDeals: Deal[] = [
  // Electronics
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    description: 'Latest iPhone with powerful features and amazing camera',
    url: '/deals/iphone-15-pro-max',
    image: '/images/deals/iphone15.jpg',
    price: {
      current: 499.99,
      original: 599.99,
      currency: 'OMR',
      discount: 17
    },
    coordinates: {
      lat: 23.5859,
      lng: 58.3829
    },
    merchant: {
      location: {
        address: 'City Centre Muscat'
      },
      rating: 4.8
    },
    store: 'SharafDG',
    storeLogo: '/logos/sharafdg.png',
    category: DealCategory.ENTERTAINMENT
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23 Ultra',
    description: 'Experience the power of Galaxy with S23 Ultra',
    url: '/deals/samsung-s23-ultra',
    image: '/images/deals/samsung-s23.jpg',
    price: {
      current: 399.99,
      original: 499.99,
      currency: 'OMR',
      discount: 20
    },
    coordinates: {
      lat: 23.5880,
      lng: 58.4091
    },
    merchant: {
      location: {
        address: 'Mall of Oman'
      },
      rating: 4.7
    },
    store: 'SharafDG',
    storeLogo: '/logos/sharafdg.png',
    category: DealCategory.ENTERTAINMENT
  },
  {
    id: '3',
    title: 'Nike Air Max 2023',
    description: 'Step into comfort with the latest Nike Air Max',
    url: '/deals/nike-air-max',
    image: '/images/deals/nike-air-max.jpg',
    price: {
      current: 49.99,
      original: 89.99,
      currency: 'OMR',
      discount: 44
    },
    coordinates: {
      lat: 23.5890,
      lng: 58.4001
    },
    merchant: {
      location: {
        address: 'Muscat Grand Mall'
      },
      rating: 4.6
    },
    store: 'Namshi',
    storeLogo: '/logos/namshi.png',
    category: DealCategory.SHOPPING
  },
  {
    id: '4',
    title: 'Huda Beauty Palette',
    description: 'Create stunning looks with this exclusive palette',
    url: '/deals/huda-beauty-palette',
    image: '/images/deals/huda-beauty.jpg',
    price: {
      current: 29.99,
      original: 49.99,
      currency: 'OMR',
      discount: 40
    },
    coordinates: {
      lat: 23.5870,
      lng: 58.4081
    },
    merchant: {
      location: {
        address: 'Avenues Mall'
      },
      rating: 4.9
    },
    store: 'Noon',
    storeLogo: '/logos/noon.png',
    category: DealCategory.BEAUTY_SPA
  },
  {
    id: '5',
    title: 'Fresh Produce Bundle',
    description: 'Get fresh fruits and vegetables at amazing prices',
    url: '/deals/fresh-produce',
    image: '/images/deals/fresh-produce.jpg',
    price: {
      current: 19.99,
      original: 29.99,
      currency: 'OMR',
      discount: 33
    },
    coordinates: {
      lat: 23.5865,
      lng: 58.4071
    },
    merchant: {
      location: {
        address: 'City Centre Qurum'
      },
      rating: 4.5
    },
    store: 'Carrefour',
    storeLogo: '/logos/carrefour.png',
    category: DealCategory.FOOD_DRINK
  }
]

export { sampleDeals }

export const fetchNearbyDeals = async (lat: number, lng: number): Promise<Deal[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Calculate coordinates for each deal based on user location
  return sampleDeals.map(deal => ({
    ...deal,
    coordinates: {
      lat: lat + (Math.random() - 0.5) * 0.02, // Random offset within ~1km
      lng: lng + (Math.random() - 0.5) * 0.02,
    },
  }))
}

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in km
}

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180)
}
