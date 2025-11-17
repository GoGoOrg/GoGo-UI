import createApiClient, { handlingError } from './api.service'

class notificationService {
  private api: any

  constructor(baseUrl = 'http://localhost:3000/api') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const response = await this.api.get('/notifications')
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getAllByUserId(userid: number) {
    try {
      const response = await this.api.get(`/notifications/user/${userid}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/notifications/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post('/notifications', data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/notifications/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/notifications/${id}`, data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
}

export default new notificationService()
