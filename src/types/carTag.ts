export interface CarTag {
  id: number
  carid: number
  tagid: number
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
