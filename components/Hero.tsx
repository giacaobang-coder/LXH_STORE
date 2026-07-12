import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary-900 to-primary-700 text-white py-24">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Thời Trang Cao Cấp Cho Cuộc Sống Hiện Đại
          </h1>
          <p className="text-xl text-primary-100 mb-8">
            Khám phá bộ sưu tập độc quyền từ LXH - nơi phong cách gặp gỡ chất lượng và sự sang trọng
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="btn-primary bg-white text-primary-900 hover:bg-primary-100"
            >
              Khám Phá Ngay
            </Link>
            <Link href="/about" className="btn-outline border-white text-white hover:bg-white/10">
              Về Chúng Tôi
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
