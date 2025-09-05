export interface User {
  id: number
  username: string
  password: string
  fullname: string
  email: string
  phone: string
  avatar: string
  about: string
  role: string
  birthday: string
  totalCars: number
  totalHired: number
  responsePercent: number
  agreePercent: number
  responseTime: number
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
