export interface CarImage {
  id: number
  carid: number
  imageUrl: string
  isPrimary: boolean
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
