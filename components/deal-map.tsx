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

const DealMap: React.FC<DealMapProps> = ({ deals }) => {
  const mapRef = React.useRef<L.Map | null>(null)
  const mapContainerRef = React.useRef<HTMLDivElement>(null)
  const markersRef = React.useRef<L.Marker[]>([])
  const { userLocation, setUserLocation } = useStore()

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
    }).setView([25.2048, 55.2708], 12) // Dubai coordinates

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19
    }).addTo(mapRef.current)

    L.control.zoom({
      position: 'bottomright'
    }).addTo(mapRef.current)

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
          className: "bg-primary rounded-full p-2 border-2 border-white shadow-lg",
          html: `<div class="w-8 h-8 p-1 rounded-full bg-white">
            <img src="${deal.image}" alt="${deal.store}" class="w-full h-full object-contain" />
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

