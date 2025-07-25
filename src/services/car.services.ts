import createApiClient, { handlingError } from './api.service'

class CarService {
  private api: any

  constructor(baseUrl = 'http://localhost:3000/api') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const response = await this.api.get('/cars')
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getMyCar(id: number) {
    try {
      const response = await this.api.get(`/cars/mycars`, {
        withCredentials: true,
      })
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getAllByOwnerId(id: number) {
    try {
      const response = await this.api.get(`/cars/owner/${id}`, {
        withCredentials: true,
      })
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
  async getAllByBrandId(id: number) {
    try {
      const response = await this.api.get(`/cars/brand/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/cars/${id}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post('/cars', data, {
        withCredentials: true,
      })
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/cars/${id}`, {
        withCredentials: true,
      })
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/cars/${id}`, data, {
        withCredentials: true,
      })
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
}

export default new CarService()
