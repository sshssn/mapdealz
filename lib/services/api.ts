import axios from 'axios'
import { Deal, Location, DealCategory } from '@/types'

const DEAL_SOURCES = {
  GROUPON: process.env.NEXT_PUBLIC_GROUPON_API_URL,
  RAKUTEN: process.env.NEXT_PUBLIC_RAKUTEN_API_URL,
}

export class DealService {
  private static instance: DealService
  private constructor() {}

  static getInstance(): DealService {
    if (!DealService.instance) {
      DealService.instance = new DealService()
    }
    return DealService.instance
  }

  async getNearbyDeals(location: Location, radius: number = 10): Promise<Deal[]> {
    try {
      // In production, this would call actual deal APIs
      const response = await axios.get('/api/deals/nearby', {
        params: {
          lat: location.lat,
          lng: location.lng,
          radius,
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching nearby deals:', error)
      return []
    }
  }

  async searchDeals(query: string, location?: Location): Promise<Deal[]> {
    try {
      const response = await axios.get('/api/deals/search', {
        params: {
          q: query,
          ...(location && { lat: location.lat, lng: location.lng }),
        },
      })
      return response.data
    } catch (error) {
      console.error('Error searching deals:', error)
      return []
    }
  }

  async getDealsByCategory(category: DealCategory, location?: Location): Promise<Deal[]> {
    try {
      const response = await axios.get('/api/deals/category', {
        params: {
          category,
          ...(location && { lat: location.lat, lng: location.lng }),
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching deals by category:', error)
      return []
    }
  }

  async getDealDetails(dealId: string): Promise<Deal | null> {
    try {
      const response = await axios.get(`/api/deals/${dealId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching deal details:', error)
      return null
    }
  }
} 