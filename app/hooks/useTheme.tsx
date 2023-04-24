import { useState } from "react";

export type ThemesTypes = "dark" | "light";

type Theme = {
  label: string;
  value: ThemesTypes
};

type ThemeReturnType = {
  themes: Theme[];
  activeTheme: string;
  handleActiveTheme: (value: ThemesTypes) => void;
};

const useAppTheme = (): ThemeReturnType => {
  const [activeTheme, setActiveTheme] = useState<ThemesTypes>("dark");
  const [themes, setThemes] = useState<Theme[]>([
    {
      label: "Dark Theme",
      value: "dark",
    },
    {
      label: "Light Theme",
      value: "light",
    },
  ]);

  const handleActiveTheme = (value: ThemesTypes) => {
    if(value === activeTheme) return
    setActiveTheme(value);
    document.body.setAttribute("data-theme", `${value}-theme`);
  };

  return {
    themes,
    activeTheme,
    handleActiveTheme: (value) => handleActiveTheme(value),
  };
};

export default useAppTheme;