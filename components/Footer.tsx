import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-50 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">LXH Store</h3>
            <p className="text-primary-300">
              Thời trang cao cấp cho những người hiểu rõ giá trị của chất lượng và phong cách
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Sản Phẩm</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=women" className="text-primary-300 hover:text-white">
                  Nữ
                </Link>
              </li>
              <li>
                <Link href="/products?category=men" className="text-primary-300 hover:text-white">
                  Nam
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-primary-300 hover:text-white">
                  Phụ Kiện
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-primary-300 hover:text-white">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Công Ty</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-primary-300 hover:text-white">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-300 hover:text-white">
                  Liên Hệ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-primary-300 hover:text-white">
                  Vận Chuyển
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-primary-300 hover:text-white">
                  Hoàn Hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Nhận Tin Tức</h4>
            <p className="text-primary-300 mb-4">Đăng ký để nhận offer độc quyền</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-2 rounded text-primary-900"
              />
              <button type="submit" className="btn-primary">
                Đăng Ký
              </button>
            </form>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-primary-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-300">&copy; 2024 LXH Fashion. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
