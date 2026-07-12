export default function AboutPage() {
  return (
    <div className="bg-noir min-h-screen">
      <div className="bg-noir-900 border-b border-white/10 py-16">
        <div className="container-custom">
          <p className="eyebrow mb-3">Câu Chuyện</p>
          <h1>Về LXH</h1>
        </div>
      </div>

      <div className="container-custom py-20">
        <div className="max-w-3xl">
          <h2 className="mb-6">Chúng Tôi Là Ai</h2>
          <p className="text-noir-300 text-lg mb-12 leading-relaxed">
            LXH là thương hiệu thời trang cao cấp chuyên cung cấp những bộ sưu tập độc quyền
            cho những người yêu thích chất lượng, phong cách và sự sang trọng. Chúng tôi tin rằng thời trang
            không chỉ là quần áo, mà là cách bạn thể hiện bản thân mình.
          </p>

          <h2 className="mb-6">Sứ Mệnh</h2>
          <p className="text-noir-300 text-lg mb-12 leading-relaxed">
            Mục tiêu của LXH là cung cấp các sản phẩm thời trang cao cấp với giá hợp lý, đồng thời
            duy trì chất lượng và phong cách tinh tế. Chúng tôi cam kết phục vụ khách hàng với
            dịch vụ tuyệt vời nhất.
          </p>

          <h2 className="mb-8">Giá Trị Của Chúng Tôi</h2>
          <ul className="space-y-6 text-noir-300">
            <li className="flex gap-4 border-b border-white/10 pb-6">
              <span className="text-gold">01</span>
              <span><strong className="text-white">Chất Lượng</strong> — Sử dụng chất liệu tốt nhất</span>
            </li>
            <li className="flex gap-4 border-b border-white/10 pb-6">
              <span className="text-gold">02</span>
              <span><strong className="text-white">Phong Cách</strong> — Thiết kế hiện đại, tinh tế</span>
            </li>
            <li className="flex gap-4 border-b border-white/10 pb-6">
              <span className="text-gold">03</span>
              <span><strong className="text-white">Dịch Vụ</strong> — Hỗ trợ khách hàng 24/7</span>
            </li>
            <li className="flex gap-4">
              <span className="text-gold">04</span>
              <span><strong className="text-white">Bền Vững</strong> — Tôn trọng môi trường</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
