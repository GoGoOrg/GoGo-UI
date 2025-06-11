import createApiClient,{ handlingError } from "./api.service";

class ReviewService {
  private api: any;

  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      const response = await this.api.get("/reviews");
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const response = await this.api.get(`/reviews/${id}`);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const response = await this.api.post("/reviews", data);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      const response = await this.api.delete(`/reviews/${id}`);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async update(id: number, data: any) {
    try {
      const response = await this.api.patch(`/reviews/${id}`, data);
      return response.data;
    } catch (err) {
      handlingError(err);
    }
  }
}

export default new ReviewService();
