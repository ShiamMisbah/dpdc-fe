"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes injects an inline <script> to set the theme class before
// hydration (avoiding a flash of the wrong theme). React 19 + Next 16.2+
// warns about any script tag rendered inside a component — this is a known
// false positive (next-themes GitHub #385/#387), not a real bug: the script
// still works correctly during SSR. This filters only that exact message;
// every other console.error still passes through untouched.
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag while rendering React component")
    ) {
      return;
    }
    originalError(...args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}