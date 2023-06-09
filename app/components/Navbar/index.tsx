import React from "react";
import classes from "./Navbar.module.css";
import Link from "next/link";
import ThemeSelector from "../ThemeSelector";

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
  return (
    <nav className={`dp01 ${classes.container}`}>
      <h1 className={classes.logo}><Link className={classes.link} href="/">Reminder App</Link></h1>
      <ul>
        {
          links.map((link, index) => <Link key={index} className={classes.link} href={link.href}><li>{link.label}</li></Link>)
        }
      </ul>
      <div>
        <ThemeSelector />
      </div>
    </nav>
  );
};

export default Navbar;
