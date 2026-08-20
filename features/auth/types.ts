export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
  };
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface Loginresponse {
  seccess: boolean;
  message: string;
  data?: {
    userData: string;
  }
}
