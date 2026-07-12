'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { placeOrder } from '@/lib/orders'
import { CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info')
  const [orderId, setOrderId] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
  })
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'cod'>('momo')
  const [isLoading, setIsLoading] = useState(false)

  const total = getTotalPrice()
  const shipping = total > 2000000 ? 0 : 50000
  const finalTotal = total + shipping

  if (items.length === 0 && step !== 'success') {
    return (
      <div className="container-custom py-20 text-center bg-noir min-h-screen">
        <p className="text-lg text-noir-400 mb-6">Giỏ hàng trống</p>
        <Link href="/products" className="btn-primary">
          Quay Lại Mua Sắm
        </Link>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).every((v) => v)) {
      setStep('payment')
    } else {
      alert('Vui lòng điền đầy đủ thông tin')
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const id = await placeOrder({
        customer: formData,
        items,
        total: finalTotal,
        paymentMethod,
        status: 'pending',
        createdAt: Date.now(),
      })

      setOrderId(id)
      clearCart()
      setStep('success')
    } catch (error) {
      console.error(error)
      alert('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  if (step === 'success') {
    return (
      <div className="container-custom py-20 bg-noir min-h-screen">
        <div className="max-w-md mx-auto text-center">
          <CheckCircle size={56} strokeWidth={1} className="mx-auto text-gold mb-6" />
          <h1 className="text-3xl mb-4">Đặt Hàng Thành Công!</h1>
          <p className="text-noir-400 mb-2">Cảm ơn bạn đã mua sắm tại LXH</p>
          <p className="text-noir-400 mb-8">Chúng tôi sẽ gửi email xác nhận đơn hàng sớm nhất</p>

          <div className="card p-6 mb-8">
            <p className="text-xs uppercase tracking-luxury text-noir-400 mb-2">Mã Đơn Hàng</p>
            <p className="text-xl text-gold">{orderId}</p>
          </div>

          <Link href="/products" className="btn-primary">
            Tiếp Tục Mua Sắm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-custom py-16 bg-noir min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Steps */}
        <div className="flex gap-4 mb-12">
          {['info', 'payment'].map((s, i) => (
            <div key={s} className="flex-1">
              <button
                onClick={() => step === 'payment' && s === 'info' && setStep('info')}
                className={`w-full py-3 text-xs uppercase tracking-luxury transition ${
                  step === s || (step === 'payment' && i === 0)
                    ? 'bg-gold text-noir-950'
                    : 'border border-white/10 text-noir-400'
                }`}
              >
                {i === 0 ? 'Thông Tin' : 'Thanh Toán'}
              </button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 'info' && (
              <form onSubmit={handleSubmitInfo} className="card p-8 space-y-6">
                <h2 className="text-2xl">Thông Tin Giao Hàng</h2>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Họ và Tên"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-3 bg-noir-950 border border-white/10 text-white placeholder:text-noir-500 focus:outline-none focus:border-gold"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-noir-950 border border-white/10 text-white placeholder:text-noir-500 focus:outline-none focus:border-gold"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Số Điện Thoại"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-noir-950 border border-white/10 text-white placeholder:text-noir-500 focus:outline-none focus:border-gold"
                    required
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Địa Chỉ"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-noir-950 border border-white/10 text-white placeholder:text-noir-500 focus:outline-none focus:border-gold"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-noir-950 border border-white/10 text-white focus:outline-none focus:border-gold"
                    required
                  >
                    <option value="">Chọn Tỉnh/Thành Phố</option>
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                    <option value="other">Khác</option>
                  </select>
                  <input
                    type="text"
                    name="district"
                    placeholder="Quận/Huyện"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-noir-950 border border-white/10 text-white placeholder:text-noir-500 focus:outline-none focus:border-gold"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Tiếp Tục Thanh Toán
                </button>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePayment} className="card p-8 space-y-6">
                <h2 className="text-2xl">Phương Thức Thanh Toán</h2>

                <div className="space-y-4">
                  <label
                    className={`flex gap-4 p-4 border cursor-pointer transition ${
                      paymentMethod === 'momo' ? 'border-gold' : 'border-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      checked={paymentMethod === 'momo'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'momo' | 'cod')}
                      className="mt-1 accent-[#c9a24b]"
                    />
                    <div>
                      <p className="font-medium text-white">Momo — Ví Điện Tử</p>
                      <p className="text-sm text-noir-400">Thanh toán nhanh chóng qua ứng dụng Momo</p>
                    </div>
                  </label>

                  <label
                    className={`flex gap-4 p-4 border cursor-pointer transition ${
                      paymentMethod === 'cod' ? 'border-gold' : 'border-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'momo' | 'cod')}
                      className="mt-1 accent-[#c9a24b]"
                    />
                    <div>
                      <p className="font-medium text-white">COD — Thanh Toán Khi Nhận Hàng</p>
                      <p className="text-sm text-noir-400">Thanh toán tiền mặt khi nhận đơn hàng</p>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep('info')}
                    className="flex-1 btn-outline"
                  >
                    Quay Lại
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {isLoading ? 'Đang xử lý...' : 'Hoàn Tất Đơn Hàng'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Summary */}
          <div className="card p-6 h-fit sticky top-24">
            <h4 className="mb-6 text-white">Tóm Tắt</h4>

            <div className="space-y-3 mb-6 pb-6 border-b border-white/10">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-noir-400">
                    {item.name.substring(0, 20)}… × {item.quantity}
                  </span>
                  <span className="text-white">
                    {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6 pb-6 border-b border-white/10 text-sm">
              <div className="flex justify-between">
                <span className="text-noir-400">Tạm tính</span>
                <span className="text-white">{total.toLocaleString('vi-VN')} ₫</span>
              </div>
              <div className="flex justify-between">
                <span className="text-noir-400">Vận chuyển</span>
                <span className="text-white">{shipping === 0 ? 'Miễn phí' : shipping.toLocaleString('vi-VN') + ' ₫'}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg">
              <span className="text-white">Tổng</span>
              <span className="text-gold font-medium">{finalTotal.toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
