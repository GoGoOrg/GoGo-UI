import createApiClient, { handlingError } from './api.service'

class BookingService {
  private api: any

  constructor(baseUrl = import.meta.env.VITE_API_BASE_URL) {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const response = await this.api.get('/bookings')
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/bookings/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post('/bookings', data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/bookings/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/bookings/${id}`, data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
}

export default new BookingService()
