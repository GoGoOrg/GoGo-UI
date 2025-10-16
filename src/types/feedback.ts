export interface Feedback {
  id: number
  title: string
  description: number
  userid: number
  isCheck: boolean
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
