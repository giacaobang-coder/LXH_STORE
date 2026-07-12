export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  subcategory: string
  description: string
  rating: number
  reviews: number
  sizes: string[]
  colors: string[]
}

// Danh mục chi tiết
const subcategories = {
  women: ['Áo', 'Quần', 'Váy', 'Giày', 'Túi', 'Phụ kiện'],
  men: ['Áo', 'Quần', 'Giày', 'Túi', 'Phụ kiện'],
  accessories: ['Túi', 'Dây nịt', 'Khăn', 'Vòng tay', 'Nón', 'Mắt kính'],
}

const colors = ['Black', 'White', 'Navy', 'Beige', 'Brown', 'Gray', 'Cream']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

// Tên sản phẩm theo danh mục
const productNames = {
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

// Hình ảnh theo danh mục
const imageKeywords = {
  'Áo': 'shirt',
  'Quần': 'pants',
  'Váy': 'dress',
  'Giày': 'shoes',
  'Túi': 'bag',
  'Dây nịt': 'belt',
  'Khăn': 'scarf',
  'Vòng tay': 'bracelet',
  'Nón': 'hat',
  'Mắt kính': 'sunglasses',
  'Cà Vạt': 'tie',
  'Phụ kiện': 'accessories',
}

function generateProducts(): Product[] {
  const products: Product[] = []
  const categories = ['women', 'men', 'accessories']

  for (let i = 0; i < 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const categorySubcategories = subcategories[category as keyof typeof subcategories]
    const subcategory = categorySubcategories[Math.floor(Math.random() * categorySubcategories.length)]

    const categoryProducts = productNames[category as keyof typeof productNames]
    const subcategoryProducts = categoryProducts[subcategory as keyof typeof categoryProducts]
    const productName = Array.isArray(subcategoryProducts)
      ? subcategoryProducts[Math.floor(Math.random() * subcategoryProducts.length)]
      : subcategoryProducts

    const basePrice = category === 'accessories' ? 500000 : 1500000
    const randomPrice = basePrice + Math.floor(Math.random() * 2000000)

    // Ảnh từ Unsplash theo keyword danh mục
    const keyword = imageKeywords[subcategory as keyof typeof imageKeywords] || 'fashion'
    const imageUrl = `https://images.unsplash.com/search?q=${keyword}+fashion&fit=crop&w=400&h=500&crop=faces&fm=jpg&nonce=${i}`

    products.push({
      id: `product-${i + 1}`,
      name: productName,
      price: roundPrice(randomPrice),
      image: `https://picsum.photos/400/500?random=${i + 1}&t=${keyword}`,
      category,
      subcategory,
      description: `${productName} cao cấp từ bộ sưu tập LXH Store. Chất liệu tốt, thiết kế hiện đại, phù hợp với phong cách của bạn.`,
      rating: Math.round(Math.random() * 2 + 3.5),
      reviews: Math.floor(Math.random() * 200) + 10,
      sizes: category !== 'accessories' ? sizes : [],
      colors,
    })
  }

  return products
}

function roundPrice(price: number): number {
  return Math.round(price / 100000) * 100000
}

let cachedProducts: Product[] | null = null

export async function getProducts(): Promise<Product[]> {
  if (!cachedProducts) {
    cachedProducts = generateProducts()
  }
  return cachedProducts
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((p) => p.id === id)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((p) => p.category === category)
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts()
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
  )
}

export async function getProductsBySubcategory(category: string, subcategory: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((p) => p.category === category && p.subcategory === subcategory)
}

export function getSubcategories(category: string): string[] {
  return subcategories[category as keyof typeof subcategories] || []
}
