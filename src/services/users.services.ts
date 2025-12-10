import createApiClient, { handlingError } from './api.service'

class UserService {
  api: any

  constructor(baseUrl = 'https://gogo-server-br1n.onrender.com/api') {
    this.api = createApiClient(baseUrl)
  }

  async getAll() {
    try {
      const res = await this.api.get('/users', {
        withCredentials: true,
      })
      return res.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getOne(id: number) {
    try {
      const res = await this.api.get(`/users/${id}`)
      return res.data
    } catch (err) {
      handlingError(err)
    }
  }

  async register(data: any) {
    try {
      const res = await this.api.post('/users/register', data)
      return res.data
    } catch (err: any) {
      const status = err?.response?.status
      if (status === 400) throw new Error('Tài khoản đã tồn tại!')
      throw new Error('Lỗi hệ thống')
    }
  }

  async login(data: any) {
    try {
      const res = await this.api.post('/users/login', data, {
        withCredentials: true,
      })
      return res.data
    } catch (err: any) {
      const status = err?.response?.status
      if (status === 401) throw new Error('Sai email hoặc mật khẩu, vui lòng nhập lại')
      if (status === 400)
        throw new Error('Các trường nhập vào không hợp lệ hoặc không đủ ký tự, vui lòng nhập lại')
      throw new Error('Lỗi hệ thống')
    }
  }

  async logout() {
    try {
      const res = await this.api.post('/users/logout', {
        withCredentials: true,
      })
    } catch (error) {
      handlingError(error)
    }
  }

  async loginGoogle(data: any) {
    try {
      const res = await this.api.post('/users/google', data)
      return res.data
    } catch (err: any) {
      const status = err?.response?.status
      if (status === 401) throw new Error('Sai email hoặc mật khẩu, vui lòng nhập lại')
      if (status === 400)
        throw new Error('Các trường nhập vào không hợp lệ hoặc không đủ ký tự, vui lòng nhập lại')
      throw new Error('Lỗi hệ thống')
    }
  }

  async delete(id: number) {
    try {
      const res = await this.api.delete(`/users/${id}`)
      return res.data
    } catch (err) {
      handlingError(err)
    }
  }

  async getMe() {
    try {
      const res = await this.api.get('/users/me', {
        withCredentials: true,
      })
      return res.data
    } catch (err) {
      throw new Error('Lỗi hệ thống: ' + err)
    }
  }

  async update(id: number, data: any) {
    try {
      const res = await this.api.patch(`/users/${id}`, data)
      return res.data
    } catch (err) {
      handlingError(err)
    }
  }

  async updateAvatar(id: number, data: any) {
    try {
      const res = await this.api.patch(`/users/avatar/${id}`, data)
      return res.data
    } catch (err) {
      handlingError(err)
    }
  }

  async updatePassword(data: any) {
    try {
      const res = await this.api.patch('/users/password', data)
      return res.data
    } catch (err) {
      handlingError(err)
    }
  }
}

export default new UserService()
