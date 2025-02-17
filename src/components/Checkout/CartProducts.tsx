import type { FC } from 'react'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useApp } from '@hooks/useApp'
import { Product } from '@src/types/api/ProductTypes'

interface CartProductsProps {
  isCreatingOrder: boolean
  onAddToCart: (id: Product['id']) => void
  onRemoveFromCart: (id: Product['id']) => void
}

const CartProducts: FC<CartProductsProps> = ({
  isCreatingOrder,
  onAddToCart,
  onRemoveFromCart,
}) => {
  const { state } = useApp()

  if (state.items.length === 0) {
    return <div className="text-gray-500">No products added</div>
  }

  return (
    <div className="flex flex-col gap-4">
      {state.items.map((item) => {
        const product = state.products.find((p) => p.id === item.product_id)
        if (!product) return null

        return (
          <div
            key={product.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <span className="font-medium">{product.name}</span>
            <div className="flex items-center space-x-2">
              <IconButton
                size="small"
                onClick={() => onRemoveFromCart(product.id)}
                disabled={isCreatingOrder}
              >
                <RemoveIcon />
              </IconButton>
              <span>{item.quantity}</span>
              <IconButton
                size="small"
                onClick={() => onAddToCart(product.id)}
                disabled={item.quantity >= product.stock || isCreatingOrder}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CartProducts
