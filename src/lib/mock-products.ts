import type { Product } from '@/types/product'
import { SUBCATEGORIES, CategoryId } from '@/lib/constants'

// Fallback catalog used only when Firestore is not configured (see lib/products.ts).
// Images are real photographs served by LoremFlickr, matched to each subcategory's
// English keyword so a "bag" product shows a real bag photo, a "dress" shows a dress, etc.

const colors = ['Black', 'White', 'Navy', 'Beige', 'Brown', 'Gray', 'Cream']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

const productNames: Record<CategoryId, Record<string, string[]>> = {
  women: {
    'Áo': ['Áo Blouse Lụa', 'Áo Sơ Mi Linen', 'Áo T-Shirt Cotton', 'Áo Tank Top', 'Áo Cardigan Cashmere', 'Áo Hoodie Premium', 'Áo Khoác Blazer'],
    'Quần': ['Quần Jean Cao Cấp', 'Quần Chino Tây Kỳ', 'Quần Culottes', 'Quần Baggy', 'Quần Legging Premium', 'Quần Kaki Sang Trọng', 'Quần Harem'],
    'Váy': ['Váy Cocktail', 'Váy Maxi Bohemian', 'Váy Slip Satin', 'Váy Mini Denim', 'Váy Chữ A', 'Váy Wrap', 'Váy Tulle'],
    'Giày': ['Giày Cao Gót Lụa', 'Giày Bệt Loafer', 'Giày Sneaker Premium', 'Giày Boot Cao', 'Giày Sandal Sang Trọng', 'Giày Mule', 'Giày Mary Jane'],
    'Túi': ['Túi Xách Tay Cao Cấp', 'Túi Đeo Chéo', 'Túi Clutch', 'Túi Hobo', 'Túi Tote', 'Túi Satchel', 'Túi Crossbody'],
    'Phụ kiện': ['Dây Nịt Da', 'Khăn Lụa', 'Vòng Tay', 'Mũ Fedora', 'Kính Mát'],
  },
  men: {
    'Áo': ['Áo Sơ Mi Linen', 'Áo Polo Premium', 'Áo Sweater Cashmere', 'Áo T-Shirt Organic', 'Áo Khoác Blazer', 'Áo Hoodie'],
    'Quần': ['Quần Jean Cao Cấp', 'Quần Chino Tây Kỳ', 'Quần Tây Formal', 'Quần Shorts', 'Quần Cargo', 'Quần Jogger'],
    'Giày': ['Giày Oxford Lịch Lãm', 'Giày Loafer', 'Giày Sneaker Designer', 'Giày Boot Chelsea', 'Giày Slip On', 'Giày Derby'],
    'Túi': ['Túi Xách Nam', 'Túi Đeo Chéo', 'Túi Laptop', 'Túi Du Lịch', 'Túi Công Sở'],
    'Phụ kiện': ['Dây Nịt Da', 'Cà Vạt', 'Vòng Tay', 'Mũ Nón', 'Khăn Vuông'],
  },
  accessories: {
    'Túi': ['Túi Tote Premium', 'Túi Crossbody', 'Túi Clutch Đính Đá', 'Túi Hobo Nữ', 'Túi Satchel Nam', 'Túi Bucket'],
    'Dây nịt': ['Dây Nịt Da Bò', 'Dây Nịt Vải', 'Dây Nịt Sang Trọng', 'Dây Nịt Thời Trang'],
    'Khăn': ['Khăn Lụa Thái', 'Khăn Cashmere', 'Khăn Sợi Tươi', 'Khăn Bandana'],
    'Vòng tay': ['Vòng Tay Vàng', 'Vòng Tay Bạc', 'Vòng Tay Hạt', 'Vòng Tay Charm'],
    'Nón': ['Nón Fedora', 'Nón Snapback', 'Nón Beanie', 'Nón Panama'],
    'Mắt kính': ['Kính Mát Thời Trang', 'Kính Aviator', 'Kính Tròn Vintage', 'Kính Cat Eye'],
  },
}

// English keywords matched per (category, subcategory) so the placeholder photo
// actually depicts the kind of item being sold.
const imageKeywords: Record<string, string> = {
  'women:Áo': 'blouse,women,fashion',
  'women:Quần': 'women,pants,fashion',
  'women:Váy': 'dress,women,fashion',
  'women:Giày': 'heels,shoes,women',
  'women:Túi': 'handbag,leather,luxury',
  'women:Phụ kiện': 'accessories,jewelry,fashion',
  'men:Áo': 'shirt,men,fashion',
  'men:Quần': 'men,trousers,fashion',
  'men:Giày': 'oxford,shoes,men',
  'men:Túi': 'briefcase,leather,men',
  'men:Phụ kiện': 'necktie,men,fashion',
  'accessories:Túi': 'handbag,luxury,leather',
  'accessories:Dây nịt': 'belt,leather,fashion',
  'accessories:Khăn': 'silk,scarf,fashion',
  'accessories:Vòng tay': 'bracelet,jewelry,gold',
  'accessories:Nón': 'hat,fashion,fedora',
  'accessories:Mắt kính': 'sunglasses,fashion',
}

function roundPrice(price: number): number {
  return Math.round(price / 100000) * 100000
}

function generateProducts(): Product[] {
  const products: Product[] = []
  const categories: CategoryId[] = ['women', 'men', 'accessories']

  for (let i = 0; i < 100; i++) {
    const category = categories[i % categories.length]
    const categorySubcats = SUBCATEGORIES[category]
    const subcategory = categorySubcats[Math.floor(i / categories.length) % categorySubcats.length]

    const namesForSub = productNames[category][subcategory] ?? ['Sản Phẩm LXH']
    const productName = `${namesForSub[i % namesForSub.length]}`

    const basePrice = category === 'accessories' ? 500000 : 1500000
    const randomPrice = basePrice + ((i * 137) % 2000000)

    const keyword = imageKeywords[`${category}:${subcategory}`] || 'fashion,luxury'

    products.push({
      id: `product-${i + 1}`,
      name: productName,
      price: roundPrice(randomPrice),
      image: `https://loremflickr.com/500/625/${encodeURIComponent(keyword)}?random=${i + 1}`,
      category,
      subcategory,
      description: `${productName} cao cấp từ bộ sưu tập LXH. Chất liệu tốt, thiết kế hiện đại, phù hợp với phong cách của bạn.`,
      rating: Math.round((3.5 + ((i * 7) % 15) / 10) * 10) / 10,
      reviews: 10 + ((i * 23) % 190),
      sizes: category !== 'accessories' ? sizes : [],
      colors,
    })
  }

  return products
}

let cached: Product[] | null = null

export function getMockProducts(): Product[] {
  if (!cached) cached = generateProducts()
  return cached
}
