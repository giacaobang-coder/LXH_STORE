'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import { getProducts, getProductsByCategory } from '@/lib/products'
import type { Product } from '@/types/product'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PRODUCTS_PER_PAGE = 20

function ProductsPageContent() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const subcategory = searchParams.get('subcategory')
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        let data: Product[]

        if (category && subcategory) {
          const allProducts = await getProducts()
          data = allProducts.filter((p) => p.category === category && p.subcategory === subcategory)
        } else if (category) {
          data = await getProductsByCategory(category)
        } else {
          data = await getProducts()
        }

        if (sortBy === 'price-low') {
          data.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'price-high') {
          data.sort((a, b) => b.price - a.price)
        } else if (sortBy === 'rating') {
          data.sort((a, b) => b.rating - a.rating)
        }

        setProducts(data)
        setCurrentPage(1)
      } catch (error) {
        console.error('Failed to load products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [category, subcategory, sortBy])

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = products.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 400)
  }

  const getCategoryTitle = () => {
    if (subcategory) return subcategory
    if (category) return category.charAt(0).toUpperCase() + category.slice(1)
    return 'Tất Cả Sản Phẩm'
  }

  return (
    <div className="min-h-screen bg-noir">
      {/* Header */}
      <div className="bg-noir-900 border-b border-white/10 py-12">
        <div className="container-custom">
          <p className="eyebrow mb-3">Bộ Sưu Tập</p>
          <h1 className="mb-2">{getCategoryTitle()}</h1>
          <p className="text-noir-400 text-sm">
            {products.length} sản phẩm — Hiển thị {startIndex + 1}-{Math.min(endIndex, products.length)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        {/* Category Filter */}
        <div className="mb-12 pb-10 border-b border-white/10">
          <h4 className="mb-6 text-noir-400">Lọc Danh Mục</h4>
          <CategoryFilter activeCategory={category || 'all'} />
        </div>

        {/* Sort & Info */}
        <div className="mb-10 flex justify-between items-center flex-wrap gap-4">
          <p className="text-noir-400 text-sm">
            Tổng cộng: <span className="text-white font-medium">{products.length}</span> sản phẩm
          </p>
          <div className="flex items-center gap-3">
            <label className="text-xs uppercase tracking-luxury text-noir-400">Sắp xếp</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-noir-900 border border-white/10 text-white text-sm focus:outline-none focus:border-gold"
            >
              <option value="newest">Mới Nhất</option>
              <option value="price-low">Giá: Thấp → Cao</option>
              <option value="price-high">Giá: Cao → Thấp</option>
              <option value="rating">Đánh Giá Cao</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
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
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-noir-400 text-lg mb-6">Không tìm thấy sản phẩm nào</p>
            <a href="/products" className="btn-primary inline-block">
              Quay lại tất cả sản phẩm
            </a>
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
              <div className="flex flex-col items-center gap-4 py-8 border-t border-white/10">
                <div className="flex justify-center items-center gap-2">
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
                <p className="text-xs text-noir-400">
                  Trang <span className="text-white">{currentPage}</span> / {totalPages}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container-custom py-12 text-noir-400">Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  )
}
