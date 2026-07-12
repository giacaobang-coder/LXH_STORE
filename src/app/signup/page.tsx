'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerWithEmail } from '@/lib/firebase/auth'
import { useAuth } from '@/hooks/useAuth'

export default function SignupPage() {
  const router = useRouter()
  const { isConfigured } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.')
      return
    }

    setIsLoading(true)
    try {
      await registerWithEmail(name, email, password)
      router.push('/account')
    } catch (err: any) {
      if (err?.code === 'auth/email-already-in-use') {
        setError('Email này đã được đăng ký.')
      } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-noir min-h-screen flex items-center justify-center py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Gia Nhập LXH</p>
          <h1 className="text-3xl">Tạo Tài Khoản</h1>
        </div>

        {!isConfigured && (
          <div className="mb-6 p-4 border border-gold/40 text-gold text-sm text-center">
            Firebase chưa được cấu hình. Xem docs/FIREBASE_SETUP.md để bật đăng ký.
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          {error && (
            <div className="p-3 border border-red-500/40 text-red-400 text-sm">{error}</div>
          )}
          <div>
            <label className="block text-xs uppercase tracking-luxury text-noir-400 mb-2">Họ Và Tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-noir-950 border border-white/10 text-white focus:outline-none focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-luxury text-noir-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-noir-950 border border-white/10 text-white focus:outline-none focus:border-gold"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-luxury text-noir-400 mb-2">Mật Khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-noir-950 border border-white/10 text-white focus:outline-none focus:border-gold"
              required
            />
          </div>
          <button type="submit" disabled={isLoading || !isConfigured} className="btn-primary w-full disabled:opacity-50">
            {isLoading ? 'Đang tạo tài khoản...' : 'Đăng Ký'}
          </button>
        </form>

        <p className="text-center text-noir-400 text-sm mt-6">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-gold hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
