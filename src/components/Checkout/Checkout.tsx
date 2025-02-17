import { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@hooks/useApp'
import { useApi } from '@hooks/useApi'
import { useToast } from '@hooks/useToast'
import { Button } from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { placeOrder } from '@services/orderApi'
import { createCart, updateCart } from '@services/cartApi'
import type { Discount } from '@src/types/api/DiscountTypes'
import type { Product } from '@src/types/api/ProductTypes'
import CartProducts from './CartProducts'
import CouponSelector from './CouponSelector'
import OrderSummary from './OrderSummary'

const Checkout: FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const { showToast } = useToast()

  const [isCreatingOrder, setIsCreatingOrder] = useState(false)

  const {
    data: discounts,
    isFetching: isFetchingDiscounts,
    isError: isErrorDiscounts,
  } = useApi<Discount[]>('/discounts')

  useEffect(() => {
    if (discounts?.length) {
      dispatch({ type: 'SET_DISCOUNTS', payload: discounts })
    }
  }, [discounts, dispatch])

  const handleApplyDiscount = (couponCode?: string) => {
    if (!couponCode) {
      dispatch({ type: 'SET_CART_DISCOUNT' })
      return
    }

    const foundDiscount = discounts?.find((d) => d.code === couponCode)
    if (foundDiscount) {
      dispatch({ type: 'SET_CART_DISCOUNT', payload: foundDiscount })
    }
  }

  const handleAddToCart = (id: Product['id']) => {
    dispatch({ type: 'ADD_TO_CART_ITEMS', payload: id })
  }

  const handleRemoveFromCart = (id: Product['id']) => {
    dispatch({ type: 'REMOVE_FROM_CART_ITEMS', payload: id })
  }

  const handleResetCart = () => {
    dispatch({ type: 'RESET_CART' })
    showToast('Cart has been reset', 'success')
  }

  const handlePlaceOrder = async () => {
    try {
      setIsCreatingOrder(true)
      const cartId = await createCart()
      const updatedCart = await updateCart(cartId, state.items)
      const orderId = await placeOrder(
        updatedCart.id,
        state.appliedDiscount?.code,
      )

      showToast('Order placed successfully!', 'success')
      await navigate(`/order/${orderId}`)
    } catch (error) {
      console.error(error)
      showToast('Failed to place order', 'error')
    } finally {
      dispatch({ type: 'SHOW_CHECKOUT', payload: false })
      setTimeout(() => {
        dispatch({ type: 'RESET_CART' })
      }, 1000)
      setIsCreatingOrder(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-xl font-bold">Checkout</h2>
      <CartProducts
        isCreatingOrder={isCreatingOrder}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
      {state.items.length > 0 && (
        <>
          <div className="mb-8">
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleResetCart}
              startIcon={<RestartAltIcon />}
              disabled={isCreatingOrder}
            >
              Reset Cart
            </Button>
          </div>
          <CouponSelector
            isFetchingDiscounts={isFetchingDiscounts}
            onApplyDiscount={handleApplyDiscount}
          />
          <OrderSummary />
        </>
      )}
      {isErrorDiscounts && (
        <p className="text-red-500">Error fetching discounts</p>
      )}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handlePlaceOrder}
        disabled={state.items.length === 0}
      >
        Place Order
      </Button>
    </div>
  )
}

export default Checkout
