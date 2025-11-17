export interface Notification {
  id: number
  carid: number
  userid: number
  message: string
  isread: boolean
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable

  fullname: string
  avatar: string
  carname: string
}
