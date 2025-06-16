export interface TransmissionType {
  id: number
  name: string
  description: string
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
