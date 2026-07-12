'use client'

import { useEffect, useState, useRef } from 'react'
import ProductCard from './ProductCard'
import { getProducts } from '@/lib/products'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

interface ProductCarouselProps {
  title: string
  description?: string
  limit?: number
}

export default function ProductCarousel({
  title,
  description,
  limit = 20,
}: ProductCarouselProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data.slice(0, limit))
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [limit])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="mb-16">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && <p className="text-primary-600">{description}</p>}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-primary-100 transition"
        >
          <ChevronLeft size={24} className="text-primary-700" />
        </button>

        {/* Products Scroll */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-72 h-96 bg-primary-100 rounded-lg animate-pulse" />
            ))
          ) : (
            products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-72">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-primary-100 transition"
        >
          <ChevronRight size={24} className="text-primary-700" />
        </button>
      </div>
    </section>
  )
}
