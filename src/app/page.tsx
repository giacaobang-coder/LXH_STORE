'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import CategoryFilter from '@/components/CategoryFilter'
import ProductCard from '@/components/ProductCard'
import CTA from '@/components/CTA'
import { getProducts } from '@/lib/products'
import type { Product } from '@/types/product'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
  }, [])

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

      <div className="container-custom py-24">
        {/* Category Filter */}
        <div className="mb-20">
          <p className="eyebrow mb-3">Khám Phá</p>
          <h2 className="mb-8">Danh Mục Sản Phẩm</h2>
          <CategoryFilter activeCategory="all" />
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow mb-3">Tuyển Chọn</p>
              <h2>Sản Phẩm Nổi Bật</h2>
            </div>
            <p className="text-noir-400 text-sm">
              Hiển thị {startIndex + 1}–{Math.min(endIndex, products.length)} trong {products.length} sản phẩm
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="bg-noir-800 aspect-[3/4]" />
                  <div className="p-5 space-y-3">
                    <div className="bg-noir-800 h-3 w-1/3" />
                    <div className="bg-noir-800 h-5" />
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
                <div className="flex justify-center items-center gap-2 py-8 border-t border-white/10">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-white/10 text-white hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white transition"
                  >
                    <ChevronLeft size={18} strokeWidth={1.5} />
                  </button>

                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`px-4 py-2 text-sm font-medium transition min-w-[44px] ${
                          currentPage === i + 1
                            ? 'bg-gold text-noir-950'
                            : 'border border-white/10 text-white hover:border-gold hover:text-gold'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-white/10 text-white hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white transition"
                  >
                    <ChevronRight size={18} strokeWidth={1.5} />
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
