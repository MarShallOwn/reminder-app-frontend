"use client";
import React, { ChangeEvent } from "react";
import classes from "./ThemeSelector.module.css";
import useAppTheme, { ThemesTypes } from "@/app/hooks/useTheme";

const ThemeSelector = () => {
  const { themes, activeTheme, handleActiveTheme } = useAppTheme();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ThemesTypes;
    handleActiveTheme(value);
  };

  return (
    <select
      value={activeTheme}
      className={`dp01 ${classes.selectField}`}
      onChange={handleSelectChange}
    >
      {themes.map((theme, index) => (
        <option
          value={theme.value}
          key={`${theme.value}=${index}`}
          className={`dp01 ${classes.themeBtn} ${
            theme.value === activeTheme && classes.activeThemeBtn
          }`}
        >
          {theme.label}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelector;
