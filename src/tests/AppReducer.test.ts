import { describe, it, expect } from 'vitest'
import { appReducer, initialState } from '@contexts/AppReducer'
import { AppAction } from '@src/types/AppStateTypes'
import type { Product } from '@src/types/api/ProductTypes'
import type { Discount } from '@src/types/api/DiscountTypes'

describe('AppReducer', () => {
  const mockProduct: Product = {
    id: '123',
    name: 'Test Product',
    price: 100,
    stock: 10,
  }

  const mockDiscount: Discount = {
    code: 'DISCOUNT10',
    type: 'PERCENTAGE',
    amount: 10,
  }

  it('should set the cart grand total price', () => {
    const action: AppAction = {
      type: 'SET_CART_GRAND_TOTAL_PRICE',
      payload: 200,
    }
    const state = appReducer(initialState, action)
    expect(state.grandTotalPrice).toBe(200)
  })

  it('should set products', () => {
    const action: AppAction = { type: 'SET_PRODUCTS', payload: [mockProduct] }
    const state = appReducer(initialState, action)
    expect(state.products).toHaveLength(1)
    expect(state.products[0]).toEqual(mockProduct)
  })

  it('should apply a discount', () => {
    const action: AppAction = {
      type: 'SET_CART_DISCOUNT',
      payload: mockDiscount,
    }
    const state = appReducer(initialState, action)
    expect(state.appliedDiscount).toEqual(mockDiscount)
  })

  it('should remove a discount', () => {
    const stateWithDiscount = { ...initialState, appliedDiscount: mockDiscount }
    const action: AppAction = { type: 'SET_CART_DISCOUNT', payload: undefined }
    const state = appReducer(stateWithDiscount, action)
    expect(state.appliedDiscount).toBeUndefined()
  })

  it('should reset the cart', () => {
    const stateWithItems = {
      ...initialState,
      items: [{ product_id: '123', quantity: 2 }],
      appliedDiscount: mockDiscount,
    }
    const action: AppAction = { type: 'RESET_CART' }
    const state = appReducer(stateWithItems, action)
    expect(state.items).toHaveLength(0)
    expect(state.appliedDiscount).toBeUndefined()
  })
})
