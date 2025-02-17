import type { Product } from '@src/types/api/ProductTypes'

export interface CartItem {
  product_id: Product['id']
  quantity: number
}

export interface Cart {
  id: string
  items: CartItem[]
}
