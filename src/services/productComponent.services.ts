import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class ProductComponentService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    try {
      const chts = await this.api.get("/product-components");
      return chts.data;
    } catch (err) {
      handlingError(err);
    }
  }

  async getOne(id: number) {
    try {
      const chts = await this.api.get("/product-components/" + id);
      return chts.data;
    } catch (err) {
      handlingError(err);
    }
  }
  async getAllByProductId(id: number) {
    try {
      const product_components = await this.api.get("/product-components/product/" + id);
      return product_components.data;
    } catch (err) {
      handlingError(err);
    }
  }
//   async create(data: any) {
//     try {
//       const resp = await this.api.post(
//         "http://localhost:3000/api/donvibanhang",
//         data
//       );
//       return resp.data;
//     } catch (err: any) {
//       handlingError(err);
//     }
//   }

//   async delete(id: number) {
//     try {
//       return await this.api.delete("/donvibanhang/" + id);
//     } catch (err) {
//       handlingError(err);
//     }
//   }
}

export default new ProductComponentService();