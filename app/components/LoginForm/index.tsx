"use client";

import { loginAction } from "@/app/redux/actions/authActions";
import { AppDispatch } from "@/app/redux/store";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "../../styles/authForm.module.css"


const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginAction({ email, password }));
  };

  return (
    <form className={`dp01 ${classes.container}`} onSubmit={handleFormSubmit}>
      <div className={classes.textFieldContainer}>
        <label>Email:</label>
        <input className={`dp01 ${classes.textField}`} value={email} onChange={handleEmailChange} type="text" />
      </div>

      <div className={classes.textFieldContainer}>
        <label>Password:</label>
        <input className={`dp01 ${classes.textField}`} value={password} onChange={handlePasswordChange} type="password" />
      </div>

      <button className={`dp02 ${classes.submitBtn}`} type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
