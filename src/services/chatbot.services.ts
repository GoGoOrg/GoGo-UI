import createApiClient from "./api.service";
import handlingError from "./api.service";
import axios from "axios";

class ChatbotService {
  api: any;
  constructor(baseUrl = "http://localhost:3000/api") {
    this.api = createApiClient(baseUrl);
  }

  async ask(data: any) {
    try {
      const resp = await this.api.post(
        "http://localhost:3000/api/chatbot",
        data
      );
      return resp.data;
    } catch (err: any) {
      handlingError(err);
    }
  }

}

export default new ChatbotService();