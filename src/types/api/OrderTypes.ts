import type { Product } from '@src/types/api/ProductTypes'

export interface OrderItem {
  quantity: number
  product: Product
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
}
