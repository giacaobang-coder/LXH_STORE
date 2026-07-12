# Kết Nối Firebase (Database)

Website hoạt động ngay cả khi chưa có Firebase (dùng dữ liệu mẫu tạm thời).
Làm theo 5 bước dưới đây (~5 phút) để chuyển sang **database thật**.

## 1. Tạo Firebase Project

1. Vào https://console.firebase.google.com
2. Click **"Add project"** → đặt tên (vd: `lxh-store`) → Create

## 2. Bật Firestore Database

1. Trong project, vào **Build → Firestore Database**
2. Click **"Create database"** → chọn **Production mode** → chọn region (vd: `asia-southeast1`)

## 3. Bật Đăng Nhập (Authentication)

1. Vào **Build → Authentication → Get started**
2. Tab **Sign-in method** → chọn **Email/Password** → Enable → Save

Bước này bật tính năng đăng ký/đăng nhập/tài khoản trên web.

## 4. Lấy Config Cho Web App (Client SDK)

1. Vào **Project Settings** (icon bánh răng) → tab **General**
2. Scroll xuống **"Your apps"** → click icon Web `</>`
3. Đặt tên app → Register
4. Copy các giá trị trong `firebaseConfig` và dán vào `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 5. Lấy Service Account (Admin SDK — chỉ dùng để seed data)

1. Vào **Project Settings → Service accounts**
2. Click **"Generate new private key"** → tải file JSON
3. Mở file, copy 3 giá trị vào `.env.local`:

```
FIREBASE_PROJECT_ID=<project_id trong file JSON>
FIREBASE_CLIENT_EMAIL=<client_email trong file JSON>
FIREBASE_PRIVATE_KEY="<private_key trong file JSON, giữ nguyên dấu \n>"
```

⚠️ **Không commit file JSON này lên GitHub.**

## 6. Seed Dữ Liệu Mẫu

```bash
npm install
npm run seed
```

Lệnh này đẩy 100 sản phẩm mẫu vào Firestore collection `products`.

## 7. Deploy lên Vercel

Vào Vercel Dashboard → Project → **Settings → Environment Variables** → thêm tất cả biến ở bước 4 (không cần biến Admin SDK trên Vercel — chỉ dùng lúc seed local). Redeploy.

## 8. Lịch Sử Đơn Hàng — Composite Index

Lần đầu vào trang **Tài Khoản** sau khi có đơn hàng, Firestore có thể báo lỗi thiếu index (query lọc theo `userId` + sắp xếp theo `createdAt`). Mở link trong lỗi đó (hiện trong Console trình duyệt) → Firebase tự tạo index → chờ ~1 phút → thử lại.

---

Xong! Trang web sẽ tự động đọc dữ liệu từ Firestore, hỗ trợ đăng nhập/đăng ký và lưu lịch sử đơn hàng thay vì dữ liệu mẫu.
