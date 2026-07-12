import Link from 'next/link'

export default function CTA() {
  return (
    <section className="bg-noir-900 border-t border-white/10 py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow mb-4">Thành Viên VIP</p>
          <h2 className="text-3xl md:text-4xl mb-6">
            Trở Thành Thành Viên LXH
          </h2>
          <p className="text-noir-300 mb-10 text-lg">
            Nhận quyền truy cập độc quyền vào bộ sưu tập mới, ưu đãi đặc biệt và các sự kiện riêng tư
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="btn-primary">
              Đăng Ký Miễn Phí
            </Link>
            <Link href="/contact" className="btn-outline">
              Liên Hệ Chúng Tôi
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
