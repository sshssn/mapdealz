"use client"

import * as React from "react"
import Image from "next/image"
import { Deal } from "@/types"
import { MapPin } from "lucide-react"

interface DealCardProps {
  deal: Deal;
}

export const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const calculateSavings = (original: number, current: number) => {
    const savings = original - current;
    return savings.toFixed(3);
  };

  const getStoreLogo = (store: string) => {
    const logos: Record<string, string> = {
      'Carrefour': '/logos/Carrefour.jpg',
      'Namshi': '/logos/Namshi.jpeg',
      'SharafDG': '/logos/SharafDG.png',
      'Noon': '/logos/Noon.png',
      'Amazon': '/logos/Amazon.png'
    };
    return logos[store] || '/logos/placeholder.png';
  };

  const getProductImage = (store: string) => {
    const images: Record<string, string> = {
      'Carrefour': 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800',
      'Namshi': 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800',
      'SharafDG': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800',
      'Noon': 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800',
      'Amazon': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800'
    };
    return images[store] || '/logos/placeholder.png';
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Discount Badge */}
      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
        -{deal.price.discount}%
      </div>
      
      {/* Store Logo */}
      <div className="absolute top-3 left-3 bg-white rounded-full p-1 shadow-md">
        <Image
          src={getStoreLogo(deal.store)}
          alt={deal.store}
          width={24}
          height={24}
          className="rounded-full"
        />
      </div>

      {/* Product Image */}
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={getProductImage(deal.store)}
          alt={deal.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-800 line-clamp-2">
          {deal.title}
        </h3>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-lg font-bold text-primary">
              {deal.price.currency} {deal.price.current.toFixed(3)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 line-through">
                {deal.price.currency} {deal.price.original.toFixed(3)}
              </span>
              <span className="text-sm text-green-600 font-medium">
                Save {deal.price.currency} {calculateSavings(deal.price.original, deal.price.current)}
              </span>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{deal.merchant.location.address}</span>
          {deal.distance && (
            <span className="text-gray-400">• {deal.distance.toFixed(1)} km</span>
          )}
        </div>
      </div>
    </div>
  );
}; 