export interface CarAvailability {
  id: number
  carId: number
  startTime: string
  endTime: string
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
