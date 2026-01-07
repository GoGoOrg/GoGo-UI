import createApiClient, { handlingError } from './api.service'

class CarService {
  private api: any

  constructor(baseUrl = import.meta.env.VITE_API_BASE_URL) {
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

  async getTopHireCars() {
    try {
      const response = await this.api.get('/cars/carrequest/1')
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

  async searchByName(name: string) {
    try {
      const response = await this.api.get(`/cars/search/${name}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async searchByCityName(name: string) {
    try {
      const response = await this.api.get(`/cars/city/${name}`)
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getAllByOwnerid(id: number) {
    try {
      const response = await this.api.get(`/cars/owner/${id}`, {
        withCredentials: true,
      })
      return response.data
    } catch (err) {
      handlingError(err)
    }
  }
  async getAllByBrandid(id: number) {
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
