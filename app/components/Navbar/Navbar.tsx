"use client"

import React from "react";
import classes from "./Navbar.module.css";
import Link from "next/link";
import ThemeSelector from "../ThemeSelector";
import { signIn } from "next-auth/react";

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
      <h1 className={classes.logo}><Link className={classes.link} href="/">Logo</Link></h1>
      <ul>
        <li onClick={() => signIn()}>Next-Auth Signin</li>
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
