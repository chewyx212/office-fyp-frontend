
import { CreateAreaType } from "types/AreaType";
import axios from "utils/axios/AxiosHandler";

export const AreaApi = {
  postBranchArea: async (payload: CreateAreaType) => {
    return axios.post("area", payload);
  },
  getAllArea: async () => {
    return axios.get("area");
  },
};
