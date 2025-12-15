import * as yup from "yup";

export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().min(4, "Minimum 4 characters").required("Password required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
});
