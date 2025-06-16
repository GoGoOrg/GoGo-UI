export interface Utility {
  id: number
  name: string
  description: string
  imageUrl: string
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
