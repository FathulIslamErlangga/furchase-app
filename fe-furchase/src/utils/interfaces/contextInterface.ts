import {
  ChangePasswrod,
  DataAddress,
  DataResponse,
  LoginData,
  ProfileResponse,
  RegisterData,
  ResetPassword,
  ResetPasswordResponse,
  SendMail,
  UserResponse,
} from "./customInterface";

export interface authProps {
  user: UserResponse | undefined;
  message: string | undefined;
  register: (data: RegisterData) => Promise<void>;
  sendMail: (data: SendMail) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  getUsers: (token: string) => Promise<void>;
  forgot: (data: ChangePasswrod) => Promise<void>;
  handleVisibility: () => void;
  clearAuthMessage: () => void;
  logout: () => void;
  isVisibility: boolean;
  status: string | undefined;
}

export interface profileProps {
  profiles: ProfileResponse | undefined;
  change: ResetPasswordResponse | undefined;
  message: string | undefined;
  status: string | undefined;
  profile: (data: FormData, slug: string) => Promise<void>;
  clearProfileMessage: () => void;
  changePassword: (data: ResetPassword, slug: string) => Promise<boolean>;
}

export interface addressProps {
  addresses: DataResponse | undefined;
  message: string | undefined;
  status: string | undefined;
  clearAddressMessage: () => void;
  CreateAddress: (data: DataAddress, slug: string) => Promise<void>;
  getDataAddress: (slug: string) => Promise<void>;
  updateAddress: (data: DataAddress, id: string, slug: string) => Promise<void>;
  deleteAddress: (id: string, slug: string) => Promise<void>;
  selectAddress: (id: string, slug: string) => Promise<void>;
}

export interface globalProps {
  auth: authProps;
  profiles: profileProps;
  address: addressProps;
}
