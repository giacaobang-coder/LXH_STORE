'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Heart } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  subcategory?: string
  rating: number
  reviews: number
}

export default function ProductCard({ product }: { product: Product }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <div className="card group">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-noir-800 aspect-[3/4]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 p-2 bg-noir-950/60 backdrop-blur hover:bg-noir-950 transition"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={isFavorite ? 'fill-gold text-gold' : 'text-white'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-[11px] uppercase tracking-luxury text-gold mb-2">
          {product.subcategory || product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-lg text-white hover:text-gold transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-gold text-xs' : 'text-noir-600 text-xs'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-noir-400">({product.reviews})</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <p className="text-base font-medium text-white">
            {product.price.toLocaleString('vi-VN')} ₫
          </p>
          <button
            onClick={handleAddToCart}
            className="p-2 border border-white/20 text-white hover:border-gold hover:text-gold transition-colors"
            title="Thêm vào giỏ"
          >
            <ShoppingBag size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
