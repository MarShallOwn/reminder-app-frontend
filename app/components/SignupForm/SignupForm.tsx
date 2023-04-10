"use client";

import React, { ChangeEvent, useState } from "react";

type UserType = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string
}

const SignupForm = () => {
  const [user, setUser] = useState<UserType>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleFieldChange = (fieldName: string) => (e: ChangeEvent<HTMLInputElement>) =>
    setUser(prevState => ({...prevState, [fieldName]: e.target.value}));

  const handleFormSubmit = () => {
  };

  return (
    <form onSubmit={handleFormSubmit}>
              <input value={user.firstname} onChange={handleFieldChange("firstname")} type="text" />
              <input value={user.lastname} onChange={handleFieldChange("lastname")} type="text" />
      <input value={user.email} onChange={handleFieldChange("email")} type="text" />
      <input value={user.password} onChange={handleFieldChange("password")} type="text" />
      <input value={user.confirmPassword} onChange={handleFieldChange("confirmPassword")} type="text" />
    </form>
  );
};

export default SignupForm;
