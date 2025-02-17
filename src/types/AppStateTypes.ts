import type { Discount } from '@src/types/api/DiscountTypes'
import type { Product } from '@src/types/api/ProductTypes'
import type { Cart } from '@src/types/api/CartTypes'

export interface AppState {
  grandTotalPrice: number
  items: Cart['items']
  products: Product[]
  discounts?: Discount[]
  appliedDiscount?: Discount
  showCheckout: boolean
}

export type AppAction =
  | { type: 'SET_CART_GRAND_TOTAL_PRICE'; payload: number }
  | { type: 'SET_CART_ITEMS'; payload: Cart['items'] }
  | { type: 'ADD_TO_CART_ITEMS'; payload: Product['id'] }
  | { type: 'REMOVE_FROM_CART_ITEMS'; payload: Product['id'] }
  | { type: 'SET_CART_DISCOUNT'; payload?: Discount }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_DISCOUNTS'; payload?: Discount[] }
  | { type: 'RESET_CART' }
  | { type: 'SHOW_CHECKOUT'; payload: boolean }
