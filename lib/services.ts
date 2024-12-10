import { Deal, DealCategory } from '@/types'

// GCC-focused mock deals
const sampleDeals: Deal[] = [
  // Electronics
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    url: '/deals/iphone-15-pro-max',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070',
    price: {
      current: 399.900,
      original: 449.900,
      currency: 'OMR',
      discount: 11
    },
    coordinates: {
      lat: 23.5880,
      lng: 58.3829
    },
    store: 'Sharaf DG',
    storeLogo: '/logos/sharafdg.png',
    category: 'electronics'
  },
  {
    id: '2',
    title: 'Samsung S24 Ultra',
    url: '/deals/samsung-s24-ultra',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=2071',
    price: {
      current: 449.900,
      original: 499.900,
      currency: 'OMR',
      discount: 10
    },
    coordinates: {
      lat: 23.5933,
      lng: 58.4091
    },
    store: 'Sharaf DG',
    storeLogo: '/logos/sharafdg.png',
    category: 'electronics'
  },

  // Fashion
  {
    id: '3',
    title: 'Adidas Ultraboost Light',
    url: '/deals/adidas-ultraboost',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2067',
    price: {
      current: 45.900,
      original: 65.900,
      currency: 'OMR',
      discount: 30
    },
    coordinates: {
      lat: 23.5933,
      lng: 58.4091
    },
    store: 'Namshi',
    storeLogo: '/logos/namshi.png',
    category: 'fashion'
  },

  // Beauty
  {
    id: '4',
    title: 'Huda Beauty Mercury Retrograde Palette',
    url: '/deals/huda-beauty-palette',
    image: 'https://images.unsplash.com/photo-1596704017234-0e0a7beda8c8?q=80&w=2070',
    price: {
      current: 19.900,
      original: 29.900,
      currency: 'OMR',
      discount: 33
    },
    coordinates: {
      lat: 23.5880,
      lng: 58.3829
    },
    store: 'Noon',
    storeLogo: '/logos/noon.png',
    category: 'beauty'
  },

  // Groceries
  {
    id: '5',
    title: "Fresh Milk 4L",
    url: '/deals/fresh-milk',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=2072',
    price: {
      current: 2.450,
      original: 2.950,
      currency: 'OMR',
      discount: 17
    },
    coordinates: {
      lat: 23.5933,
      lng: 58.4091
    },
    store: 'Carrefour',
    storeLogo: '/logos/carrefour.png',
    category: 'groceries'
  },

  // Home & Garden
  {
    id: '6',
    title: 'Modern Bookcase',
    url: '/deals/modern-bookcase',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=2069',
    price: {
      current: 24.900,
      original: 29.900,
      currency: 'OMR',
      discount: 17
    },
    coordinates: {
      lat: 23.5933,
      lng: 58.4091
    },
    store: 'Amazon',
    storeLogo: '/logos/amazon.png',
    category: 'home'
  },

  // Sports
  {
    id: '7',
    title: 'Nike Pro Training Set',
    url: '/deals/nike-pro-set',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071',
    price: {
      current: 19.900,
      original: 29.900,
      currency: 'OMR',
      discount: 33
    },
    coordinates: {
      lat: 23.5880,
      lng: 58.3829
    },
    store: 'Namshi',
    storeLogo: '/logos/namshi.png',
    category: 'sports'
  },

  // Electronics
  {
    id: '8',
    title: 'LG 65" OLED TV',
    url: '/deals/lg-oled',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070',
    price: {
      current: 699.900,
      original: 899.900,
      currency: 'OMR',
      discount: 22
    },
    coordinates: {
      lat: 23.5933,
      lng: 58.4091
    },
    store: 'Sharaf DG',
    storeLogo: '/logos/sharafdg.png',
    category: 'electronics'
  },

  // Electronics
  {
    id: '9',
    title: 'Apple MacBook Pro M3',
    url: '/deals/macbook-pro',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026',
    price: {
      current: 599.900,
      original: 699.900,
      currency: 'OMR',
      discount: 14
    },
    coordinates: {
      lat: 23.5933,
      lng: 58.4091
    },
    store: 'Noon',
    storeLogo: '/logos/noon.png',
    category: 'electronics'
  },

  // Fashion
  {
    id: '10',
    title: 'Ray-Ban Aviator Classic',
    url: '/deals/rayban-aviator',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080',
    price: {
      current: 89.900,
      original: 119.900,
      currency: 'OMR',
      discount: 25
    },
    coordinates: {
      lat: 23.5933,
      lng: 58.4091
    },
    store: 'Amazon',
    storeLogo: '/logos/amazon.png',
    category: 'fashion'
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
