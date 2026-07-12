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
  createdAt?: number
}
