import React, { useState } from "react";

type Theme = {
  label: string;
  value: string;
};

type ThemeReturnType = {
  themes: Theme[];
  activeTheme: string;
  handleActiveTheme: (value: string) => void;
};

const useTheme = (): ThemeReturnType => {
  const [activeTheme, setActiveTheme] = useState<string>("dark");
  const [themes, setThemes] = useState<Theme[]>([
    {
      label: "Dark Theme",
      value: "dark",
    },
    {
      label: "Light Theme",
      value: "light",
    },
    {
      label: "Sea Theme",
      value: "sea",
    },
  ]);

  const handleActiveTheme = (value: string) => {
    if(value === activeTheme) return
    setActiveTheme(value);
    document.body.setAttribute("data-theme", `${value}-theme`);
  };

  return {
    themes,
    activeTheme,
    handleActiveTheme: (value: string) => handleActiveTheme(value),
  };
};

export default useTheme;
