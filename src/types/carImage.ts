export interface CarImage {
  id: number
  carId: number
  imageUrl: string
  isPrimary: boolean
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
