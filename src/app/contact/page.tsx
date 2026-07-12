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
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="bg-noir min-h-screen">
      <div className="bg-noir-900 border-b border-white/10 py-16">
        <div className="container-custom">
          <p className="eyebrow mb-3">Kết Nối</p>
          <h1>Liên Hệ Với Chúng Tôi</h1>
        </div>
      </div>

      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-10">
            <h2>Thông Tin Liên Hệ</h2>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-11 h-11 border border-gold/40 flex items-center justify-center">
                <Phone className="text-gold" size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="mb-1 text-noir-400">Điện Thoại</h4>
                <p className="text-white">+84 (0)1234 567 890</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-11 h-11 border border-gold/40 flex items-center justify-center">
                <Mail className="text-gold" size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="mb-1 text-noir-400">Email</h4>
                <p className="text-white">hello@lxh.com</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex-shrink-0 w-11 h-11 border border-gold/40 flex items-center justify-center">
                <MapPin className="text-gold" size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="mb-1 text-noir-400">Địa Chỉ</h4>
                <p className="text-white">123 Nguyễn Huệ, Quận 1<br />TP. Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h4 className="mb-4 text-noir-400">Giờ Làm Việc</h4>
              <p className="text-white leading-loose">
                Thứ 2 – Thứ 6: 9:00 – 18:00<br />
                Thứ 7: 10:00 – 17:00<br />
                Chủ Nhật: Đóng cửa
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="card p-8 space-y-6">
            <h2 className="text-2xl">Gửi Tin Nhắn</h2>

            {isSubmitted && (
              <div className="p-4 border border-gold/40 text-gold text-sm">
                ✓ Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-luxury text-noir-400 mb-2">Tên Của Bạn</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-noir-950 border border-white/10 text-white focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-noir-400 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-noir-950 border border-white/10 text-white focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-noir-400 mb-2">Chủ Đề</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-noir-950 border border-white/10 text-white focus:outline-none focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-noir-400 mb-2">Tin Nhắn</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 bg-noir-950 border border-white/10 text-white focus:outline-none focus:border-gold"
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
