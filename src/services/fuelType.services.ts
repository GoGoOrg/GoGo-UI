import createApiClient, { handlingError } from './api.service'

class FuelTypeService {
  private api: any

  constructor(baseUrl = import.meta.env.VITE_API_BASE_URL) {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const response = await this.api.get('/fueltypes')
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/fueltypes/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post('/fueltypes', data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/fueltypes/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/fueltypes/${id}`, data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
}

export default new FuelTypeService()
