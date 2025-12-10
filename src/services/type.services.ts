import createApiClient from './api.service'
import handlingError from './api.service'
import axios from 'axios'

class TypeService {
  api: any
  constructor(baseUrl = 'https://gogo-server-br1n.onrender.com/api') {
    this.api = createApiClient(baseUrl)
  }
  async getAll() {
    try {
      const types = await this.api.get('/types')
      return types.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getAllByProductid(id: number) {
    try {
      const types = await this.api.get('/types/product/' + id)
      return types.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const types = await this.api.get('/types/' + id)
      return types.data
    } catch (err) {
      handlingError(err)
    }
  }

  async create(name: string) {
    return await axios
      .post(`https://gogo-server-br1n.onrender.com/api/types`, { name })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        handlingError(err)
      })
  }

  async delete(id: number) {
    try {
      return await this.api.delete('/types/' + id)
    } catch (err) {
      handlingError(err)
    }
  }

  async update(id: number, data: any) {
    return await axios
      .patch(`https://gogo-server-br1n.onrender.com/api/types/${id}`, data)
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        handlingError(err)
      })
  }
}

export default new TypeService()
