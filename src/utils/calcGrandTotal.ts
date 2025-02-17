import { AppState } from '@src/types/AppStateTypes'

const bankersRounding = (num: number, decimals = 2) => {
  /*
  If the digit after the rounding place is less than 5, round down.
  If the digit after the rounding place is greater than 5, round up.
  If the digit after the rounding place is exactly 5, round to the nearest even number.
  */
  const factor = 10 ** decimals
  return Math.round(num * factor) / factor
}

export const calcGrandTotal = (state: AppState) => {
  let grandTotal = 0
  let cheapestItemPrice = Infinity
  const itemCounts: Record<string, number> = {}

  // Calculate subtotal (before discount)
  for (const item of state.items) {
    const product = state.products.find((p) => p.id === item.product_id)
    if (product) {
      const quantity = item.quantity
      const itemPrice = product.price * quantity
      grandTotal += itemPrice

      // Track the quantity of each item
      itemCounts[item.product_id] =
        (itemCounts[item.product_id] || 0) + quantity

      // Track cheapest item price for BOGO
      if (product.price < cheapestItemPrice) {
        cheapestItemPrice = product.price
      }
    }
  }

  if (state.appliedDiscount) {
    const { type, amount } = state.appliedDiscount

    switch (type) {
      case 'FLAT': {
        if (amount !== undefined) {
          grandTotal = Math.max(0, grandTotal - amount)
        }
        break
      }

      case 'PERCENTAGE': {
        if (amount !== undefined) {
          grandTotal = grandTotal - (grandTotal * amount) / 100
        }
        break
      }

      case 'BOGO': {
        for (const productId in itemCounts) {
          const quantity = itemCounts[productId]
          const product = state.products.find((p) => p.id === productId)
          if (product) {
            const bogoDiscounts = Math.floor(quantity / 2) // Every 2 items, 1 is free
            grandTotal -= bogoDiscounts * product.price // Deduct the cost of free items
          }
        }
        break
      }
    }
  }

  return bankersRounding(grandTotal, 2)
}
