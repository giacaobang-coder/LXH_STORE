'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/lib/firebase/auth'
import { getOrderHistory } from '@/lib/orders'
import type { Order } from '@/types/order'
import { LogOut, Package } from 'lucide-react'

export default function AccountPage() {
  const { user, isLoading, isConfigured } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  useEffect(() => {
    if (!user) return
    getOrderHistory(user.uid)
      .then(setOrders)
      .finally(() => setOrdersLoading(false))
  }, [user])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (isLoading || !user) {
    return (
      <div className="bg-noir min-h-screen flex items-center justify-center">
        <p className="text-noir-400">Đang tải...</p>
      </div>
    )
  }

  return (
    <div className="bg-noir min-h-screen">
      <div className="bg-noir-900 border-b border-white/10 py-16">
        <div className="container-custom flex justify-between items-center flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-3">Tài Khoản Của Tôi</p>
            <h1>{user.displayName || user.email}</h1>
          </div>
          <button onClick={handleLogout} className="btn-outline flex items-center gap-2">
            <LogOut size={16} strokeWidth={1.5} />
            Đăng Xuất
          </button>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Profile Info */}
        <div className="card p-8 mb-12 max-w-2xl">
          <h4 className="mb-6 text-white">Thông Tin Cá Nhân</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/10 pb-3">
              <span className="text-noir-400">Họ và tên</span>
              <span className="text-white">{user.displayName || '—'}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-3">
              <span className="text-noir-400">Email</span>
              <span className="text-white">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-noir-400">Thành viên từ</span>
              <span className="text-white">
                {user.metadata.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString('vi-VN')
                  : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div>
          <h4 className="mb-6 text-white">Lịch Sử Đơn Hàng</h4>

          {!isConfigured ? (
            <p className="text-noir-400 text-sm">
              Firebase chưa được cấu hình nên chưa có dữ liệu đơn hàng thật. Xem docs/FIREBASE_SETUP.md.
            </p>
          ) : ordersLoading ? (
            <p className="text-noir-400 text-sm">Đang tải đơn hàng...</p>
          ) : orders.length === 0 ? (
            <div className="card p-10 text-center">
              <Package size={40} strokeWidth={1} className="mx-auto text-noir-500 mb-4" />
              <p className="text-noir-400 mb-6">Bạn chưa có đơn hàng nào</p>
              <Link href="/products" className="btn-primary inline-block">
                Bắt Đầu Mua Sắm
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-luxury text-gold mb-1">
                        Đơn #{order.id?.slice(0, 8)}
                      </p>
                      <p className="text-noir-400 text-sm">
                        {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-luxury px-3 py-1 border border-gold/40 text-gold">
                      {order.status === 'pending' ? 'Đang xử lý' : 'Đã xác nhận'}
                    </span>
                  </div>
                  <div className="space-y-1 mb-4">
                    {order.items.map((item) => (
                      <p key={item.id} className="text-sm text-noir-300">
                        {item.name} × {item.quantity}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-between pt-4 border-t border-white/10">
                    <span className="text-noir-400 text-sm">Thanh toán: {order.paymentMethod.toUpperCase()}</span>
                    <span className="text-white font-medium">{order.total.toLocaleString('vi-VN')} ₫</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
