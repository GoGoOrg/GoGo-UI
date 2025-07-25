export interface Car {
  id: number
  name: string
  licenseplate: string
  description: string
  regulation: string
  color: string
  seats: number
  price: number
  ownerid: number
  ownername: string
  brandid: number
  brand: string
  cityid: number
  city: string
  transmissiontypeid: number
  transmissiontype: string
  fueltypeid: number
  fueltype: string
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
  imageurl: string
  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable
}
