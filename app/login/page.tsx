import React from 'react'
import classes from "./Login.module.css"
import LoginForm from '../components/LoginForm'
import Providers from '../components/Providers'

type Props = {}

const Login = (props: Props) => {
  return (
    <div className={classes.container}> 
      <h1>Login</h1>

      <Providers>
        <LoginForm />
      </Providers>
    </div>
  )
}

export default Login