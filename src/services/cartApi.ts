import { api } from '@services/axios.config'
import type { Cart, CartItem } from '@src/types/api/CartTypes'

export const createCart = async (): Promise<Cart['id']> => {
  try {
    const response = await api.post('/carts')

    const locationHeader = response.headers['location']
    if (locationHeader) {
      const cartId = locationHeader.split('/').pop() as Cart['id']
      return cartId
    } else {
      throw new Error('No Location header received')
    }
  } catch (error) {
    console.error('Error creating cart:', error)
    throw new Error('Failed to create cart')
  }
}

export const getCart = async (id: string): Promise<Cart> => {
  const { data } = await api.get(`/carts/${id}`)
  return data
}

export const updateCart = async (
  id: string,
  items: CartItem[],
): Promise<Cart> => {
  const { data } = await api.put(`/carts/${id}`, items)
  return data
}
