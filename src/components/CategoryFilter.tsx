'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CATEGORIES, SUBCATEGORIES, CategoryId } from '@/lib/constants'

interface CategoryFilterProps {
  activeCategory?: string
}

export default function CategoryFilter({ activeCategory = 'all' }: CategoryFilterProps) {
  const [expandedCategory, setExpandedCategory] = useState<CategoryId | null>(null)

  return (
    <div className="space-y-6">
      {/* Main Categories */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/"
          onClick={() => setExpandedCategory(null)}
          className={`px-6 py-2 text-xs uppercase tracking-luxury border transition ${
            activeCategory === 'all'
              ? 'bg-gold text-noir-950 border-gold'
              : 'border-white/20 text-white hover:border-gold hover:text-gold'
          }`}
        >
          Tất Cả
        </Link>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
            className={`px-6 py-2 text-xs uppercase tracking-luxury border transition ${
              activeCategory === cat.id
                ? 'bg-gold text-noir-950 border-gold'
                : 'border-white/20 text-white hover:border-gold hover:text-gold'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Subcategories */}
      {expandedCategory && (
        <div className="bg-noir-900 border border-white/10 p-6">
          <h3 className="eyebrow mb-4">
            {CATEGORIES.find((c) => c.id === expandedCategory)?.name} — Danh Mục Con
          </h3>
          <div className="flex flex-wrap gap-3">
            {SUBCATEGORIES[expandedCategory]?.map((subcat) => (
              <Link
                key={subcat}
                href={`/products?category=${expandedCategory}&subcategory=${subcat}`}
                className="px-4 py-2 border border-white/10 text-noir-200 hover:border-gold hover:text-gold transition text-sm"
              >
                {subcat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
