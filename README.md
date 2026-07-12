# LXH Fashion Store - Website Thương Mại Điện Tử

Website thời trang cao cấp cho thương hiệu **LXH** - được xây dựng bằng **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, và **Zustand**.

## 🎯 Tính Năng

✅ **Catalog Sản Phẩm**: Hiển thị 100+ sản phẩm thời trang cao cấp
✅ **Lọc & Tìm Kiếm**: Lọc theo danh mục, sắp xếp theo giá/đánh giá
✅ **Chi Tiết Sản Phẩm**: Xem đầy đủ thông tin, chọn màu/kích cỡ
✅ **Giỏ Hàng**: Quản lý giỏ hàng với Zustand (lưu trữ local)
✅ **Thanh Toán**: Hỗ trợ Momo và COD
✅ **Responsive Design**: Tối ưu hóa cho mobile, tablet, desktop
✅ **Design Hệ Thống**: Màu sắc tối giản, typography sang trọng

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **State Management**: Zustand
- **UI Components**: Radix UI + Lucide Icons
- **Image**: Next.js Image Optimization
- **Icons**: Lucide React (18+ icons)

## 🚀 Cài Đặt & Chạy

### Yêu Cầu
- Node.js 18+ 
- npm hoặc yarn

### Bước 1: Cài Đặt Dependencies
```bash
cd LXH-fashion-website
npm install
```

### Bước 2: Chạy Development Server
```bash
npm run dev
```

Mở trình duyệt: **http://localhost:3000**

### Bước 3: Build cho Production
```bash
npm run build
npm run start
```

## 📂 Cấu Trúc Thư Mục

```
LXH-fashion-website/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Trang chủ
│   ├── globals.css             # Tailwind config
│   ├── products/
│   │   ├── page.tsx            # Danh sách sản phẩm
│   │   └── [id]/
│   │       └── page.tsx        # Chi tiết sản phẩm
│   ├── cart/
│   │   └── page.tsx            # Giỏ hàng
│   └── checkout/
│       └── page.tsx            # Thanh toán
├── components/
│   ├── Header.tsx              # Header & Navigation
│   ├── Footer.tsx              # Footer
│   ├── Hero.tsx                # Hero section
│   ├── ProductCard.tsx         # Product card component
│   ├── ProductGrid.tsx         # Product grid
│   └── CTA.tsx                 # Call-to-action
├── hooks/
│   └── useCart.ts              # Cart state management
├── lib/
│   └── products.ts             # Fake product data
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .gitignore
```

## 🎨 Design System

### Màu Sắc (Minimalist - Sang Trọng)
- **Primary**: Brown (#92804d) - Chính
- **Accent**: Beige (#8b8076) - Accent
- **Base**: White + Light Gray - Nền

### Typography
- **Sans**: Geist Font
- **Headings**: Bold, tracking-tight
- **Body**: 16px, line-height 1.5

## 📄 Pages

| Đường dẫn | Mô tả |
|----------|-------|
| `/` | Trang chủ với hero & sản phẩm nổi bật |
| `/products` | Danh sách tất cả sản phẩm |
| `/products/[id]` | Chi tiết sản phẩm, chọn màu/kích cỡ |
| `/cart` | Giỏ hàng của người dùng |
| `/checkout` | Thanh toán & nhập thông tin giao hàng |

## 🛒 Giỏ Hàng

Sử dụng **Zustand** để quản lý state giỏ hàng:
- Lưu trữ tự động vào localStorage
- Persist giữa các session
- Thêm/xóa/cập nhật số lượng

```typescript
import { useCart } from '@/hooks/useCart'

const { items, addItem, removeItem, getTotalPrice } = useCart()
```

## 💰 Sản Phẩm Fake

Dữ liệu sản phẩm được tạo ngẫu nhiên trong `lib/products.ts`:
- 100 sản phẩm đa dạng
- Giá từ 500K - 5M VND
- Danh mục: Women, Men, Accessories
- Rating & Reviews ngẫu nhiên

## 📱 Responsive

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: ≥ 1024px

## 🚀 Deploy lên Hostinger

### Cách 1: Dùng cPanel (Recommended)

1. **Build project locally**:
   ```bash
   npm run build
   ```

2. **Upload qua FTP/SFTP**:
   - Cài FileZilla hoặc WinSCP
   - Upload thư mục `LXH-fashion-website` lên public_html

3. **Chạy trên Hostinger**:
   - SSH vào server
   ```bash
   cd ~/public_html/LXH-fashion-website
   npm install
   npm start
   ```

### Cách 2: Dùng GitHub + Vercel (Easiest)

1. **Push lên GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect Vercel**:
   - Vào vercel.com
   - Import project từ GitHub
   - Deploy automatically

3. **Custom Domain trên Hostinger**:
   - Cập nhật nameservers trỏ về Vercel

## 🔧 Configuration

### Tailwind Config (`tailwind.config.ts`)
```typescript
colors: {
  primary: { ... },    // Brown tones
  accent: { ... },     // Beige tones
}
```

### Next.js Config (`next.config.js`)
```javascript
images: {
  remotePatterns: [{ protocol: 'https', hostname: '**' }]
}
```

## 📚 API Endpoints (Frontend Only)

Hiện tại là **SSR/SSG**, không có backend API riêng.
Dữ liệu được mock trong `lib/products.ts`.

## 🔐 Environment Variables

Tạo `.env.local`:
```
NEXT_PUBLIC_API_URL=https://your-api.com
```

## 📧 Contact

- Email: bang.gia@momo.vn
- Website: https://lxhfashion.com (future)

## 📄 License

© 2024 LXH Fashion. All rights reserved.

---

**Built with ❤️ using Next.js**
