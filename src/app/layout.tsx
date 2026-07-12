import type { Metadata } from 'next'
import { Jost, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/hooks/useAuth'

const jost = Jost({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lxh-store.vercel.app'),
  title: 'LXH — Maison de Mode',
  description: 'LXH — Thời trang cao cấp. Di sản, thủ công và sự sang trọng vượt thời gian.',
  openGraph: {
    title: 'LXH — Maison de Mode',
    description: 'LXH — Thời trang cao cấp. Di sản, thủ công và sự sang trọng vượt thời gian.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${jost.variable} ${playfair.variable} antialiased bg-noir text-white`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
