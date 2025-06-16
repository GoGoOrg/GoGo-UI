export interface CarTag {
  id: number
  carId: number
  tagId: number
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
