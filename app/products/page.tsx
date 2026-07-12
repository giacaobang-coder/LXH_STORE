'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/CategoryFilter'
import { getProducts, getProductsByCategory } from '@/lib/products'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  subcategory: string
  rating: number
  reviews: number
}

const PRODUCTS_PER_PAGE = 20

export default function ProductsPage() {
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
          // Filter by both category and subcategory
          const allProducts = await getProducts()
          data = allProducts.filter((p) => p.category === category && p.subcategory === subcategory)
        } else if (category) {
          data = await getProductsByCategory(category)
        } else {
          data = await getProducts()
        }

        // Sort
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

  // Pagination
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = products.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo(0, 400)
  }

  const getCategoryTitle = () => {
    if (subcategory) return `${subcategory}`
    if (category) return category.charAt(0).toUpperCase() + category.slice(1)
    return 'Tất Cả Sản Phẩm'
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-primary-50 border-b border-primary-200 py-8">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-2">{getCategoryTitle()}</h1>
          <p className="text-primary-600">
            {products.length} sản phẩm (Hiển thị {startIndex + 1} - {Math.min(endIndex, products.length)})
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        {/* Category Filter */}
        <div className="mb-12 pb-8 border-b border-primary-200">
          <h2 className="text-xl font-bold mb-6">Lọc Danh Mục</h2>
          <CategoryFilter activeCategory={category || 'all'} />
        </div>

        {/* Sort & Info */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-primary-600 font-semibold">
            Tổng cộng: <span className="text-primary-900">{products.length}</span> sản phẩm
          </p>
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold">Sắp xếp:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                <div className="bg-primary-200 aspect-square rounded" />
                <div className="p-4 space-y-3">
                  <div className="bg-primary-200 h-4 rounded" />
                  <div className="bg-primary-200 h-6 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-primary-600 text-lg mb-4">Không tìm thấy sản phẩm nào</p>
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
              <div className="flex flex-col items-center gap-4 py-8 border-t border-primary-200 pt-8">
                <div className="flex justify-center items-center gap-2">
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
                <p className="text-sm text-primary-600">
                  Trang <span className="font-bold">{currentPage}</span> / <span className="font-bold">{totalPages}</span>
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
