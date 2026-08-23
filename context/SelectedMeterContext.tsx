"use client";

import { Meter } from "@/features/utility_accounts/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SelectedMeterContextType {
  selectedMeter: Meter | null;
  setSelectedMeter: React.Dispatch<React.SetStateAction<Meter | null>>;
  selectMeterFunc: (meter: Meter) => void;
}

const SelectedMeterContext = createContext<
  SelectedMeterContextType | undefined
>(undefined);

export const SelectedMeterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedMeter, setSelectedMeter] = useState<Meter | null>(null);
  useEffect(() => {
    const storedSelectedMeter = localStorage.getItem("DPDC-SelectedMeterData");

    if (!storedSelectedMeter) return;

    try {
      const parsedSelectedMeter: Meter = JSON.parse(storedSelectedMeter);
      setSelectedMeter(parsedSelectedMeter);
    } catch (error) {
      console.error("Failed to parse stored meter:", error);
      localStorage.removeItem("DPDC-SelectedMeterData");
    }
  }, []);
  const selectMeterFunc = (meter: Meter) => {
    localStorage.setItem("DPDC-SelectedMeterData", JSON.stringify(meter));

    setSelectedMeter(meter);
  };
  return (
    <SelectedMeterContext.Provider
      value={{ selectedMeter, selectMeterFunc, setSelectedMeter }}
    >
      {children}
    </SelectedMeterContext.Provider>
  );
};

export const useSelectedMeter = () => {
  const context = useContext(SelectedMeterContext);

  if (!context) {
    throw new Error(
      "useSelectedMeter must be used within SelectedMeterProvider",
    );
  }

  return context;
};
