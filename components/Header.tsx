'use client'

import Link from 'next/link'
import { ShoppingBag, Menu, X, Heart, User } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-primary-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-700">
            LXH Store
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-primary-700 hover:text-primary-900 transition">
              Sản Phẩm
            </Link>
            <Link href="/about" className="text-primary-700 hover:text-primary-900 transition">
              Về Chúng Tôi
            </Link>
            <Link href="/contact" className="text-primary-700 hover:text-primary-900 transition">
              Liên Hệ
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-primary-100 rounded-lg transition">
              <Heart size={20} />
            </button>
            <button className="p-2 hover:bg-primary-100 rounded-lg transition">
              <User size={20} />
            </button>
            <Link
              href="/cart"
              className="p-2 hover:bg-primary-100 rounded-lg transition relative"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-primary-100 rounded-lg transition"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-6 border-t border-primary-200 pt-4">
            <Link
              href="/products"
              className="block py-2 text-primary-700 hover:text-primary-900"
            >
              Sản Phẩm
            </Link>
            <Link
              href="/about"
              className="block py-2 text-primary-700 hover:text-primary-900"
            >
              Về Chúng Tôi
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-primary-700 hover:text-primary-900"
            >
              Liên Hệ
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
