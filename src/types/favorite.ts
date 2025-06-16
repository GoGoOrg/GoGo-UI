export interface Favorite {
  id: number
  userId: number
  carId: number
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
