import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class OrderService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const sp = await this.api.get("/selected-products");
      return sp.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async updateQuantity(id: number, data:any) {
    return await axios.patch(`http://localhost:3000/api/selected-products/quantity/${id}`, data).then((res) => {
    return res.data;
    }).catch((err) => {
        handlingError(err);
    })
  }

  async getAllByAccountIdInCart(id: number) {
    try {
      const sp = await this.api.get("/selected-products/account/"+ id);
      return sp.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const sp = await this.api.get("/selected-products/" + id);
      return sp.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/selected-products",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/selected-products/" + id);
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new OrderService();