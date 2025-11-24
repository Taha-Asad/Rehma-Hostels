"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./theme";

const ThemeContext = createContext({ toggleTheme: () => {}, mode: "light" });

export const useThemeMode = () => useContext(ThemeContext);
interface ThemeProps {
  children: ReactNode;
}
export default function ThemeProvider({ children }: ThemeProps) {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => Theme(mode), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
