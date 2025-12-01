import createApiClient, { handlingError } from './api.service'

class CarRequestService {
  private api: any

  constructor(baseUrl = 'http://localhost:3000/api') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const response = await this.api.get('/carrequest')
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getAllByCarid(carid: number) {
    try {
      const response = await this.api.get(`/carrequest/car/${carid}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
  async getAllByUserid(userid: number) {
    try {
      const response = await this.api.get(`/carrequest/user/${userid}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/carrequest/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post('/carrequest', data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/carrequest/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/carrequest/${id}`, data)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
}

export default new CarRequestService()
