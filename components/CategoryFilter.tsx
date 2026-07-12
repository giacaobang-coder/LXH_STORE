'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getSubcategories } from '@/lib/products'

interface CategoryFilterProps {
  activeCategory?: string
}

const categories = [
  { id: 'all', name: 'Tất Cả', label: '', icon: '🛍️' },
  { id: 'women', name: 'Nữ', label: 'women', icon: '👩' },
  { id: 'men', name: 'Nam', label: 'men', icon: '👨' },
  { id: 'accessories', name: 'Phụ Kiện', label: 'accessories', icon: '✨' },
]

export default function CategoryFilter({ activeCategory = 'all' }: CategoryFilterProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const womenSubcategories = getSubcategories('women')
  const menSubcategories = getSubcategories('men')
  const accessoriesSubcategories = getSubcategories('accessories')

  const subcategoryMap = {
    women: womenSubcategories,
    men: menSubcategories,
    accessories: accessoriesSubcategories,
  }

  return (
    <div className="space-y-6">
      {/* Main Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              if (cat.id === 'all') {
                setExpandedCategory(null)
              } else {
                setExpandedCategory(expandedCategory === cat.id ? null : cat.id)
              }
            }}
            className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${
              activeCategory === cat.id
                ? 'bg-primary-700 text-white'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      {/* Subcategories */}
      {expandedCategory && expandedCategory !== 'all' && (
        <div className="bg-primary-50 p-6 rounded-lg">
          <h3 className="font-bold text-primary-900 mb-4">
            Danh Mục con - {categories.find((c) => c.id === expandedCategory)?.name}
          </h3>
          <div className="flex flex-wrap gap-3">
            {subcategoryMap[expandedCategory as keyof typeof subcategoryMap]?.map(
              (subcat) => (
                <Link
                  key={subcat}
                  href={`/products?category=${expandedCategory}&subcategory=${subcat}`}
                  className="px-4 py-2 bg-white border border-primary-200 rounded-lg text-primary-700 hover:bg-primary-100 transition font-semibold"
                >
                  {subcat}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
