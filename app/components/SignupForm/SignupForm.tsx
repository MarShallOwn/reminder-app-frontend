"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import classes from "../../styles/authForm.module.css";
import getAPIURL from "@/app/utils/getAPIURL";

type UserType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const [user, setUser] = useState<UserType>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFieldChange =
    (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) =>
      setUser((prevState) => ({ ...prevState, [fieldName]: e.target.value }));

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(getAPIURL("/auth/signup"), {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
          },
        body: JSON.stringify(user)
      })

      console.log(res);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);

        const message = err.message;

        console.log(message);
      }
      else {
        console.log(`something went wrong: ${err}`);
      }
    }
  };

  return (
      <form className={`dp01 ${classes.container}`} onSubmit={handleFormSubmit}>
        <div className={classes.textFieldContainer}>
          <label>Firstname:</label>
          <input
            className={`dp01 ${classes.textField}`}
            value={user.firstname}
            onChange={handleFieldChange("firstname")}
            type="text"
          />
        </div>

        <div className={classes.textFieldContainer}>
          <label>Lastname:</label>
          <input
            className={`dp01 ${classes.textField}`}
            value={user.lastname}
            onChange={handleFieldChange("lastname")}
            type="text"
          />
        </div>

        <div className={classes.textFieldContainer}>
          <label>Email:</label>
          <input
            className={`dp01 ${classes.textField}`}
            value={user.email}
            onChange={handleFieldChange("email")}
            type="text"
          />
        </div>

        <div className={classes.textFieldContainer}>
          <label>Password:</label>
          <input
            className={`dp01 ${classes.textField}`}
            value={user.password}
            onChange={handleFieldChange("password")}
            type="password"
          />
        </div>

        <div className={classes.textFieldContainer}>
          <label>Confirm Password:</label>
          <input
            className={`dp01 ${classes.textField}`}
            value={user.confirmPassword}
            onChange={handleFieldChange("confirmPassword")}
            type="password"
          />
        </div>

        <button className={`dp02 ${classes.submitBtn}`} type="submit">
          Submit
        </button>
      </form>
  );
};

export default SignupForm;
