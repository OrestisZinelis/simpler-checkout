import { useEffect, type FC } from 'react'
import { useApp } from '@hooks/useApp'
import { useApi } from '@hooks/useApi'
import type { Product } from '@src/types/api/ProductTypes'
import ProductCard from '@components/ProductCard'
import { CircularProgress } from '@mui/material'

const StorePage: FC = () => {
  const { state, dispatch } = useApp()

  const {
    data: products,
    isError: isErrorProducts,
    isFetching: isFetchingProducts,
  } = useApi<Product[]>('/products')

  useEffect(() => {
    if (products && products.length > 0 && !isFetchingProducts) {
      dispatch({ type: 'SET_PRODUCTS', payload: products })
    }
  }, [products, isFetchingProducts, dispatch])

  return (
    <div className="flex justify-center p-6">
      {isFetchingProducts && <CircularProgress />}
      {isErrorProducts && (
        <p className="text-center text-red-500">Error loading products</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 min-w-fit max-w-[50%] items-center">
        {state.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default StorePage
