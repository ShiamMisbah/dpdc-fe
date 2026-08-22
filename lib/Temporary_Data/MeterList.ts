import list_102938 from "@/lib/Temporary_Data/Usage-Reading/MTR-102938/UsageReading_102938.json"
import list_284751 from "@/lib/Temporary_Data/Usage-Reading/MTR-284751/UsageReading_284751.json";
import list_391624 from "@/lib/Temporary_Data/Usage-Reading/MTR-391624/UsageReading_391624.json";
import bill_list_102938 from "@/lib/Temporary_Data/Usage-Reading/MTR-102938/BillReading_102938.json";
import bill_list_284751 from "@/lib/Temporary_Data/Usage-Reading/MTR-284751/BillReading_284751.json";
import bill_list_391624 from "@/lib/Temporary_Data/Usage-Reading/MTR-391624/BillReading_391624.json";
import { Meter } from "@/features/utility_accounts/types";

const meter1: Meter = {
  userId: 12,
  meterNumber: "MTR-102938",
  activeStatus: true,
  lastRecharged: "2026-08-12",
  currentBalance: 2450.0,
  meterReading: 12845,
  address: "123 Dhaka Road, Dhanmondi, Dhaka",
  usage_list: list_102938,
  bill_list: bill_list_102938
};

const meter2: Meter = {
  userId: 12,
  meterNumber: "MTR-284751",
  activeStatus: true,
  lastRecharged: "2026-08-10",
  currentBalance: 1875.5,
  meterReading: 9632,
  address: "45 Lake Drive, Gulshan, Dhaka",
  usage_list: list_284751,
  bill_list: bill_list_284751,
};

const meter3: Meter = {
  userId: 12,
  meterNumber: "MTR-391624",
  activeStatus: false,
  lastRecharged: "2026-07-28",
  currentBalance: 320.75,
  meterReading: 18421,
  address: "78 Station Road, Uttara, Dhaka",
  usage_list: list_391624,
  bill_list: bill_list_391624,
};

export const User12_MeterList: Meter[] = [meter1, meter2, meter3];