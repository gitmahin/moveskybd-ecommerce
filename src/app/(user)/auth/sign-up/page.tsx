"use client";
import React from "react";
import { AuthComp } from "../AuthComp";
import axios from "axios";

export default function SignupPage() {
  const handleCreateNewUser = async () => {
    console.log("creating account")
    await axios.post("http://localhost:3001/api/v1/user/create", {
      email: "nimahin25@gmail.com",
      password: "Mahin15006",
      username: "gitmahin",
    });
  };
  return (
    <AuthComp
      title="Sign up"
      desc="Create your MoveSky account"
      authType="signup"
      reversedAuthPath="/sign-in"
      showConfirmPassInput
      showNameInput
      onSubmit={handleCreateNewUser}
    />
  );
}
