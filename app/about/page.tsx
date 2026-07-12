export default function AboutPage() {
  return (
    <div>
      <div className="bg-primary-50 border-b border-primary-200 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-bold">Về LXH Fashion</h1>
          <p className="text-primary-600 mt-4">Khám phá câu chuyện của thương hiệu</p>
        </div>
      </div>

      <div className="container-custom py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Chúng Là Ai?</h2>
          <p className="text-primary-600 text-lg mb-6 leading-relaxed">
            LXH Fashion là một thương hiệu thời trang cao cấp chuyên cung cấp những bộ sưu tập độc quyền
            cho những người yêu thích chất lượng, phong cách và sự sang trọng. Chúng tôi tin rằng thời trang
            không chỉ là quần áo, mà là cách bạn thể hiện bản thân mình.
          </p>

          <h2 className="text-3xl font-bold mb-6">Sứ Mệnh</h2>
          <p className="text-primary-600 text-lg mb-6 leading-relaxed">
            Mục tiêu của LXH là cung cấp các sản phẩm thời trang cao cấp với giá hợp lý, đồng thời
            duy trì chất lượng và phong cách tinh tế. Chúng tôi cam kết phục vụ khách hàng với
            dịch vụ tuyệt vời nhất.
          </p>

          <h2 className="text-3xl font-bold mb-6">Giá Trị Của Chúng Tôi</h2>
          <ul className="space-y-4 text-primary-600">
            <li className="flex gap-4">
              <span className="text-primary-700 font-bold">✓</span>
              <span><strong>Chất Lượng:</strong> Sử dụng chất liệu tốt nhất</span>
            </li>
            <li className="flex gap-4">
              <span className="text-primary-700 font-bold">✓</span>
              <span><strong>Phong Cách:</strong> Thiết kế hiện đại, tinh tế</span>
            </li>
            <li className="flex gap-4">
              <span className="text-primary-700 font-bold">✓</span>
              <span><strong>Dịch Vụ:</strong> Hỗ trợ khách hàng 24/7</span>
            </li>
            <li className="flex gap-4">
              <span className="text-primary-700 font-bold">✓</span>
              <span><strong>Bền Vững:</strong> Tôn trọng môi trường</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
