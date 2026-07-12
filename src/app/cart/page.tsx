'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart()
  const total = getTotalPrice()
  const shipping = total > 2000000 ? 0 : 50000

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-noir">
        <h1 className="text-3xl mb-4">Giỏ Hàng Của Bạn Trống</h1>
        <p className="text-noir-400 mb-8">Hãy bắt đầu mua sắm ngay</p>
        <Link href="/products" className="btn-primary">
          Tiếp Tục Mua Sắm
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-16 bg-noir min-h-screen">
      <h1 className="mb-12">Giỏ Hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-6 flex gap-6">
                <div className="relative w-24 h-32 overflow-hidden bg-noir-800 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg mb-1 text-white">{item.name}</h3>
                    <p className="text-sm text-noir-400 mb-2">
                      {item.color && `Màu: ${item.color}`}
                      {item.size && ` | Kích cỡ: ${item.size}`}
                    </p>
                    <p className="font-medium text-white">
                      {item.price.toLocaleString('vi-VN')} ₫
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 border border-white/20 text-white hover:border-gold hover:text-gold transition"
                      >
                        −
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-white/20 text-white hover:border-gold hover:text-gold transition"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-noir-400 hover:text-red-400 transition"
                    >
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="card p-6 h-fit sticky top-24">
          <h4 className="mb-6 text-white">Tóm Tắt Đơn Hàng</h4>

          <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
            <div className="flex justify-between text-sm">
              <span className="text-noir-400">Tạm tính</span>
              <span className="text-white">{total.toLocaleString('vi-VN')} ₫</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-noir-400">Vận chuyển</span>
              <span className="text-white">
                {shipping === 0 ? 'Miễn phí' : shipping.toLocaleString('vi-VN') + ' ₫'}
              </span>
            </div>
            {total < 2000000 && (
              <p className="text-xs text-gold">
                Mua thêm {(2000000 - total).toLocaleString('vi-VN')} ₫ để được miễn vận chuyển
              </p>
            )}
          </div>

          <div className="flex justify-between mb-6 text-lg">
            <span className="text-white">Tổng</span>
            <span className="text-gold font-medium">{(total + shipping).toLocaleString('vi-VN')} ₫</span>
          </div>

          <Link href="/checkout" className="btn-primary w-full text-center block mb-3">
            Tiến Hành Thanh Toán
          </Link>

          <button
            onClick={() => clearCart()}
            className="btn-outline w-full text-center"
          >
            Xóa Giỏ Hàng
          </button>

          <Link href="/products" className="block text-center mt-4 text-noir-400 hover:text-gold text-sm transition">
            ← Tiếp Tục Mua Sắm
          </Link>
        </div>
      </div>
    </div>
  )
}
