import axios from "./AxiosManager";

class APIManager {
  getProvider() {
    return axios;
  }

  sendPost(url: string, data: any) {
    return this.getProvider().post(url, data);
  }

  sendPatch(url: string, data: any) {
    return this.getProvider().patch(url, data);
  }

  sendGet(url: string) {
    return this.getProvider().get(url);
  }

  sendDelete(url: string) {
    return this.getProvider().delete(url);
  }
}

const instance = new APIManager();

export default instance;
