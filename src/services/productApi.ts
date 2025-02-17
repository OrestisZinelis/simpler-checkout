import { api } from '@services/axios.config'
import type { Product } from '@src/types/api/ProductTypes'

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await api.get('/products')
  return data
}

export const fetchProduct = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`)
  return data
}
