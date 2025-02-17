import type { AppState, AppAction } from '@src/types/AppStateTypes'
import { CART_ITEMS_STORAGE_KEY } from '@constants/localStorage.const'

export const initialState: AppState = {
  grandTotalPrice: 0,
  products: [],
  items: [],
  discounts: [],
  showCheckout: false,
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_CART_GRAND_TOTAL_PRICE': {
      return { ...state, grandTotalPrice: action.payload }
    }

    case 'SET_CART_ITEMS':
      localStorage.setItem(
        CART_ITEMS_STORAGE_KEY,
        JSON.stringify(action.payload),
      )
      return { ...state, items: action.payload }

    case 'SET_PRODUCTS':
      return { ...state, products: action.payload }

    case 'ADD_TO_CART_ITEMS': {
      const { payload: id } = action

      const product = state.products.find((p) => p.id === id)
      if (!product) return state

      const existingItemIndex = state.items.findIndex(
        (item) => item.product_id === id,
      )

      const updatedItems = [...state.items]

      if (existingItemIndex >= 0) {
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: Math.min(
            updatedItems[existingItemIndex].quantity + 1,
            product.stock,
          ),
        }
      } else {
        updatedItems.push({ product_id: id, quantity: 1 })
      }

      localStorage.setItem(CART_ITEMS_STORAGE_KEY, JSON.stringify(updatedItems))
      return { ...state, items: updatedItems }
    }

    case 'REMOVE_FROM_CART_ITEMS': {
      const { payload: id } = action

      const existingItemIndex = state.items.findIndex(
        (item) => item.product_id === id,
      )

      if (existingItemIndex >= 0) {
        const updatedItem = state.items[existingItemIndex]
        let updatedItems = [...state.items]

        if (updatedItem.quantity > 1) {
          updatedItems[existingItemIndex] = {
            ...updatedItem,
            quantity: updatedItem.quantity - 1,
          }
        } else {
          updatedItems = updatedItems.filter((item) => item.product_id !== id)
        }

        localStorage.setItem(
          CART_ITEMS_STORAGE_KEY,
          JSON.stringify(updatedItems),
        )
        return { ...state, items: updatedItems }
      }

      return state
    }

    case 'SET_DISCOUNTS':
      return { ...state, discounts: action.payload }

    case 'SET_CART_DISCOUNT':
      return { ...state, appliedDiscount: action.payload }

    case 'RESET_CART':
      localStorage.removeItem(CART_ITEMS_STORAGE_KEY)
      return {
        ...state,
        items: [],
        appliedDiscount: undefined,
      }

    case 'SHOW_CHECKOUT':
      return { ...state, showCheckout: action.payload }

    default:
      return state
  }
}
