import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { Order } from '@/types/order'

const ORDERS_COLLECTION = 'orders'

export async function createOrder(order: Order): Promise<string> {
  if (!db) throw new Error('Firestore is not configured')
  const ref = await addDoc(collection(db, ORDERS_COLLECTION), order)
  return ref.id
}

export async function fetchOrdersByUser(userId: string): Promise<Order[]> {
  if (!db) return []
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as Order)
}
