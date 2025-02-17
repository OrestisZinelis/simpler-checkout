import { describe, it, expect } from 'vitest'
import { calcGrandTotal } from '@utils/calcGrandTotal'
import type { AppState } from '@src/types/AppStateTypes'

describe('calcGrandTotal', () => {
  const mockProducts = [
    { id: '1', name: 'Product 1', price: 10, stock: 5 },
    { id: '2', name: 'Product 2', price: 20, stock: 3 },
  ]

  const mockState: AppState = {
    items: [],
    products: mockProducts,
    discounts: [],
    appliedDiscount: undefined,
    grandTotalPrice: 0,
    showCheckout: false,
  }

  it('calculates grand total without discount', () => {
    const state: AppState = {
      ...mockState,
      items: [
        { product_id: '1', quantity: 2 },
        { product_id: '2', quantity: 1 },
      ],
    }

    const result = calcGrandTotal(state)
    expect(result).toBe(40)
  })

  it('calculates grand total with FLAT discount', () => {
    const state: AppState = {
      ...mockState,
      items: [
        { product_id: '1', quantity: 2 },
        { product_id: '2', quantity: 1 },
      ],
      appliedDiscount: {
        code: 'FLAT',
        type: 'FLAT',
        amount: 10,
      },
    }

    const result = calcGrandTotal(state)
    expect(result).toBe(30) // $40 - $10 = $30
  })

  it('calculates grand total with PERCENTAGE discount', () => {
    const state: AppState = {
      ...mockState,
      items: [
        { product_id: '1', quantity: 2 },
        { product_id: '2', quantity: 1 },
      ],
      appliedDiscount: {
        code: 'PERCENTAGE',
        type: 'PERCENTAGE',
        amount: 20,
      },
    }

    const result = calcGrandTotal(state)
    expect(result).toBe(32) // $40 - 20% = $32
  })

  it('calculates grand total with BOGO discount for odd quantities', () => {
    const state: AppState = {
      ...mockState,
      items: [
        { product_id: '1', quantity: 3 },
        { product_id: '2', quantity: 1 },
      ],
      appliedDiscount: {
        code: 'BOGO',
        type: 'BOGO',
      },
    }

    const result = calcGrandTotal(state)
    expect(result).toBe(40)
  })

  it('calculates grand total with BOGO discount for single item', () => {
    const state: AppState = {
      ...mockState,
      items: [{ product_id: '1', quantity: 1 }],
      appliedDiscount: {
        code: 'BOGO',
        type: 'BOGO',
      },
    }

    const result = calcGrandTotal(state)
    expect(result).toBe(10)
  })

  it('calculates grand total with FLAT discount ensuring total does not go below 0', () => {
    const state: AppState = {
      ...mockState,
      items: [{ product_id: '1', quantity: 1 }],
      appliedDiscount: {
        code: 'FLAT',
        type: 'FLAT',
        amount: 10,
      },
    }

    const result = calcGrandTotal(state)
    expect(result).toBe(0)
  })
})
