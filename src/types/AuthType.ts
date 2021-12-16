export interface RegisterForm {
  name: string;
  phone_number: string;
  email: string;
  username: string;
  password: string;
  pin: string;
}

export interface LoginForm {
  input: string;
  password: string;
}

export interface UserInfoType {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  username: string;
}
