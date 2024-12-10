export interface Location {
  lat: number
  lng: number
}

export interface Merchant {
  id: string
  name: string
  rating: number
  location: {
    address: string
    coordinates: Location
  }
}

export interface Price {
  current: number
  original: number
  discount: number
  currency?: string
}

export enum DealCategory {
  FOOD = 'food',
  SHOPPING = 'shopping',
  ENTERTAINMENT = 'entertainment',
  BEAUTY = 'beauty',
  FITNESS = 'fitness',
  TRAVEL = 'travel',
  OTHER = 'other'
}

export interface Deal {
  id: string
  title: string
  description?: string
  price: Price
  merchant: Merchant
  coordinates: Location
  distance?: number
  category?: DealCategory
  expiresAt?: string
  imageUrl?: string
}

export interface DealFilter {
  categories: DealCategory[]
  distance: number
  sortBy: 'distance' | 'price' | 'discount' | 'rating'
} 