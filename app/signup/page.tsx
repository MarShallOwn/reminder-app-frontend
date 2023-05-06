import React from 'react'
import classes from "./Signup.module.css"
import SignupForm from '../components/SignupForm/SignupForm'

const Signup = () => {
  return (
    <div className={classes.container}> 
      <h1>Signup</h1>

      <SignupForm />
    </div>
  )
}

export default Signup