"use client"

import BillCard from '@/components/bill/BillCard';
import { useSelectedMeter } from '@/context/SelectedMeterContext';
import { generateMonthlyBills } from '@/lib/Temporary_Data/generateDummyData';
import React from 'react'

type Props = {}

const page = (props: Props) => {
  // console.log(generateMonthlyBills("2025-01-01", 12, "user12", "MTR-391624"));
  const {selectedMeter} = useSelectedMeter()
  console.log(selectedMeter);
  
  if (!selectedMeter) return <>Loading</>;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {selectedMeter.bill_list.length > 0 &&
          selectedMeter.bill_list.map((bill, idx) => (
            <BillCard bill={bill} key={idx} />
          ))}
      </div>
    </div>
  );
}

export default page