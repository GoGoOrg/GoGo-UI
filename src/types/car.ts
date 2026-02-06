import type { Utility } from './utility'
import type { CarRequest } from './carRequest'

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
  owneravatar: string
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
  images: string[]
  utilities: Utility[] // ✅ New field for utilities (with name + icon)

  createdat: string // or Date
  updatedat: string // or Date
  deletedat: string | null // nullable

  carrequests: CarRequest[]

  totalincome: number
  totalrequests: number

  driver: boolean
}
