// getLastMonths(data, 2);

import { Bill } from "@/features/bills/types";

export const getLastMonthsBillChartData = (data: Bill[], months: number) => {
  return [...data]
    .sort((a, b) => {
      const dateA = new Date(Number(a.year), Number(a.month) - 1);
      const dateB = new Date(Number(b.year), Number(b.month) - 1);

      return dateA.getTime() - dateB.getTime();
    })
    .slice(-months)
    .map((item) => ({
      month: new Date(
        Number(item.year),
        Number(item.month) - 1,
      ).toLocaleDateString("en-US", {
        month: "short",
      }),
      bill: item.paymentAmount,
    }));
};