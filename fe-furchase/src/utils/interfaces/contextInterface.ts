import {
  ChangePasswrod,
  LoginData,
  RegisterData,
  SendMail,
  UserResponse,
} from "./customInterface";

export interface authProps {
  user: UserResponse | undefined;
  message: string | undefined;
  register: (data: RegisterData) => Promise<void>;
  sendMail: (data: SendMail) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  forgot: (data: ChangePasswrod) => Promise<void>;
  handleVisibility: () => void;
  clearAuthMessage: () => void;
  logout: () => void;
  isVisibility: boolean;
  status: string | undefined;
}

export interface globalProps {
  auth: authProps;
}
