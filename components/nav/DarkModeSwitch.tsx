"use client";

import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type Props = {};

const items = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
];

// Matches the defaultTheme prop on <ThemeProvider> in app/layout.tsx.
// Keep these in sync if that default ever changes.
const DEFAULT_THEME = "light";

const DarkModeSwitch = (props: Props) => {
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
  
    const activeTheme = mounted ? theme ?? DEFAULT_THEME : DEFAULT_THEME;
    const ActiveIcon =
      items.find((item) => item.value === activeTheme)?.icon ?? Sun;
  
    return (
      <Select value={activeTheme} onValueChange={handleThemeChange} items={items}>
        <SelectTrigger
          size="sm"
          aria-label="Theme"
          className="h-10 gap-1 rounded-full bg-card px-3 shadow-sm"
        >
          <ActiveIcon className="size-4" />
        </SelectTrigger>
        <SelectContent
          alignItemWithTrigger={false}
          align="end"
          className="w-36 rounded-lg"
        >
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <item.icon className="size-4" />
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
};

export default DarkModeSwitch;
