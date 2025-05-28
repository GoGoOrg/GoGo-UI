import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class OrderService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }
  async create(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/paymentVNPay/",
        data
      ).then((response: any) => {
        window.location.href = response.data.vnpUrl; // Chuyển hướng người dùng đến VNPay
      });
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }
}

export default new OrderService();