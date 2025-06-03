import * as Yup from "yup";
export const profileSchema = Yup.object({
  phone: Yup.string().min(12, "Phone number must be at least 12 "),
});

export const changePasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  oldPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Old password is required"),
});
