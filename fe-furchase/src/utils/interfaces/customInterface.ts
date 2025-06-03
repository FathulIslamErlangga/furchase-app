import { authProps } from "./contextInterface";
import { IProfile, IUsers } from "./interface";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface SendMail {
  email: string;
}
export interface ChangePasswrod {
  newPassword: string;
  confirmPassword: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface UserResponse {
  status?: string;
  message: string;
  data: IUsers;
  token?: string;
}

export interface ProfileResponse {
  status?: string;
  message: string;
  data: IProfile;
}
export interface ResetPasswordResponse {
  status?: string;
  message: string;
  data: IUsers;
}

export interface DataProfile {
  firstName: string;
  lastName: string;
  phone: string;
  coverProfile: string;
  thumbnailProfile: string;
}

export interface BioProps {
  auth: authProps;
  open: boolean;
  update: boolean;
  formData: DataProfile;
  coverFileRef: React.RefObject<HTMLInputElement | null>;
  isToast: boolean;
  message: string | undefined;
  status: string | undefined;
  mouseLeave: () => void;
  mouseIn: () => void;
  handleCoverFile: () => void | undefined;
  handleButtonUpdate: () => void;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleUpdate: (e: React.FormEvent<Element>) => Promise<void>;
}

export interface resetPasswordProps {
  isToast: boolean;
  message: string | undefined;
  status: string | undefined;
  initialValues: ResetPassword;
  handleChangePassword: (values: ResetPassword) => Promise<void>;
}
export interface ResetPassword {
  newPassword: string;
  oldPassword: string;
}
