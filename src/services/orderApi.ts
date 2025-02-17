import { api } from '@services/axios.config'
import type { Order } from '@src/types/api/OrderTypes'

export const placeOrder = async (
  cart_id: string,
  discount_code?: string,
): Promise<Order['id']> => {
  try {
    const response = await api.post('/orders', { cart_id, discount_code })

    const locationHeader = response.headers['location']
    if (locationHeader) {
      const orderId = locationHeader.split('/').pop()
      return orderId
    } else {
      throw new Error('No Location header received for the order')
    }
  } catch (error) {
    console.error('Error placing order:', error)
    throw new Error('Failed to place order')
  }
}

export const getOrder = async (id: string): Promise<Order> => {
  const { data } = await api.get(`/orders/${id}`)
  return data
}
