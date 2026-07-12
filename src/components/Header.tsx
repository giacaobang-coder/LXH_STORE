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
    <header className="sticky top-0 z-50 bg-noir/95 backdrop-blur border-b border-white/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif tracking-luxury text-white">
            LXH
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-10">
            <Link href="/products" className="text-xs uppercase tracking-luxury text-noir-200 hover:text-gold transition-colors">
              Sản Phẩm
            </Link>
            <Link href="/about" className="text-xs uppercase tracking-luxury text-noir-200 hover:text-gold transition-colors">
              Về Chúng Tôi
            </Link>
            <Link href="/contact" className="text-xs uppercase tracking-luxury text-noir-200 hover:text-gold transition-colors">
              Liên Hệ
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:text-gold transition-colors">
              <Heart size={18} strokeWidth={1.5} />
            </button>
            <button className="p-2 hover:text-gold transition-colors">
              <User size={18} strokeWidth={1.5} />
            </button>
            <Link
              href="/cart"
              className="p-2 hover:text-gold transition-colors relative"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-noir-950 text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:text-gold transition-colors"
            >
              {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-6 border-t border-white/10 pt-4">
            <Link
              href="/products"
              className="block py-2 text-xs uppercase tracking-luxury text-noir-200 hover:text-gold"
            >
              Sản Phẩm
            </Link>
            <Link
              href="/about"
              className="block py-2 text-xs uppercase tracking-luxury text-noir-200 hover:text-gold"
            >
              Về Chúng Tôi
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-xs uppercase tracking-luxury text-noir-200 hover:text-gold"
            >
              Liên Hệ
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
