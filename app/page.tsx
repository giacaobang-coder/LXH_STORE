'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import CategoryFilter from '@/components/CategoryFilter'
import ProductCard from '@/components/ProductCard'
import CTA from '@/components/CTA'
import Link from 'next/link'
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

const PRODUCTS_PER_PAGE = 20

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
    window.scrollTo(0, 0)
  }, [])

  // Pagination
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = products.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 800)
  }

  return (
    <>
      <Hero />

      <div className="container-custom py-20">
        {/* Category Filter */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Danh Mục Sản Phẩm</h2>
          <CategoryFilter activeCategory="all" />
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Sản Phẩm Nổi Bật</h2>
          <p className="text-primary-600 mb-8">
            Hiển thị {startIndex + 1} - {Math.min(endIndex, products.length)} trong {products.length} sản phẩm
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="bg-primary-200 aspect-square rounded" />
                  <div className="p-4 space-y-3">
                    <div className="bg-primary-200 h-4 rounded" />
                    <div className="bg-primary-200 h-6 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 py-8 border-t border-primary-200 pt-8">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-primary-200 rounded-lg hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    title="Trang trước"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 rounded-lg font-semibold transition min-w-[44px] ${
                          currentPage === i + 1
                            ? 'bg-primary-700 text-white'
                            : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-primary-200 rounded-lg hover:bg-primary-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    title="Trang sau"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CTA />
    </>
  )
}
