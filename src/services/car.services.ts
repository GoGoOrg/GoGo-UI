import createApiClient,{ handlingError } from "./api.service";

class CarService {
  private api: any;

  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      const response = await this.api.get("/cars");
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/cars/${id}`);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post("/cars", data);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/cars/${id}`);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/cars/${id}`, data);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new CarService();
