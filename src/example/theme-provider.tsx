// Simplified version of the theme provider
// Please find details in https://ui.shadcn.com/docs/dark-mode

import { useEffect } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = "dark",
}) => {
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (defaultTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(defaultTheme);
  }, [defaultTheme]);

  return <main>{children}</main>;
};
