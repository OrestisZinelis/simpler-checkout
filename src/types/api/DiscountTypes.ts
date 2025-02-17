export interface Discount {
  code: string
  type: 'FLAT' | 'PERCENTAGE' | 'BOGO'
  amount?: number
}
