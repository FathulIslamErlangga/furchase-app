import { LoginData, RegisterData, UserResponse } from "./customInterface";

export interface authProps {
  user: UserResponse | undefined;
  message: string | undefined;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  handleVisibility: () => void;
  clearAuthMessage: () => void;
  isVisibility: boolean;
  status: string | undefined;
}

export interface globalProps {
  auth: authProps;
}
