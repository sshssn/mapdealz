"use client"

import * as React from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useStore } from "@/lib/store"
import { MapPinIcon } from '@heroicons/react/24/solid'
import { Deal } from "@/types"

interface DealMapProps {
  deals: Deal[];
}

// Custom pin icon for Oman
const omanIcon = L.divIcon({
  className: 'custom-oman-marker',
  html: `<div class="w-8 h-8 relative">
    <div class="absolute inset-0 bg-red-500/30 rounded-full animate-ping"></div>
    <div class="relative w-full h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-4 h-4">
        <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
      </svg>
    </div>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32]
});

const DealMap: React.FC<DealMapProps> = ({ deals }) => {
  const mapRef = React.useRef<L.Map | null>(null)
  const mapContainerRef = React.useRef<HTMLDivElement>(null)
  const markersRef = React.useRef<L.Marker[]>([])
  const { userLocation, setUserLocation } = useStore()

  // Oman coordinates
  const OMAN_COORDINATES = {
    lat: 23.5859,
    lng: 58.3829
  }

  // Initialize map
  React.useEffect(() => {
    if (typeof window === "undefined") return

    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    if (!mapContainerRef.current) return

    mapRef.current = L.map(mapContainerRef.current, { 
      preferCanvas: true,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: true,
      dragging: true
    }).setView([OMAN_COORDINATES.lat, OMAN_COORDINATES.lng], 12) // Set default view to Oman

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19
    }).addTo(mapRef.current)

    L.control.zoom({
      position: 'bottomright'
    }).addTo(mapRef.current)

    // Add Oman marker
    L.marker([OMAN_COORDINATES.lat, OMAN_COORDINATES.lng], {
      icon: omanIcon
    })
    .addTo(mapRef.current)
    .bindPopup(`
      <div class="p-3">
        <h3 class="font-semibold">Muscat, Oman</h3>
        <p class="text-sm opacity-75">Your default location</p>
      </div>
    `)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  // Update markers
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map || !deals) return;

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    deals.forEach(deal => {
      const marker = L.marker([deal.coordinates.lat, deal.coordinates.lng], {
        icon: L.divIcon({
          className: "custom-marker-icon",
          html: `<div class="w-8 h-8 relative">
            <div class="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
            <div class="relative w-full h-full bg-white rounded-full shadow-lg p-1">
              <img src="${deal.storeLogo}" alt="${deal.store}" class="w-full h-full object-contain rounded-full" />
            </div>
          </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        })
      })
      .bindPopup(`
        <div class="p-3">
          <h3 class="font-semibold">${deal.title}</h3>
          <p class="text-sm opacity-75">${deal.store}</p>
          <p class="text-sm font-medium mt-1">
            ${deal.price.currency} ${deal.price.current}
            <span class="text-green-500 ml-1">-${deal.price.discount}%</span>
          </p>
        </div>
      `)
      .addTo(map);

      markersRef.current.push(marker);
    });
  }, [deals]);

  return (
    <div className="relative w-full h-[500px]">
      <div className="w-full h-full rounded-lg overflow-hidden">
        <div 
          ref={mapContainerRef} 
          style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0 }} 
        />
      </div>
    </div>
  )
}

export default DealMap

