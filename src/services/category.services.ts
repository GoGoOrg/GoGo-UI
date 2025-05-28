import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class CategoryService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const chts = await this.api.get("/categories");
      return chts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const chts = await this.api.get("/categories/" + id);
      return chts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/categories",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/categories/" + id);
    } catch (err) {
      handlingError(err);
    }
  }

  async update(id: number, name: string, description: string) {
    return await axios.patch(`http://localhost:3000/api/categories/${id}`, {name: name, description: description}).then((res) => {
    return res.data;
      }).catch((err) => {
          handlingError(err);
      })
  }
}

export default new CategoryService();