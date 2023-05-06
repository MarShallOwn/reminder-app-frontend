import { useEffect, useState } from "react";

type Theme = {
  label: string;
  value: ThemesTypes;
};

type ThemeReturnType = {
  themes: Theme[];
  activeTheme: ThemesTypes;
  handleActiveTheme: (value: ThemesTypes) => void;
};



const useAppTheme = (): ThemeReturnType => {
  const [activeTheme, setActiveTheme] = useState<ThemesTypes>("light");
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

  useEffect(() => {
    const appTheme = (localStorage.getItem('app-theme') || "light") as ThemesTypes
    setActiveTheme(appTheme)
  }, [])

  useEffect(() => {
    document.body.setAttribute("data-theme", `${activeTheme}-theme`);
  }, [activeTheme]);

  const handleActiveTheme = (value: ThemesTypes) => {
    if (value === activeTheme) return;
    setActiveTheme(value);
    localStorage.setItem("app-theme", value);
  };

  return {
    themes,
    activeTheme,
    handleActiveTheme: (value) => handleActiveTheme(value),
  };
};

export default useAppTheme;
