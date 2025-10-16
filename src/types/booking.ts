export interface Booking {
  id: number
  userid: number
  carid: number
  status: string
  startDate: string
  endDate: string
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
