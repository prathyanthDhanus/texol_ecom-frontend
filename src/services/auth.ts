import api from "../axios/httpMethods";
import { useMutation } from "@tanstack/react-query";

import type {
  LoginFormValues,
  LoginResponse,
  RegisterFormValues,
  RegisterResponse,
} from "../types/auth";

//・・・・・・・・・・・・・・・ Register Api ・・・・・・・・・・・・・・・
export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterFormValues>({
    mutationFn: async (credentials) => {
      const res = await api.post<RegisterResponse>(
        "/auth/register",
        credentials
      );
      return res.data;
    },
  });
};

//・・・・・・・・・・・・・・・ Login Api ・・・・・・・・・・・・・・・
export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginFormValues>({
    mutationFn: async (credentials) => {
  
      const res = await api.post<LoginResponse>("/auth/login", credentials);
      
      return res.data;
    },
  });
};
