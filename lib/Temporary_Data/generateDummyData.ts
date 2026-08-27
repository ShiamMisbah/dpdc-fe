type UsageData = {
  date: string;
  usage: number; // kWh
};

interface MonthlyBillData {
  date: string;
  amount: number;
}

// generateDailyUsage("2026-08-01", 30)

export const generateDailyUsage = (startDate: string, days: number): UsageData[] => {
  const data: UsageData[] = [];
  const start = new Date(startDate);

  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const dayOfWeek = date.getDay();

    // Base household usage
    let usage = 8 + Math.random() * 6;

    // Higher usage on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      usage += 2 + Math.random() * 3;
    }

    // Random daily variation
    usage += (Math.random() - 0.5) * 3;

    data.push({
      date: date.toISOString().split("T")[0],
      usage: Number(Math.max(4, usage).toFixed(2)),
    });
  }

  return data;
};

export interface Bill {
  userId: string;
  meterNumber: string;
  month: string;
  year: string;
  usage: number;
  paymentAmount: number;
  paidBy: string;
  paymentStatus: boolean;
  currentMonth: boolean;
  dueData: string;
  paymentDate: string;
}

export const generateMonthlyBills = (
  startDate: string,
  months: number,
  userId: string,
  meterNumber: string,
): Bill[] => {
  const data: Bill[] = [];
  const start = new Date(startDate);

  const today = new Date();

  for (let i = 0; i < months; i++) {
    const date = new Date(start);
    date.setMonth(start.getMonth() + i);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    // Generate electricity usage
    const usage = Number((150 + Math.random() * 250).toFixed(2));

    // Generate bill amount based on usage
    const ratePerUnit = 8;
    const paymentAmount = Number(Math.max(400, usage * ratePerUnit).toFixed(2));

    // Current month
    const currentMonth =
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    // Example: bill due on the 10th of the following month
    const dueDate = new Date(date);
    dueDate.setMonth(dueDate.getMonth() + 1);
    dueDate.setDate(10);

    // Random payment status for past months
    const isPastMonth =
      date < new Date(today.getFullYear(), today.getMonth(), 1);

    const paymentStatus = isPastMonth ? Math.random() > 0.2 : false;

    // Payment date only exists when paid
    let paymentDate = "";

    if (paymentStatus) {
      const paidDate = new Date(dueDate);
      paidDate.setDate(paidDate.getDate() - Math.floor(Math.random() * 10 + 1));

      paymentDate = paidDate.toISOString().split("T")[0];
    }

    data.push({
      userId,
      meterNumber,
      month,
      year,
      usage,
      paymentAmount,
      paidBy: paymentStatus ? "Online" : "",
      paymentStatus,
      currentMonth,
      dueData: dueDate.toISOString().split("T")[0],
      paymentDate,
    });
  }

  return data;
};


