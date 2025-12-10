import createApiClient, { handlingError } from './api.service'

class UtilityService {
  private api: any

  constructor(baseUrl = 'https://gogo-server-br1n.onrender.com/api') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const response = await this.api.get('/utilities')
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/utilities/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post('/utilities', data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/utilities/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/utilities/${id}`, data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
}

export default new UtilityService()
