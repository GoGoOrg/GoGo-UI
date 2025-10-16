export interface CarPromotion {
  id: number
  carid: number
  promotionid: number
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
