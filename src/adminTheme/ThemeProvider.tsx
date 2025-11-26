"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  useEffect(() => {
    const saved = localStorage.getItem("themeMode");
    if (saved) {
      setMode(saved);
    }
  }, []);
  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev == "light" ? "dark" : "light";
      localStorage.setItem("themeMode", next);
      return next;
    });
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
