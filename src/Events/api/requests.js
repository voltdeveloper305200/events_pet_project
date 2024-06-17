import Api from "../../api/BaseAPI";

class Requests {
  constructor() {
    this.api = new Api();
  }
  async getEvents() {
    try {
      const response = await this.api.get(`/events`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Requests;
