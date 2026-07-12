# 🚀 Hướng Dẫn Setup & Deploy LXH Fashion Website

## 📋 Yêu Cầu
- macOS (như bạn đang dùng)
- Visual Studio Code
- Node.js 18+ (cần cài đặt)
- Git
- Tài khoản GitHub

---

## 🔧 BƯỚC 1: Cài Đặt Node.js

### Trên macOS:

**Cách 1: Dùng Homebrew (Dễ nhất)**
```bash
brew install node
```

**Cách 2: Download từ Website**
1. Vào https://nodejs.org/
2. Download LTS version
3. Cài đặt bình thường

**Kiểm tra cài đặt:**
```bash
node --version
npm --version
```

---

## 📦 BƯỚC 2: Setup Project

### 2.1 Mở Terminal

```bash
# Chuyển đến thư mục project
cd ~/Documents/BTMM/LXH-fashion-website
```

### 2.2 Cài Dependencies

```bash
npm install
```

⏳ Chờ ~3-5 phút (cài ~200 packages)

### 2.3 Chạy Dev Server

```bash
npm run dev
```

✅ Mở browser: **http://localhost:3000**

---

## 🎨 BƯỚC 3: Tùy Chỉnh (Optional)

### Sửa Thông Tin Thương Hiệu

**File**: `components/Footer.tsx` (dòng 13)
```tsx
<h3 className="text-2xl font-bold mb-4">LXH</h3>
```

**File**: `app/layout.tsx` (dòng 9)
```tsx
title: 'LXH Fashion - Thời Trang Cao Cấp',
```

### Sửa Logo & Icon

Tạo file `/public/logo.png` với logo của bạn

---

## 🏗️ BƯỚC 4: Build cho Production

```bash
npm run build
npm run start
```

---

## 📤 BƯỚC 5: Push lên GitHub

### 5.1 Tạo Repository trên GitHub

1. Vào https://github.com/new
2. Repository name: `lxh-fashion-website`
3. Chọn **Public**
4. Click **Create Repository**

### 5.2 Push Code

```bash
cd ~/Documents/BTMM/LXH-fashion-website

# Khởi tạo git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - LXH Fashion Website"

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/lxh-fashion-website.git

# Push
git branch -M main
git push -u origin main
```

✅ Code đã lên GitHub!

---

## 🌍 BƯỚC 6: Deploy lên Hostinger

### Cách 1: Dùng Vercel (Recommended - Dễ nhất)

#### 6.1.1 Tạo Account Vercel

1. Vào https://vercel.com
2. Click **Sign up with GitHub**
3. Authorize Vercel

#### 6.1.2 Import Project

1. Click **+ New Project**
2. Chọn repository `lxh-fashion-website`
3. Click **Import**
4. Vercel tự động build & deploy
5. Lấy URL (vd: `lxh-fashion.vercel.app`)

#### 6.1.3 Connect Custom Domain (Hostinger)

1. Trên Vercel, vào **Settings → Domains**
2. Click **Add Domain**
3. Nhập domain Hostinger (vd: `lxhfashion.com`)
4. Vercel sẽ đưa nameservers
5. Trên Hostinger cPanel:
   - Vào **Domains**
   - Chọn domain
   - Sửa nameservers thành của Vercel
6. Chờ 24-48h để cập nhật

### Cách 2: Deploy thẳng lên Hostinger (Advanced)

#### 6.2.1 Kết nối SSH

```bash
# Mở Terminal
ssh your_username@your_domain.com
# Nhập password

# Di chuyển đến thư mục public_html
cd public_html
```

#### 6.2.2 Clone Project

```bash
git clone https://github.com/YOUR_USERNAME/lxh-fashion-website.git lxh
cd lxh
```

#### 6.2.3 Cài Dependencies & Build

```bash
npm install
npm run build
```

#### 6.2.4 Start Server

```bash
# Cài PM2 (process manager)
npm install -g pm2

# Chạy app
pm2 start npm --name "lxh-fashion" -- start

# Lưu config
pm2 save
pm2 startup
```

---

## 🔗 Kiểm Tra & Troubleshoot

### Server không chạy?

```bash
# Kiểm tra port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Chạy lại
npm run dev
```

### Build failed?

```bash
# Xóa cache
rm -rf .next

# Rebuild
npm run build
```

### Dependencies error?

```bash
# Xóa node_modules
rm -rf node_modules
rm package-lock.json

# Cài lại
npm install
```

---

## 📊 Project Structure

```
LXH-fashion-website/
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   ├── products/        # Products listing
│   ├── products/[id]    # Product detail
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout page
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   └── globals.css      # Global styles
├── components/          # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   └── CTA.tsx
├── hooks/              # Custom React hooks
│   └── useCart.ts      # Cart state (Zustand)
├── lib/                # Utilities
│   └── products.ts     # Fake product data
├── public/             # Static assets
└── package.json
```

---

## 🎯 URLs Quan Trọng

| Trang | URL |
|-------|-----|
| Trang Chủ | `/` |
| Sản Phẩm | `/products` |
| Chi tiết | `/products/{id}` |
| Giỏ Hàng | `/cart` |
| Thanh Toán | `/checkout` |
| Về Chúng Tôi | `/about` |
| Liên Hệ | `/contact` |

---

## 📝 Notes

- Dữ liệu sản phẩm hiện là **fake** (trong `lib/products.ts`)
- Để kết nối thực tế database, cần setup backend (Firebase/Supabase)
- Thanh toán Momo/COD hiện là mock (cần integrate payment gateway)

---

## ✅ Checklist

- [ ] Cài Node.js
- [ ] Chạy `npm install`
- [ ] Chạy `npm run dev` (kiểm tra localhost:3000)
- [ ] Tùy chỉnh thương hiệu (nếu cần)
- [ ] Push lên GitHub
- [ ] Deploy lên Vercel hoặc Hostinger
- [ ] Connect custom domain
- [ ] Test trên mobile & desktop

---

## 🆘 Cần Giúp?

- **Docs Next.js**: https://nextjs.org/docs
- **Tailwind**: https://tailwindcss.com/docs
- **Zustand**: https://github.com/pmndrs/zustand
- **Email**: bang.gia@momo.vn

---

**🎉 Chúc mừng! Website của bạn đã sẵn sàng!**
