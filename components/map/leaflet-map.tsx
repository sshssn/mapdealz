"use client"

import { useEffect, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet"

interface Props {
  deals: Array<{
    id: string
    title: string
    description: string
    category: string
    store: string
    location: [number, number]
    image: string
    price: number
    originalPrice: number
  }>
}

const COMPANY_LOGOS: Record<string, string> = {
  "Sharaf DG": "/logos/sharafdg.jpeg",
  "Amazon UAE": "/logos/amazon.png",
  "Namshi": "/logos/namshi.jpeg",
  "Carrefour": "/logos/carrefour.png",
  "Lulu": "/logos/lulu.png"
} as const;

function LeafletMap({ deals }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) {
    return <div className="w-full h-full bg-card rounded-2xl animate-pulse" />
  }

  return (
    <MapContainer
      key="map"
      center={[23.5859, 58.4059]}
      zoom={12}
      className="w-full h-full rounded-xl overflow-hidden"
      zoomControl={false}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="brightness-[0.7] contrast-[1.2] saturate-[0.8]"
      />
      
      {deals.map((deal) => {
        const markerIcon = L.divIcon({
          html: `
            <div class="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border-2 border-primary/50 p-1.5 hover:scale-110 transition-transform">
              <img 
                src="${COMPANY_LOGOS[deal.store] || '/logos/default.png'}"
                alt="${deal.store}"
                class="w-full h-full object-contain rounded-xl"
              />
            </div>
          `,
          className: "custom-marker",
          iconSize: [48, 48],
          iconAnchor: [24, 48],
          popupAnchor: [0, -48]
        })

        return (
          <Marker
            key={deal.id}
            position={deal.location}
            icon={markerIcon}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={COMPANY_LOGOS[deal.store] || '/logos/default.png'}
                    alt={deal.store}
                    className="w-8 h-8 object-contain rounded-lg"
                  />
                  <span className="font-medium">{deal.store}</span>
                </div>
                <h3 className="font-semibold mb-1">{deal.title}</h3>
                <p className="text-sm text-muted-foreground">{deal.description}</p>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default LeafletMap 