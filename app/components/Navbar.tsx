"use client"

import React, { useState } from 'react'
import classes from "./Navbar.module.css"

type Theme = {
    label: string,
    value: string
}


const Navbar = () => {

const [activeTheme, setActiveTheme] = useState<string>("light")
const [themes, setThemes] = useState<Theme[]>([{
    label: "Dark Theme",
    value: "dark"
},{
    label: "Light Theme",
    value: "light"
},{
    label: "Sea Theme",
    value: "sea"
}])

const handleActiveTheme = (value : string) => () => {
    setActiveTheme(value);
    document.body.setAttribute("data-theme", `${value}-theme`);
}

  return (
    <nav className={classes.container}>
        <h1>Logo</h1>

        <ul>
            <li>Home</li>
            <li>About</li>
            <li>Admin</li>
        </ul>
        <div>
            {themes.map(theme => activeTheme !== theme.value && <p className={classes.themeBtn} onClick={handleActiveTheme(theme.value)}>{theme.label}</p>)}
        </div>
    </nav>
  )
}

export default Navbar