import { api } from '@services/axios.config'
import type { Discount } from '@src/types/api/DiscountTypes'

export const fetchDiscounts = async (): Promise<Discount[]> => {
  const { data } = await api.get('/discounts')
  return data
}
