import type { CartItem } from '@/hooks/useCart'

export interface OrderCustomer {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  district: string
}

export interface Order {
  id?: string
  userId?: string | null
  customer: OrderCustomer
  items: CartItem[]
  total: number
  paymentMethod: 'momo' | 'cod'
  status: 'pending' | 'confirmed'
  createdAt: number
}
