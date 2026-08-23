// getLastMonths(data, 2);

export const getLastMonthsBillChartData = (
  data: { date: string; amount: number }[],
  months: number,
) => {
  return [...data]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-months)
    .map((item) => ({
      month: new Date(`${item.date}-01`).toLocaleDateString("en-US", {
        month: "long",
      }),
      bill: item.amount,
    }));
};