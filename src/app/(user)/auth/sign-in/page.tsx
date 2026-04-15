"use client";
import axios from "axios";
import { AuthComp } from "../AuthComp";

export default function LoginPage() {
  const handleLoginUser = async () => {
    await axios.get("http://localhost:3001/api/v1/user/login", {
      params: {
        email: "nimulmahin@gmail.com",
        username: "gitmahin",
        password: "Mahin15006",
      },
    });
  };
  return (
    <AuthComp
      title="Sign in"
      desc="Welcome back to MoveSky"
      authType="login"
      reversedAuthPath="/sign-up"
      onSubmit={ handleLoginUser}
    />
  );
}
