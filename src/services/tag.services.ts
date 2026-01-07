import createApiClient, { handlingError } from './api.service'

class TagService {
  private api: any

  constructor(baseUrl = import.meta.env.VITE_API_BASE_URL) {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const response = await this.api.get('/tags')
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/tags/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post('/tags', data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/tags/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/tags/${id}`, data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
}

export default new TagService()
