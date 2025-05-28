import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class AccountService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const chts = await this.api.get("/accounts");
      return chts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const chts = await this.api.get("/accounts/" + id);
      return chts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async register(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/accounts/register",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async login(data: any) {
    try {
        const tokens = (await this.api.post("http://localhost:3000/api/accounts/login", data));
        return tokens.data;

    } catch (err: any) {
        if (err.response.status == '401') throw new Error("Sai email hoặc mật khẩu, vui lòng nhập lại");
        else if (err.response.status == '400') throw new Error("Các trường nhập vào không hợp lệ hoặc không đủ ký tự, vui lòng nhập lại");
        throw new Error("Lỗi hệ thống")
    }
  }

  async loginGoogle(data: any) {
    try {
        const tokens = (await this.api.post("http://localhost:3000/api/accounts/google", data));
        return tokens.data;

    } catch (err: any) {
        if (err.response.status == '401') throw new Error("Sai email hoặc mật khẩu, vui lòng nhập lại");
        else if (err.response.status == '400') throw new Error("Các trường nhập vào không hợp lệ hoặc không đủ ký tự, vui lòng nhập lại");
        throw new Error("Lỗi hệ thống")
    }
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/accounts/" + id);
    } catch (err) {
      handlingError(err);
    }
  }

  async getMe(token: string) {
    return await axios.get("http://localhost:3000/api/accounts/me", {
      headers: {
        Token: token
      }
    }).then((res) => {
      return res.data;
    }).catch((err) => {
        // if (err.respon == '404') throw new Error("Chưa đăng nhập" + err);
        throw new Error("Lỗi hệ thống "+  err)
    })
  }

  async update(id: number, data: any, ) {
    return await axios.patch(`http://localhost:3000/api/accounts/${id}`, data).then((res) => {
    return res.data;
    }).catch((err) => {
        handlingError(err);
    })
  }

  async updateAvatar(id: number, data: any, ) {
    return await axios.patch(`http://localhost:3000/api/accounts/avatar/${id}`, data).then((res) => {
    return res.data;
    }).catch((err) => {
        handlingError(err);
    })
  }

  async updatePassword(data: any, ) {
    return await axios.patch(`http://localhost:3000/api/accounts/password`, data).then((res) => {
    return res.data;
    }).catch((err) => {
        handlingError(err);
    })
  }
}

export default new AccountService();