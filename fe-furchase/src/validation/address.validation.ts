// schemas/address.schema.ts
import * as yup from "yup";

export const addressSchema = yup.object({
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters long"),

  city: yup
    .string()
    .required("City is required")
    .min(2, "City name is too short"),

  province: yup
    .string()
    .required("Province is required")
    .min(2, "Province name is too short"),

  postalCode: yup
    .number()
    .typeError("Postal code must be a number")
    .required("Postal code is required")
    .test(
      "len",
      "Postal code must be 5 digits",
      (val) => !!val && val.toString().length === 5
    ),

  label: yup
    .string()
    .required("Label is required")
});
