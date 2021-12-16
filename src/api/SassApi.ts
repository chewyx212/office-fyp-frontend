import axios from "utils/axios/AxiosHandler";

export const SassApi = {
  getSassList: async () => {
    return axios.get("/api/v1/get-saas-list");
  },
};
