import { CreateAreaType } from "types/AreaType";
import axios from "utils/axios/AxiosHandler";
import axiosFD from "axios";

export const AreaApi = {
  postBranchArea: async (payload: CreateAreaType) => {
    return axios.post("area", payload);
  },
  getAllArea: async (branchId: string) => {
    return axios.get(`area?branchId=${branchId}`);
  },
  // createArea: async (payload: any) => {
  //   const fd = new FormData();
  //   const token = await localStorage.getItem("user_token");
  //   fd.append("name", payload.name);
  //   if (payload.image) {
  //     fd.append("image", payload.image);
  //   }

  //   return axiosFD.post("area", fd, {
  //     headers: {
  //       Authorization: `Bear ${token}`,
  //       "Content-Type": "Multipart/form-data",
  //     },
  //   });
  // },
  createArea: async (payload: any) => {
    const fd = new FormData();
    const token = await localStorage.getItem("user_token");
    if (payload.image) {
      fd.append("image", payload.image);
    }

    return axiosFD.post("area/upload", fd, {
      headers: {
        Authorization: `Bear ${token}`,
        "Content-Type": "Multipart/form-data",
      },
    });
  },
};
