export type UsageData = {
  date: string;
  usage: number; // kWh
};

type MonthYear = {
  month: string;
  year: string;
};

export type Period = "daily" | "weekly" | "monthly" | "yearly";

const getWeeklyUsage = (data: UsageData[]) => {
  const weeks: Record<string, number> = {};

  data.forEach(({ date, usage }) => {
    const currentDate = new Date(date);

    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const diff = currentDate.getTime() - startOfYear.getTime();

    const week = Math.ceil((diff / 86400000 + startOfYear.getDay() + 1) / 7);

    const key = `Week ${week}`;

    weeks[key] = (weeks[key] || 0) + usage;
  });

  return Object.entries(weeks).map(([week, usage]) => ({
    week,
    usage: Number(usage.toFixed(2)),
  }));
};

const getDailyUsage = (data: UsageData[]) => data

const getMonthlyUsage = (data: UsageData[]) => {
  const months: Record<string, number> = {};

  data.forEach(({ date, usage }) => {
    const month = date.slice(0, 7);

    months[month] = (months[month] || 0) + usage;
  });

  return Object.entries(months).map(([month, usage]) => ({
    date: month,
    usage: Number(usage.toFixed(2)),
  }));
};

const getYearlyUsage = (data: UsageData[]) => {
  const years: Record<string, number> = {};

  data.forEach(({ date, usage }) => {
    const year = date.slice(0, 4);

    years[year] = (years[year] || 0) + usage;
  });

  return Object.entries(years).map(([year, usage]) => ({
    date: year,
    usage: Number(usage.toFixed(2)),
  }));
};

export const getUsagereport = (period: Period, dataset: UsageData[]) => {
  const usageReports = {
    daily: getDailyUsage(dataset),
    weekly: getWeeklyUsage(dataset),
    monthly: getMonthlyUsage(dataset),
    yearly: getYearlyUsage(dataset),
  };

  return usageReports[period];
}; 


