import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class ImageService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const images = await this.api.get("/images");
      return images.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getAllByBelongIdLimit1(id: number) {
    try {
      const images = await this.api.get("/images/belong/limit/" + id);
      return images.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getAllByBelongId(id: string) {
    try {
      const images = await this.api.get("/images/belong/" + id);
      return images.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const images = await this.api.get("/images/" + id);
      return images.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/images",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/images/" + id);
    } catch (err) {
      handlingError(err);
    }
  }

  async deleteByBelongId(id: number) {
    try {
      return await this.api.delete("/images/belong/" + id);
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new ImageService();