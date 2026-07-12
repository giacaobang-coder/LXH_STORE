'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send to backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div>
      <div className="bg-primary-50 border-b border-primary-200 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-primary-600 mt-4">Chúng tôi luôn sẵn sàng giúp bạn</p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Thông Tin Liên Hệ</h2>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Phone className="text-primary-700" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Điện Thoại</h3>
                <p className="text-primary-600">+84 (0)1234 567 890</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Mail className="text-primary-700" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-primary-600">hello@lxhfashion.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <MapPin className="text-primary-700" size={24} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Địa Chỉ</h3>
                <p className="text-primary-600">123 Nguyễn Huệ, Quận 1<br />TP. Hồ Chí Minh, Vietnam</p>
              </div>
            </div>

            <div className="pt-8 border-t border-primary-200">
              <h3 className="font-semibold mb-4">Giờ Làm Việc</h3>
              <p className="text-primary-600">
                Thứ 2 - Thứ 6: 9:00 - 18:00<br />
                Thứ 7: 10:00 - 17:00<br />
                Chủ Nhật: Đóng cửa
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="card p-8 space-y-6">
            <h2 className="text-2xl font-bold">Gửi Tin Nhắn</h2>

            {isSubmitted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                ✓ Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Tên Của Bạn</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Chủ Đề</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Tin Nhắn</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
