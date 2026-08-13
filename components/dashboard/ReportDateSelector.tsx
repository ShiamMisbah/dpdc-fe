"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Period } from "@/lib/UsageCalculationFunctions";

export type ReportDate = {
  month: string;
  year: string;
};

interface ReportDateSelectorProps {
  period: Period;
  value: ReportDate;
  onChange: (value: ReportDate) => void;
}

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const years = Array.from({ length: 6 }, (_, index) =>
  String(new Date().getFullYear() - index),
);

export function ReportDateSelector({
  period,
  value,
  onChange,
}: ReportDateSelectorProps) {
  const updateValue = (key: keyof ReportDate, newValue: string | null) => {
    onChange({
      ...value,
      [key]: newValue,
    });
  };  
  return (
    <div className="flex items-center gap-2">
      {/* Daily */}
      {period === "daily" && (
        <>
          <Select
            value={value.month}
            onValueChange={(newValue) => updateValue("month", newValue)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>

            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={value.year}
            onValueChange={(newValue) => updateValue("year", newValue)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>

            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}

      {/* Monthly */}
      {period === "monthly" && (
        <>
          <Select
            value={value.year}
            onValueChange={(newValue) => updateValue("year", newValue)}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>

            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}
    </div>
  );
}
