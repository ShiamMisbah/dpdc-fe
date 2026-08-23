"use client";

import { useLoggedInUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Meter } from "@/features/utility_accounts/types";
import { useSelectedMeter } from "@/context/SelectedMeterContext";

type Props = {};

const UtilitySelectGlobal = (props: Props) => {
  const {selectedMeter, selectMeterFunc} = useSelectedMeter()
  const { user } = useLoggedInUser();

  useEffect(() => {
    if (user?.MeterList?.length && !selectedMeter) {
      selectMeterFunction(user?.MeterList[0].meterNumber);
    }
  }, [user, selectedMeter]);

  const selectMeterFunction = (meterNumber: string | null) => {
    const meter = user?.MeterList.find(
      (meter) => meter.meterNumber === meterNumber,
    );

    if (meter) {
      selectMeterFunc(meter);
    }
  };

  return (
    <div className="mb-5 ">
      <Select
        value={selectedMeter?.meterNumber ?? ""}
        onValueChange={(meterId) => {
          selectMeterFunction(meterId);
        }}
        defaultValue={user?.MeterList?.[0]?.meterNumber}
      >
        <SelectTrigger className="w-full max-w-48 bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Meter Number</SelectLabel>
            {user?.MeterList.map((item) => (
              <SelectItem key={item.meterNumber} value={item.meterNumber}>
                {item.meterNumber}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="mt-2 pl-2">{selectedMeter?.address}</div>
    </div>
  );
};

export default UtilitySelectGlobal;
