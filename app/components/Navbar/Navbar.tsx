"use client";

import React, {ChangeEvent} from "react";
import classes from "./Navbar.module.css";
import useTheme from "../../hooks/useTheme";
import Link from "next/link";

const Navbar = () => {
  const { themes, activeTheme, handleActiveTheme } = useTheme();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleActiveTheme(e.target.value)
  }

  return (
    <nav className={classes.container}>
      <h1 className={classes.logo}><Link className={classes.link} href="/">Logo</Link></h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Admin</li>
      </ul>
      <div>
        <select className={classes.selectField} onChange={handleSelectChange}>
          {themes.map((theme, index) => (
            <option
            value={theme.value}
              key={`${theme.value}=${index}`}
              className={`${classes.themeBtn} ${
                theme.value === activeTheme && classes.activeThemeBtn
              }`}
            >
              {theme.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
