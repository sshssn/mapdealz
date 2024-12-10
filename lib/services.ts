import { Deal, DealCategory } from '@/types'

// Sample data - In a real app, this would come from an API
const sampleDeals: Deal[] = [
  {
    id: '1',
    title: '50% Off Pizza Margherita',
    merchant: {
      id: 'pizza-express-1',
      name: 'Pizza Express',
      rating: 4.5,
      location: {
        address: '123 Main St, San Francisco, CA',
        coordinates: { lat: 0, lng: 0 }
      }
    },
    price: {
      current: 9.99,
      original: 19.99,
      discount: 50
    },
    coordinates: {
      lat: 0,
      lng: 0
    },
    category: DealCategory.FOOD
  },
  {
    id: '2',
    title: 'Buy 1 Get 1 Free Coffee',
    merchant: {
      id: 'star-coffee-1',
      name: 'Star Coffee',
      rating: 4.8,
      location: {
        address: '456 Market St, San Francisco, CA',
        coordinates: { lat: 0, lng: 0 }
      }
    },
    price: {
      current: 3.99,
      original: 7.98,
      discount: 50
    },
    coordinates: {
      lat: 0,
      lng: 0
    },
    category: DealCategory.FOOD
  },
  {
    id: '3',
    title: '30% Off Sushi Platter',
    merchant: {
      id: 'sushi-master-1',
      name: 'Sushi Master',
      rating: 4.6,
      location: {
        address: '789 Mission St, San Francisco, CA',
        coordinates: { lat: 0, lng: 0 }
      }
    },
    price: {
      current: 24.99,
      original: 35.99,
      discount: 30
    },
    coordinates: {
      lat: 0,
      lng: 0
    },
    category: DealCategory.FOOD
  }
]

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
