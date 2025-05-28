import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class ProductService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const products = await this.api.get("/products");
      return products.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getAllByBrandId(id: number) {
    try {
      const products = await this.api.get("/products/brand/"+ id);
      return products.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getAllDetailByBrandId(id: number) {
    try {
      const products = await this.api.get("/products/detailbrand/"+ id);
      return products.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getTopSale() {
    try {
      const products = await this.api.get("/products/topsale/random");
      return products.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getAllByCategoryId(id: number) {
    try {
      const products = await this.api.get("/products/category/"+ id);
      return products.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getAllByCategoryIdNoLimit(id: number) {
    try {
      const products = await this.api.get("/products/categorynolimit/"+ id);
      return products.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const products = await this.api.get("/products/" + id);
      return products.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOneDetail(id: number) {
    try {
      const products = await this.api.get("/products/detail/" + id);
      return products.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/products",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

  async delete(id: number) {
    try {
      return await this.api.delete("/products/" + id);
    } catch (err) {
      handlingError(err);
    }
  }

  async update(id: number, data: any, ) {
    return await axios.patch(`http://localhost:3000/api/products/${id}`, data).then((res) => {
    return res.data;
    }).catch((err) => {
        handlingError(err);
    })
  }
}

export default new ProductService();