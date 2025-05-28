import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class TagService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const tags = await this.api.get("/tags");
      return tags.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getTop() {
    try {
      const tags = await this.api.get("/tags/top/25");
      return tags.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const tags = await this.api.get("/tags/" + id);
      return tags.data;
    } catch (err) {
      handlingError(err);
    }
  }



  async create(name: string) {
    return await axios.post(`http://localhost:3000/api/tags`, {name}).then((res) => {
      return res.data;
    }).catch((err) => {
        handlingError(err);
    })
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/tags/" + id);
    } catch (err) {
      handlingError(err);
    }
  }

  async update(id: number, name: string, ) {
    return await axios.patch(`http://localhost:3000/api/tags/${id}`, {name: name}).then((res) => {
    return res.data;
    }).catch((err) => {
        handlingError(err);
    })
}
}

export default new TagService();