"use client";

import { loginAction } from "@/app/redux/actions/authActions";
import { AppDispatch } from "@/app/redux/store";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";


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
    <form onSubmit={handleFormSubmit}>
      <input value={email} onChange={handleEmailChange} type="text" />
      <input value={password} onChange={handlePasswordChange} type="text" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
