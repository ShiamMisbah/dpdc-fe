import { LoggedInUser } from "@/features/auth/types";
import { User12_MeterList } from "../MeterList";

export const user12: LoggedInUser = {
  userId: "12",
  firstName: "Shiam",
  lastName: "Misbah",
  email: "shiam@gmail.com",
  phoneNumber: "01746505052",
  MeterList: User12_MeterList,
};