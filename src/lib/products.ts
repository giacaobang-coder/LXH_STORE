import type { Product } from '@/types/product'
import { isFirebaseConfigured } from '@/lib/firebase/client'
import { fetchAllProducts, fetchProductById, fetchProductsByCategory } from '@/lib/firebase/products'
import { getMockProducts } from '@/lib/mock-products'

// Public product data-access layer.
// Reads from Firestore when configured; otherwise falls back to an in-memory
// mock catalog so the app keeps working before the database is provisioned.
// See docs/FIREBASE_SETUP.md to connect a real database.

export async function getProducts(): Promise<Product[]> {
  if (isFirebaseConfigured) return fetchAllProducts()
  return getMockProducts()
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (isFirebaseConfigured) return fetchProductById(id)
  return getMockProducts().find((p) => p.id === id)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (isFirebaseConfigured) return fetchProductsByCategory(category)
  return getMockProducts().filter((p) => p.category === category)
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
