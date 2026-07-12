import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase/client'
import type { Order } from '@/types/order'

const ORDERS_COLLECTION = 'orders'

export async function createOrder(order: Order): Promise<string> {
  if (!db) throw new Error('Firestore is not configured')
  const ref = await addDoc(collection(db, ORDERS_COLLECTION), order)
  return ref.id
}
