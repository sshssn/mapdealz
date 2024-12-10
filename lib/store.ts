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
  
  // Mobile-specific state
  isMobileMenuOpen: boolean
  isMobileMapVisible: boolean
  isLocationPermissionGranted: boolean
  lastKnownLocation: Location | null
  isRefreshing: boolean
  
  // Actions
  setDeals: (deals: Deal[]) => void
  setUserLocation: (location: Location | null) => void
  setSelectedDeal: (deal: Deal | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilter: (filter: Partial<DealFilter>) => void
  setSearchQuery: (query: string) => void
  
  // Mobile-specific actions
  toggleMobileMenu: () => void
  toggleMobileMap: () => void
  setLocationPermission: (granted: boolean) => void
  setLastKnownLocation: (location: Location | null) => void
  refreshDeals: () => Promise<void>
  
  // Async Actions
  fetchNearbyDeals: (radius?: number) => Promise<void>
  searchDeals: (query: string) => Promise<void>
  fetchDealsByCategory: (category: DealCategory) => Promise<void>
  requestLocationPermission: () => Promise<boolean>
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
  
  // Mobile-specific initial state
  isMobileMenuOpen: false,
  isMobileMapVisible: false,
  isLocationPermissionGranted: false,
  lastKnownLocation: null,
  isRefreshing: false,
  
  // Basic Actions
  setDeals: (deals) => set({ deals }),
  setUserLocation: (location) => {
    set({ userLocation: location })
    if (location) {
      set({ lastKnownLocation: location })
      localStorage.setItem('lastKnownLocation', JSON.stringify(location))
    }
  },
  setSelectedDeal: (deal) => set({ selectedDeal: deal }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilter: (filter) => set((state) => ({ filter: { ...state.filter, ...filter } })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Mobile-specific actions
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  toggleMobileMap: () => set((state) => ({ isMobileMapVisible: !state.isMobileMapVisible })),
  setLocationPermission: (granted) => {
    set({ isLocationPermissionGranted: granted })
    localStorage.setItem('locationPermissionGranted', String(granted))
  },
  setLastKnownLocation: (location) => {
    set({ lastKnownLocation: location })
    if (location) {
      localStorage.setItem('lastKnownLocation', JSON.stringify(location))
    }
  },
  
  // Optimized async actions for mobile
  refreshDeals: async () => {
    const { userLocation, lastKnownLocation, setDeals, setError } = get()
    set({ isRefreshing: true })

    try {
      const location = userLocation || lastKnownLocation
      if (!location) {
        throw new Error('No location available')
      }

      const dealService = DealService.getInstance()
      const deals = await dealService.getNearbyDeals(location, 5) // Smaller initial radius for mobile
      setDeals(deals)
    } catch (error) {
      setError('Failed to refresh deals')
      console.error(error)
    } finally {
      set({ isRefreshing: false })
    }
  },

  requestLocationPermission: async () => {
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation not supported')
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        })
      })

      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      get().setUserLocation(location)
      get().setLocationPermission(true)
      return true
    } catch (error) {
      console.error('Location permission error:', error)
      get().setLocationPermission(false)
      return false
    }
  },
  
  // Optimized for mobile network conditions
  fetchNearbyDeals: async (radius = 5) => {
    const { userLocation, lastKnownLocation, setDeals, setLoading, setError } = get()
    const location = userLocation || lastKnownLocation

    if (!location) {
      setError('Location not available')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const dealService = DealService.getInstance()
      const deals = await dealService.getNearbyDeals(location, radius)
      setDeals(deals)
    } catch (error) {
      setError('Failed to fetch nearby deals')
      console.error(error)
    } finally {
      setLoading(false)
    }
  },

  searchDeals: async (query) => {
    const { userLocation, lastKnownLocation, setDeals, setLoading, setError } = get()
    const location = userLocation || lastKnownLocation || undefined
    
    setLoading(true)
    setError(null)

    try {
      const dealService = DealService.getInstance()
      const deals = await dealService.searchDeals(query, location)
      setDeals(deals)
    } catch (error) {
      setError('Failed to search deals')
      console.error(error)
    } finally {
      setLoading(false)
    }
  },

  fetchDealsByCategory: async (category) => {
    const { userLocation, lastKnownLocation, setDeals, setLoading, setError } = get()
    const location = userLocation || lastKnownLocation || undefined
    
    setLoading(true)
    setError(null)

    try {
      const dealService = DealService.getInstance()
      const deals = await dealService.getDealsByCategory(category, location)
      setDeals(deals)
    } catch (error) {
      setError('Failed to fetch deals by category')
      console.error(error)
    } finally {
      setLoading(false)
    }
  },
}))
