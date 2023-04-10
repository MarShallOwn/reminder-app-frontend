import React from 'react'
import Link from 'next/link'
import classes from "./Home.module.css"
import { store } from './redux/store'
import { loginAction } from './redux/actions/authActions'


const Home = async () => {

  return (
    <main className={classes.container}>
    <h1>Welcome To Reminder App</h1>
    <Link className={classes.linkBtn} href="login">Login</Link>
    <Link className={classes.linkBtn} href="signup">Signup</Link>
    </main>
  )
}

export default Home