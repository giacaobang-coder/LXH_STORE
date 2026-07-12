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
      <div className="relative overflow-hidden bg-primary-100 aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-primary-50 transition"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-primary-700'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-primary-500 mb-1">
          {product.subcategory || product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-primary-900 hover:text-primary-700 transition mb-2 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-primary-600">({product.reviews})</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-200">
          <p className="text-lg font-bold text-primary-900">
            {product.price.toLocaleString('vi-VN')} VND
          </p>
          <button
            onClick={handleAddToCart}
            className="p-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition"
            title="Thêm vào giỏ"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
