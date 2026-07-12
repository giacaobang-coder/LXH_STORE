// Static taxonomy — categories/subcategories are configuration, not data.
// Product instances live in Firestore; this defines the shape of the catalog.

export const CATEGORIES = [
  { id: 'women', name: 'Nữ', icon: '👩' },
  { id: 'men', name: 'Nam', icon: '👨' },
  { id: 'accessories', name: 'Phụ Kiện', icon: '✨' },
] as const

export type CategoryId = (typeof CATEGORIES)[number]['id']

export const SUBCATEGORIES: Record<CategoryId, string[]> = {
  women: ['Áo', 'Quần', 'Váy', 'Giày', 'Túi', 'Phụ kiện'],
  men: ['Áo', 'Quần', 'Giày', 'Túi', 'Phụ kiện'],
  accessories: ['Túi', 'Dây nịt', 'Khăn', 'Vòng tay', 'Nón', 'Mắt kính'],
}

export function getSubcategories(category: string): string[] {
  return SUBCATEGORIES[category as CategoryId] || []
}
