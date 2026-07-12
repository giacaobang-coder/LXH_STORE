# LXH — Maison de Mode

Website thương mại điện tử thời trang cao cấp. Next.js 14 (App Router) + TypeScript + Tailwind CSS + Firebase (Firestore).

## Cấu Trúc Dự Án

```
LXH-fashion-website/
├── src/
│   ├── app/                 # Routes (Next.js App Router) — pages & layouts
│   ├── components/          # Presentational UI components
│   ├── hooks/                # Client-side state (useCart — Zustand)
│   ├── lib/                  # Data-access layer (frontend-facing)
│   │   ├── firebase/          client.ts (Firebase client SDK), products.ts, orders.ts
│   │   ├── products.ts        public API: Firestore if configured, else mock fallback
│   │   ├── mock-products.ts   generated fallback catalog (real photos via LoremFlickr)
│   │   ├── orders.ts          order persistence (Firestore or console fallback)
│   │   └── constants.ts       category/subcategory taxonomy (static config)
│   ├── server/               # Server/admin-only code — never imported by the client
│   │   └── firebase/admin.ts  Firebase Admin SDK (used by scripts/seed.ts)
│   ├── types/                 Shared TypeScript interfaces (Product, Order)
│   └── styles/                (reserved for future shared style modules)
├── scripts/
│   └── seed.ts               # Populates Firestore with the product catalog
├── docs/                     # Setup guides
│   ├── FIREBASE_SETUP.md      How to connect a real database (5 min)
│   ├── SETUP.md               macOS / VS Code / GitHub / Hostinger walkthrough
│   └── QUICK_START.md
├── .env.example               Environment variable template
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

**Frontend / Backend / Database separation:**
- **Frontend** — `src/app`, `src/components`, `src/hooks` (client-rendered UI)
- **Backend** — `src/lib` (data-access services called from the frontend) + `src/server` (privileged, server-only Firebase Admin access used only by `scripts/seed.ts`)
- **Database** — Firebase Firestore, collections `products` and `orders`

## Chạy Local

```bash
npm install
npm run dev
```

Mở http://localhost:3000 — hoạt động ngay với dữ liệu mẫu (không cần Firebase).

## Kết Nối Database Thật

Xem [docs/FIREBASE_SETUP.md](docs/FIREBASE_SETUP.md) — 5 phút để chuyển từ mock data sang Firestore.

```bash
npm run seed   # đẩy 100 sản phẩm mẫu vào Firestore, sau khi đã cấu hình .env.local
```

## Design System

Phong cách **Dark Luxury** — nền đen (`noir`), điểm nhấn vàng (`gold`), font serif (Playfair Display) cho tiêu đề, font sans (Jost) cho nội dung. Xem `tailwind.config.ts` và `src/app/globals.css`.

## Deploy

Push lên `main` → Vercel tự động build & deploy. Xem [docs/SETUP.md](docs/SETUP.md) để biết chi tiết GitHub + Vercel + Hostinger.
