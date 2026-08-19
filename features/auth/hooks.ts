import { loginUser, registerUser } from "./api";
import { LoginPayload, RegisterPayload } from "./types";
import { useMutation } from "@tanstack/react-query";


export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload)
  })
}
