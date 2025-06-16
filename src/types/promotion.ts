export interface Promotion {
  id: number
  name: string
  description: number
  discountAmount: number
  discountPercent: number
  startDate: string
  endDate: string
  isActive: boolean
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
