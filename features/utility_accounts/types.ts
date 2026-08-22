type UsageData = {
  date: string;
  usage: number; // kWh
};

interface MonthlyBillData {
  date: string;
  amount: number;
}

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

export interface Meter {
  userId: number;
  meterNumber: string;
  activeStatus: boolean;
  lastRecharged: string;
  currentBalance: number;
  meterReading: number;
  address: string;
  usage_list: UsageData[];
  bill_list: MonthlyBillData[];
}
