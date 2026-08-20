export interface AddUtilityPayload {
  meterNumber: string;
  street: string;
  area: string;
  city: string;
}

export interface AddUtilityResponse {
  success: boolean;
  message: string;
  data?: {
    utilityData: string;
  };
}