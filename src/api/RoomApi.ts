import axios from "utils/axios/AxiosHandler";
import axiosFD from "axios";

export const RoomApi = {
  createRoom: async (payload: {
    name: string;
    detail: string;
    branchId: string;
    status: boolean;
  }) => {
    return axios.post("room", payload);
  },
  getAllRoom: async (branchId: string) => {
    return axios.get(`room?branchId=${branchId}`);
  },
};
