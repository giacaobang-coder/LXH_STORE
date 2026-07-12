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
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Giỏ Hàng Của Bạn Trống</h1>
        <p className="text-primary-600 mb-8">Hãy bắt đầu mua sắm ngay</p>
        <Link href="/products" className="btn-primary">
          Tiếp Tục Mua Sắm
        </Link>
      </div>
    )
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-12">Giỏ Hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-6 flex gap-6">
                <div className="relative w-24 h-32 overflow-hidden rounded bg-primary-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-primary-600 mb-2">
                      {item.color && `Màu: ${item.color}`}
                      {item.size && ` | Kích cỡ: ${item.size}`}
                    </p>
                    <p className="font-semibold text-primary-900">
                      {item.price.toLocaleString('vi-VN')} VND
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 border border-primary-200 rounded hover:bg-primary-50"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border border-primary-200 rounded hover:bg-primary-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="card p-6 h-fit sticky top-24">
          <h2 className="font-bold text-xl mb-6">Tóm Tắt Đơn Hàng</h2>

          <div className="space-y-4 mb-6 pb-6 border-b border-primary-200">
            <div className="flex justify-between">
              <span className="text-primary-600">Tạm tính:</span>
              <span className="font-semibold">{total.toLocaleString('vi-VN')} VND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-600">Vận chuyển:</span>
              <span className="font-semibold">
                {shipping === 0 ? 'Miễn phí' : shipping.toLocaleString('vi-VN') + ' VND'}
              </span>
            </div>
            {total < 2000000 && (
              <p className="text-sm text-primary-500">
                Mua thêm {(2000000 - total).toLocaleString('vi-VN')} VND để được miễn vận chí
              </p>
            )}
          </div>

          <div className="flex justify-between mb-6 text-lg font-bold">
            <span>Tổng:</span>
            <span className="text-primary-700">{(total + shipping).toLocaleString('vi-VN')} VND</span>
          </div>

          <Link href="/checkout" className="btn-primary w-full text-center block mb-4">
            Tiến Hành Thanh Toán
          </Link>

          <button
            onClick={() => clearCart()}
            className="btn-secondary w-full text-center"
          >
            Xóa Giỏ Hàng
          </button>

          <Link href="/products" className="block text-center mt-4 text-primary-700 hover:underline">
            ← Tiếp Tục Mua Sắm
          </Link>
        </div>
      </div>
    </div>
  )
}
