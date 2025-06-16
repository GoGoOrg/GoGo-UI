export interface Booking {
  id: number
  userId: number
  carId: number
  status: string
  startDate: string
  endDate: string
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
