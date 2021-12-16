import { LoginForm, RegisterForm } from "types/AuthType";
import axios from "utils/axios/AxiosHandler";

export const authApi = {
  sendOtp: async (phone_number: string) => {
    return axios.post(`/api/v1/user-send-otp/${phone_number}`);
  },
  userLogin: async (payload: LoginForm) => {
    return axios.post("/api/v1/user-login", payload);
  },
  userRegister: async (payload: RegisterForm) => {
    return axios.post("/api/v1/user-register", payload);
  },
};
