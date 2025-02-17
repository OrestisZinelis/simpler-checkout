import type { FC } from 'react'
import { Select, MenuItem } from '@mui/material'
import { useApp } from '@hooks/useApp'

interface CouponSelectorProps {
  isFetchingDiscounts: boolean
  onApplyDiscount: (couponCode?: string) => void
}

const CouponSelector: FC<CouponSelectorProps> = ({
  isFetchingDiscounts,
  onApplyDiscount,
}) => {
  const { state } = useApp()
  const noProducts = state.items.length === 0

  return (
    <div>
      <label htmlFor="coupons" className="block font-medium mb-1">
        Coupons:
      </label>
      <Select
        id="coupons"
        fullWidth
        disabled={noProducts || isFetchingDiscounts}
        value={state.appliedDiscount?.code ?? ''}
        onChange={(e) => onApplyDiscount(e.target.value)}
      >
        <MenuItem value="">No Discount</MenuItem>
        {state.discounts?.map((discount) => (
          <MenuItem key={discount.code} value={discount.code}>
            {discount.code} (
            {discount.type === 'BOGO'
              ? 'Buy One Get One'
              : discount.type === 'FLAT'
                ? `$${discount.amount}`
                : `${discount.amount}% off`}
            )
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default CouponSelector
