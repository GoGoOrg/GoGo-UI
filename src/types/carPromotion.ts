export interface CarPromotion {
  id: number
  carId: number
  promotionId: number
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
