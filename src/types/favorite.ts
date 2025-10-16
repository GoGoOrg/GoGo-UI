export interface Favorite {
  id: number
  userid: number
  carid: number
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
