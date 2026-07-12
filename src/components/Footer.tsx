import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-noir-950 text-white border-t border-white/10 mt-20">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif tracking-luxury mb-4">LXH</h3>
            <p className="text-noir-400 text-sm leading-relaxed">
              Thời trang cao cấp cho những người hiểu rõ giá trị của chất lượng và phong cách vượt thời gian
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-5">Sản Phẩm</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=women" className="text-noir-400 text-sm hover:text-gold transition-colors">
                  Nữ
                </Link>
              </li>
              <li>
                <Link href="/products?category=men" className="text-noir-400 text-sm hover:text-gold transition-colors">
                  Nam
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-noir-400 text-sm hover:text-gold transition-colors">
                  Phụ Kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5">Công Ty</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-noir-400 text-sm hover:text-gold transition-colors">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-noir-400 text-sm hover:text-gold transition-colors">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-5">Nhận Tin Tức</h4>
            <p className="text-noir-400 text-sm mb-4">Đăng ký để nhận offer độc quyền</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-2 bg-transparent border border-white/20 text-white text-sm placeholder:text-noir-500 focus:outline-none focus:border-gold"
              />
              <button type="submit" className="btn-primary px-4">
                →
              </button>
            </form>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-noir-500 text-xs tracking-wide">&copy; 2024 LXH. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-noir-400 hover:text-gold transition-colors">
                <Facebook size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-noir-400 hover:text-gold transition-colors">
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-noir-400 hover:text-gold transition-colors">
                <Twitter size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
