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
  currency: 'OMR'
}

export enum DealCategory {
  FOOD_DRINK = "FOOD_DRINK",
  SHOPPING = "SHOPPING",
  BEAUTY_SPA = "BEAUTY_SPA",
  ACTIVITIES = "ACTIVITIES",
  TRAVEL = "TRAVEL",
  SERVICES = "SERVICES",
  HEALTH_FITNESS = "HEALTH_FITNESS",
  ENTERTAINMENT = "ENTERTAINMENT"
}

export type Store = 'Carrefour' | 'Namshi' | 'SharafDG' | 'Noon' | 'Amazon';

export interface Deal {
  id: string;
  title: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: Price;
  merchant: {
    location: {
      address: string;
    };
    rating: number;
  };
  distance?: number;
  image: string;
  store: Store;
  category: DealCategory;
}

export interface DealFilter {
  categories: DealCategory[]
  distance: number
  sortBy: 'distance' | 'price' | 'discount' | 'rating'
} 