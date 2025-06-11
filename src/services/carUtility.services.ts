import createApiClient,{ handlingError } from "./api.service";

class carutilitieservice {
  private api: any;

  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      const response = await this.api.get("/carutilities");
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/carutilities/${id}`);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post("/carutilities", data);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/carutilities/${id}`);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/carutilities/${id}`, data);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new carutilitieservice();
