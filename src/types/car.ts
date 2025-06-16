export interface Car {
  id: number
  name: string
  type: string
  licenseplate: string
  description: string
  regulation: string
  color: string
  seats: number
  doors: number
  price: number
  ownerid: number
  brandid: number
  cityid: number
  transmissiontypeid: number
  fueltypeid: number
  totalride: number
  totalheart: number
  mortage: number
  insurance: number
  starnumber: number
  avgrating: number
  reviewcount: number
  priceperday: number
  discountvalue: number
  discounttype: string
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
