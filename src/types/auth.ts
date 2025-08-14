import type { FormikProps } from "formik";

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface LoginFormProps {
  formik: FormikProps<LoginFormValues>;
  isLoading: boolean;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: {
      _id: string;
      username: string;
      email: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export interface RegisterFormProps {
  formik: FormikProps<RegisterFormValues>;
  isLoading: boolean;
}

export interface RegisterResponse {
  status: string;
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
