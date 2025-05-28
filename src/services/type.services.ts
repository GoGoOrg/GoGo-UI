import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class TypeService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const types = await this.api.get("/types");
      return types.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getAllByProductId(id: number) {
    try {
      const types = await this.api.get("/types/product/" + id);
      return types.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const types = await this.api.get("/types/" + id);
      return types.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(name: string) {
    return await axios.post(`http://localhost:3000/api/types`, {name}).then((res) => {
      return res.data;
    }).catch((err) => {
        handlingError(err);
    })
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/types/" + id);
    } catch (err) {
      handlingError(err);
    }
  }

  async update(id: number, data: any) {
    return await axios.patch(`http://localhost:3000/api/types/${id}`, data).then((res) => {
    return res.data;
    }).catch((err) => {
        handlingError(err);
    })
}
}

export default new TypeService();