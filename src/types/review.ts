export interface Review {
  id: number
  content: string
  userId: number
  carId: number
  star: number
  fullname: string
  avatar: string | null // nullable
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
