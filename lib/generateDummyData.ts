type UsageData = {
  date: string;
  usage: number; // kWh
};

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


