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

export const generateMonthlyBills = (
  startDate: string,
  months: number,
): MonthlyBillData[] => {
  const data: MonthlyBillData[] = [];
  const start = new Date(startDate);

  for (let i = 0; i < months; i++) {
    const date = new Date(start);
    date.setMonth(start.getMonth() + i);

    let amount = 800 + Math.random() * 500;

    amount += (Math.random() - 0.5) * 200;

    data.push({
      date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}`,
      amount: Number(Math.max(400, amount).toFixed(2)),
    });
  }

  return data;
};


