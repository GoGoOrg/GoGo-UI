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
      const reviews = await this.api.get("/reviews");
      return reviews.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getAllByProductId(id: number) {
    try {
      const reviews = await this.api.get("/reviews/product/" + id);
      return reviews.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getAllByProductIdAndAccountId(productId: number, accountId: number) {
    try {
      const reviews = await this.api.get("/reviews/product/" + productId + "/account/" + accountId);
      return reviews.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const reviews = await this.api.get("/reviews/" + id);
      return reviews.data;
    } catch (err) {
      handlingError(err);
    }
  }


  async create(data: any) {
    return await axios.post(`http://localhost:3000/api/reviews`, data).then((res) => {
      return res.data;
    }).catch((err) => {
        handlingError(err);
    })
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/reviews/" + id);
    } catch (err) {
      handlingError(err);
    }
  }

  async update(id: number, data: any, ) {
    return await axios.patch(`http://localhost:3000/api/reviews/${id}`, data).then((res) => {
    return res.data;
    }).catch((err) => {
        handlingError(err);
    })
  }
}

export default new TagService();