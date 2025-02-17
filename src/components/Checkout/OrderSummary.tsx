import type { FC } from 'react'
import { useApp } from '@hooks/useApp'

const OrderSummary: FC = () => {
  const { state } = useApp()

  const totalBeforeDiscount = state.items.reduce(
    (acc, { product_id, quantity }) => {
      const product = state.products.find((p) => p.id === product_id)
      return product ? acc + product.price * quantity : acc
    },
    0,
  )

  const discountAmount = state.grandTotalPrice - totalBeforeDiscount

  return (
    <div className="flex flex-col text-lg gap-1">
      {state.appliedDiscount && (
        <>
          <p>
            Total before discount:{' '}
            <span className="font-semibold">
              ${totalBeforeDiscount.toFixed(2)}
            </span>
          </p>
          <p className="text-green-600">
            Discount ({state.appliedDiscount.code}): -$
            {discountAmount.toFixed(2)}
          </p>
        </>
      )}
      <p className="font-bold text-xl mt-2">
        Grand Total: ${state.grandTotalPrice}
      </p>
    </div>
  )
}

export default OrderSummary
