import Link from 'next/link'

export default function CTA() {
  return (
    <section className="bg-primary-50 py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trở Thành Thành Viên VIP
          </h2>
          <p className="text-primary-600 mb-8 text-lg">
            Nhận quyền truy cập độc quyền vào bộ sưu tập mới, giảm giá đặc biệt và các sự kiện VIP
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup" className="btn-primary">
              Đăng Ký Miễn Phí
            </Link>
            <Link href="/contact" className="btn-secondary">
              Liên Hệ Chúng Tôi
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
