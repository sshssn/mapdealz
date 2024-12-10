"use client"

import * as React from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useStore } from "@/lib/store"

// Define marker icon
const dealIcon = L.divIcon({
  className: "bg-primary rounded-full p-2 border-2 border-white shadow-lg",
  html: '<div class="w-4 h-4 text-white"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const DealMap: React.FC = () => {
  const mapRef = React.useRef<L.Map | null>(null)
  const mapContainerRef = React.useRef<HTMLDivElement>(null)
  const markersRef = React.useRef<L.Marker[]>([])
  const { userLocation, setUserLocation, deals, selectedDeal, filter } = useStore()

  // Initialize map
  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (!mapContainerRef.current || mapRef.current) return

    mapRef.current = L.map(mapContainerRef.current).setView([37.7749, -122.4194], 13)

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(mapRef.current)

    // Get user location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
      },
      (error) => {
        console.error("Error getting location:", error)
      }
    )

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [setUserLocation])

  // Update markers when deals or user location changes
  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (!mapRef.current || !userLocation) return

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current = []

    // Add user location marker
    const userMarker = L.marker([userLocation.lat, userLocation.lng], {
      icon: L.divIcon({
        className: "bg-blue-500 rounded-full border-2 border-white shadow-lg",
        html: '<div class="w-3 h-3 bg-blue-500 rounded-full"></div>',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      }),
    }).addTo(mapRef.current)
    markersRef.current.push(userMarker)

    // Add deal markers
    deals.forEach((deal) => {
      const marker = L.marker([deal.coordinates.lat, deal.coordinates.lng], { icon: dealIcon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold">${deal.title}</h3>
            <p class="text-sm text-gray-600">${deal.price.currency} ${deal.price.current} (${deal.price.discount}% OFF)</p>
          </div>
        `)
        .addTo(mapRef.current!)
      markersRef.current.push(marker)
    })

    // Center map on user location
    mapRef.current.setView([userLocation.lat, userLocation.lng], 14)
  }, [userLocation, deals])

  // Handle selected deal
  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (!mapRef.current || !selectedDeal) return

    mapRef.current.setView([selectedDeal.coordinates.lat, selectedDeal.coordinates.lng], 15)

    markersRef.current.forEach((marker) => {
      const markerLatLng = marker.getLatLng()
      if (
        markerLatLng.lat === selectedDeal.coordinates.lat &&
        markerLatLng.lng === selectedDeal.coordinates.lng
      ) {
        marker.openPopup()
      }
    })
  }, [selectedDeal])

  return (
    <div className="rounded-lg overflow-hidden border bg-background">
      <div ref={mapContainerRef} className="h-[600px] w-full" />
    </div>
  )
}

export default DealMap
