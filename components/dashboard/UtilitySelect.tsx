"use client";

import React from "react";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};
const items = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

// Matches the defaultTheme prop on <ThemeProvider> in app/layout.tsx.
// Keep these in sync if that default ever changes.
const DEFAULT_THEME = "light";

const UtilitySelect = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // next-themes can only resolve the persisted theme on the client, so
  // `theme` is `undefined` until mount. Rather than passing `undefined` to
  // the Select (which flips it from uncontrolled to controlled — a separate
  // bug Base UI warns about), we always pass a defined string: the
  // ThemeProvider's default before mount, the real theme after. Server and
  // first client render both show "Light", avoiding the earlier hydration
  // mismatch too.
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (value: string | null) => {
    if (value) setTheme(value);
  };

  return (
    <Select
      value={mounted ? theme ?? DEFAULT_THEME : DEFAULT_THEME}
      onValueChange={handleThemeChange}
      items={items}
    >
      <SelectTrigger
        size="md"
        className="bg-card w-40 rounded-full text-md px-4 shadow-sm"
      >
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} className=" rounded-lg">
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UtilitySelect;