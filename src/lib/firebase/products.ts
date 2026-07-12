import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { Product } from '@/types/product'

const PRODUCTS_COLLECTION = 'products'

export async function fetchAllProducts(): Promise<Product[]> {
  if (!db) return []
  const snapshot = await getDocs(collection(db, PRODUCTS_COLLECTION))
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Product)
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  if (!db) return undefined
  const snap = await getDoc(doc(db, PRODUCTS_COLLECTION, id))
  if (!snap.exists()) return undefined
  return { id: snap.id, ...snap.data() } as Product
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  if (!db) return []
  const q = query(collection(db, PRODUCTS_COLLECTION), where('category', '==', category))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Product)
}
