'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { loginWithEmail } from '@/lib/firebase/auth'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const router = useRouter()
  const { isConfigured } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await loginWithEmail(email, password)
      router.push('/account')
    } catch (err) {
      setError('Email hoặc mật khẩu không đúng.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-noir min-h-screen flex items-center justify-center py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Chào Mừng Trở Lại</p>
          <h1 className="text-3xl">Đăng Nhập</h1>
        </div>

        {!isConfigured && (
          <div className="mb-6 p-4 border border-gold/40 text-gold text-sm text-center">
            Firebase chưa được cấu hình. Xem docs/FIREBASE_SETUP.md để bật đăng nhập.
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          {error && (
            <div className="p-3 border border-red-500/40 text-red-400 text-sm">{error}</div>
          )}
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
            {isLoading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>

        <p className="text-center text-noir-400 text-sm mt-6">
          Chưa có tài khoản?{' '}
          <Link href="/signup" className="text-gold hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
