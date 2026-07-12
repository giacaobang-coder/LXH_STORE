import { isFirebaseConfigured } from '@/lib/firebase/client'
import { createOrder as createFirestoreOrder } from '@/lib/firebase/orders'
import type { Order } from '@/types/order'

// Saves an order to Firestore when configured. Falls back to a local console
// log during development before the database is provisioned — see
// docs/FIREBASE_SETUP.md.
export async function placeOrder(order: Order): Promise<string> {
  if (isFirebaseConfigured) {
    return createFirestoreOrder(order)
  }
  console.warn('[LXH] Firestore not configured — order was not persisted:', order)
  return `LOCAL-${Date.now()}`
}
