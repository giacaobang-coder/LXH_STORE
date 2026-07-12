import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'LXH Store - Thời Trang Cao Cấp',
  description: 'Khám phá bộ sưu tập thời trang cao cấp LXH Store - Phong cách, chất lượng, và sang trọng',
  openGraph: {
    title: 'LXH Store - Thời Trang Cao Cấp',
    description: 'Khám phá bộ sưu tập thời trang cao cấp LXH Store',
    images: ['/logo.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-primary-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
