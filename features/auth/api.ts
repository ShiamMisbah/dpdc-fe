import { user12 } from "@/lib/Temporary_Data/User-list/UserList";
import { LoginPayload, RegisterPayload } from "./types";

export const registerUser = async (payload: RegisterPayload) => {
  console.log("Payload Going to backend(registerUser)", payload);
};

export const loginUser = async (payload: LoginPayload) => {
  console.log("Payload Going to backend(LoginUser)", payload);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (payload.identifier === "error@test.com") {
    throw new Error("Invalid email or password");
  }

  return {
    success: true,
    message: "Login successful!",
    data: user12
  };
};
