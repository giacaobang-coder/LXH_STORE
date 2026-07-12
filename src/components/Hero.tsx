import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-noir text-white py-32 md:py-44 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=1200&fit=crop&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/70 to-noir/40" />

      <div className="container-custom relative">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">Bộ Sưu Tập Mới</p>
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
            Thời Trang<br />Vượt Thời Gian
          </h1>
          <p className="text-noir-200 mb-10 max-w-md">
            Khám phá bộ sưu tập độc quyền từ LXH — nơi di sản, thủ công tinh xảo và sự sang trọng hội tụ
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="btn-primary">
              Khám Phá Bộ Sưu Tập
            </Link>
            <Link href="/about" className="btn-outline">
              Câu Chuyện LXH
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
