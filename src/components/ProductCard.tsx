import type { FC } from 'react'
import { useApp } from '@hooks/useApp'
import type { Product } from '@src/types/api/ProductTypes'
import { Card, CardContent, Button } from '@mui/material'

interface ProductCardProps {
  product: Product
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { state, dispatch } = useApp()

  const existingItem = state.items.find(
    (item) => item.product_id === product.id,
  )
  const quantityInCart = existingItem ? existingItem.quantity : 0

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART_ITEMS', payload: product.id })
  }

  const handleDecreaseQuantity = () => {
    dispatch({ type: 'REMOVE_FROM_CART_ITEMS', payload: product.id })
  }

  return (
    <Card>
      <CardContent>
        <div className="font-medium mb-2 text-xl">{product.name}</div>
        <div className="text-gray-600 mb-1">${product.price}</div>
        <div className="text-gray-600 text-sm">Stock: {product.stock}</div>

        <div className="flex items-center gap-2 mt-4">
          <Button
            variant="outlined"
            onClick={handleDecreaseQuantity}
            disabled={quantityInCart === 0}
          >
            -
          </Button>
          <div className="font-bold">{quantityInCart}</div>
          <Button
            variant="outlined"
            onClick={handleAddToCart}
            disabled={quantityInCart >= product.stock}
          >
            +
          </Button>
        </div>
        <div className="mt-4">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddToCart}
            disabled={quantityInCart >= product.stock}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
