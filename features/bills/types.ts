export interface Bill {
  billId: string;
  userId: string;
  meterNumber: string;
  month: string;
  year: string;
  usage: number;
  paymentAmount: number;
  paidBy: string;
  paymentStatus: boolean;
  currentMonth: boolean;
  dueDate: string;
  paymentDate: string;
}