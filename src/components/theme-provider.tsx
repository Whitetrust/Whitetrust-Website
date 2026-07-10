"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Theme = "light" | "dark";

type Ctx = {
  theme: Theme;
  toggle: () => void;
  set: (t: Theme) => void;
};

const ThemeCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = "cawt_theme";

// Site is locked to the light ("day") theme per client direction.
function applyTheme() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeInner] = useState<Theme>("light");

  const set = useCallback((t: Theme) => {
    setThemeInner(t);
    applyTheme();
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  }, []);

  const toggle = useCallback(() => set(theme === "dark" ? "light" : "dark"), [theme, set]);

  return (
    <ThemeCtx.Provider value={{ theme, toggle, set }}>{children}</ThemeCtx.Provider>
  );
}

export function useTheme() {
  const v = useContext(ThemeCtx);
  if (!v) throw new Error("useTheme outside ThemeProvider");
  return v;
}

export function ThemeBootstrap() {
  // Light theme only — ensure no stored/system dark preference is applied.
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.classList.remove('dark');`,
      }}
    />
  );
}
