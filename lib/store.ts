import { create } from 'zustand'
import { DealService } from './services/api'
import { Deal, Location, DealFilter, DealCategory } from '@/types'

interface DealzMapStore {
  // State
  deals: Deal[]
  userLocation: Location | null
  selectedDeal: Deal | null
  loading: boolean
  error: string | null
  filter: DealFilter
  searchQuery: string
  
  // Actions
  setDeals: (deals: Deal[]) => void
  setUserLocation: (location: Location | null) => void
  setSelectedDeal: (deal: Deal | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilter: (filter: Partial<DealFilter>) => void
  setSearchQuery: (query: string) => void
  
  // Async Actions
  fetchNearbyDeals: (radius?: number) => Promise<void>
  searchDeals: (query: string) => Promise<void>
  fetchDealsByCategory: (category: DealCategory) => Promise<void>
}

export const useStore = create<DealzMapStore>((set, get) => ({
  // Initial State
  deals: [],
  userLocation: null,
  selectedDeal: null,
  loading: false,
  error: null,
  filter: {
    categories: [],
    distance: 10,
    sortBy: 'distance',
  },
  searchQuery: '',
  
  // Basic Actions
  setDeals: (deals) => set({ deals }),
  setUserLocation: (location) => set({ userLocation: location }),
  setSelectedDeal: (deal) => set({ selectedDeal: deal }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilter: (filter) => set((state) => ({ filter: { ...state.filter, ...filter } })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Async Actions
  fetchNearbyDeals: async (radius) => {
    const { userLocation, setDeals, setLoading, setError } = get()
    if (!userLocation) return

    setLoading(true)
    setError(null)

    try {
      const dealService = DealService.getInstance()
      const deals = await dealService.getNearbyDeals(userLocation, radius)
      setDeals(deals)
    } catch (error) {
      setError('Failed to fetch nearby deals')
      console.error(error)
    } finally {
      setLoading(false)
    }
  },

  searchDeals: async (query) => {
    const { userLocation, setDeals, setLoading, setError } = get()
    setLoading(true)
    setError(null)

    try {
      const dealService = DealService.getInstance()
      const deals = await dealService.searchDeals(query, userLocation || undefined)
      setDeals(deals)
    } catch (error) {
      setError('Failed to search deals')
      console.error(error)
    } finally {
      setLoading(false)
    }
  },

  fetchDealsByCategory: async (category) => {
    const { userLocation, setDeals, setLoading, setError } = get()
    setLoading(true)
    setError(null)

    try {
      const dealService = DealService.getInstance()
      const deals = await dealService.getDealsByCategory(category, userLocation)
      setDeals(deals)
    } catch (error) {
      setError('Failed to fetch deals by category')
      console.error(error)
    } finally {
      setLoading(false)
    }
  },
}))
