"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

const themes = ["light", "dark", "green", "dark-green", "blue", "dark-blue", "orange", "dark-orange"];

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props} themes={themes}>{children}</NextThemesProvider>
}
