export interface CarRequest {
  id: number
  carid: number
  userid: number
  starttime: string
  endtime: string
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
  accept: boolean
  deny: boolean
  fullname: string
  username: string
  email: string
  phone: string
  avatar: string
  about: string
  price: number
  totalprice: number
  carname: string
}
