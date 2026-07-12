# 🚀 Quick Start - LXH Fashion Website

## ✅ Setup Xong!

Dependencies đã được cài đặt. Bây giờ chỉ cần chạy!

---

## 🎬 Chạy Development Server

### Cách 1: Terminal (Dễ nhất)

```bash
cd ~/Documents/BTMM/LXH-fashion-website
npm run dev
```

### Cách 2: Visual Studio Code

1. Mở **Terminal** trong VS Code (Ctrl+`)
2. Chạy:
   ```bash
   npm run dev
   ```

---

## 🌐 Mở Website

Sau khi chạy `npm run dev`, mở browser:

**👉 http://localhost:3000**

---

## 🧪 Test Features

| Trang | URL |
|-------|-----|
| Trang Chủ | http://localhost:3000 |
| Sản Phẩm | http://localhost:3000/products |
| Chi Tiết | http://localhost:3000/products/product-1 |
| Giỏ Hàng | http://localhost:3000/cart |
| Thanh Toán | http://localhost:3000/checkout |
| Về Chúng Tôi | http://localhost:3000/about |
| Liên Hệ | http://localhost:3000/contact |

---

## 🛑 Dừng Server

Nhấn **CTRL+C** trong Terminal

---

## 📝 Edit Code

Tất cả files ở:
- **Pages**: `app/` folder
- **Components**: `components/` folder
- **Styles**: `app/globals.css` (Tailwind)
- **Data**: `lib/products.ts`

Khi save file → Auto reload (hot reload) ✨

---

## 🔧 Troubleshoot

### Port 3000 đang dùng?
```bash
npm run dev -- -p 3001
```
Mở: http://localhost:3001

### Cannot find module?
```bash
npm install
npm run dev
```

### Cần rebuild?
```bash
rm -rf .next
npm run dev
```

---

## 📊 Project Status

✅ Frontend: Hoàn thành
✅ Design System: Minimalist/Sang trọng
✅ Cart: Zustand + localStorage
✅ Responsive: Mobile/Tablet/Desktop
❌ Backend: Cần setup (Firebase/Supabase)
❌ Payment: Mock only (Cần payment gateway)

---

## 🚀 Tiếp Theo

1. **Test website** trên http://localhost:3000
2. **Customize** theo ý thích (colors, logo, text)
3. **Push GitHub** (`SETUP.md` - Bước 5)
4. **Deploy** lên Vercel hoặc Hostinger (`SETUP.md` - Bước 6)

---

## ❓ Cần Giúp?

- **Lỗi gì?** Xem `SETUP.md` → Troubleshoot
- **Customize?** Sửa file trong `app/` và `components/`
- **Deploy?** Xem `SETUP.md` → Bước 5-6

---

**Happy coding! 🎉**
