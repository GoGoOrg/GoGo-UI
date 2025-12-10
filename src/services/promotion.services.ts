import createApiClient, { handlingError } from './api.service'

class PromotionService {
  private api: any

  constructor(baseUrl = 'https://gogo-server-br1n.onrender.com/api') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const response = await this.api.get('/promotions')
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/promotions/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post('/promotions', data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/promotions/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/promotions/${id}`, data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
}

export default new PromotionService()
