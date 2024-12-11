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
  html: `<div class="w-12 h-12 flex items-center justify-center">
    <div class="relative w-full h-full">
      <div class="absolute inset-0 bg-gradient-to-r from-violet-600/50 via-pink-500/50 to-blue-500/50 rounded-full blur-lg animate-pulse"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-violet-600/40 via-pink-500/40 to-blue-500/40 rounded-full"></div>
      <div class="relative w-full h-full backdrop-blur-md bg-white/20 rounded-full border border-white/30 shadow-lg flex items-center justify-center cursor-move">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-6 h-6">
          <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 48],
  popupAnchor: [0, -48]
});

// Custom pin icon for deals
const createDealIcon = (deal: Deal) => L.divIcon({
  className: 'custom-deal-marker',
  html: `<div class="w-10 h-10 flex items-center justify-center">
    <div class="relative w-full h-full">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/50 via-purple-500/50 to-pink-600/50 rounded-full blur-md animate-pulse"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-500/40 to-pink-600/40 rounded-full"></div>
      <div class="relative w-full h-full backdrop-blur-md bg-white/20 rounded-full border border-white/30 shadow-lg flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-5 h-5">
          <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Add styles to head
const addCustomStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .custom-oman-marker, .custom-deal-marker {
      transition: transform 0.2s ease;
    }
    .custom-oman-marker:hover, .custom-deal-marker:hover {
      transform: scale(1.1);
      z-index: 1000 !important;
    }
    .leaflet-marker-draggable {
      cursor: move;
    }
  `;
  document.head.appendChild(style);
};

export default function DealMap({ deals }: DealMapProps) {
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<L.Map | null>(null);
  const { setSelectedDeal } = useStore();

  React.useEffect(() => {
    if (!mapContainerRef.current) return;

    // Add custom styles
    addCustomStyles();

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [23.5859, 58.4059], // Oman coordinates
      zoom: 13,
      zoomControl: true,
      attributionControl: true,
    });

    // Set map container size
    if (mapContainerRef.current) {
      mapContainerRef.current.style.height = '100%';
      mapContainerRef.current.style.minHeight = '400px';
      map.invalidateSize();
    }

    // Add tile layer
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add Oman marker
    const omanMarker = L.marker([23.5859, 58.4059], {
      icon: omanIcon,
      draggable: true,
      autoPan: true
    }).addTo(map);

    // Add deal markers
    deals.forEach(deal => {
      const marker = L.marker([deal.coordinates.lat, deal.coordinates.lng], {
        icon: createDealIcon(deal)
      }).addTo(map);

      // Add popup
      marker.bindPopup(`
        <div class="p-2 min-w-[200px]">
          <h3 class="font-semibold">${deal.title}</h3>
          <p class="text-sm text-gray-600">${deal.description}</p>
          <div class="mt-2 flex justify-between items-center">
            <span class="text-primary font-bold">${deal.price.currency} ${deal.price.current.toFixed(3)}</span>
            <button 
              onclick="window.dispatchEvent(new CustomEvent('selectDeal', {detail: '${deal.id}'}))"
              class="px-3 py-1 bg-primary text-white text-sm rounded-full hover:bg-primary/90"
            >
              View Deal
            </button>
          </div>
        </div>
      `);

      // Handle click
      marker.on('click', () => {
        setSelectedDeal(deal);
      });
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, [deals, setSelectedDeal]);

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      <div className="w-full h-full rounded-lg overflow-hidden border border-white/10">
        <div 
          ref={mapContainerRef} 
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
