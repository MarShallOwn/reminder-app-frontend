"use client";

import React, {ChangeEvent} from "react";
import classes from "./Navbar.module.css";
import useTheme from "../../hooks/useTheme";
import Link from "next/link";

const links = [{
  label: "Home",
  href: "/"
},
{
  label: "Login",
  href: "/login"
},
{
  label: "Signup",
  href: "/signup"
}]

const Navbar = () => {
  const { themes, activeTheme, handleActiveTheme } = useTheme();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleActiveTheme(e.target.value)
  }

  return (
    <nav className={`dp01 ${classes.container}`}>
      <h1 className={classes.logo}><Link className={classes.link} href="/">Logo</Link></h1>
      <ul>
        {
          links.map((link, index) => <Link key={index} className={classes.link} href={link.href}><li>{link.label}</li></Link>)
        }
      </ul>
      <div>
        <select className={`dp01 ${classes.selectField}`} onChange={handleSelectChange}>
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
      </div>
    </nav>
  );
};

export default Navbar;
