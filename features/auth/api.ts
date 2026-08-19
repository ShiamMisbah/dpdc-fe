import { LoginPayload, RegisterPayload } from "./types";

export const registerUser = async(payload: RegisterPayload) => {
    console.log("Payload Going to backend(registerUser)", payload);
}


export const loginUser = async(payload: LoginPayload) => {
    console.log("Payload Going to backend(LoginUser)", payload);

}