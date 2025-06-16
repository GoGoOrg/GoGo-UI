export interface Review {
  id: number
  content: string
  userId: number
  carId: number
  star: number
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
