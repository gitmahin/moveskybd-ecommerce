"use client";
import axios from "axios";
import { AuthComp } from "../AuthComp";

export default function LoginPage() {
  const handleLoginUser = async () => {
    await axios.get("http://localhost:3001/api/v1/user/login", {
      params: {
        identifier: "jhondoe",
        password: "JhonDoe15506",
      },
    });
  };
  return (
    <AuthComp
      title="Sign in"
      desc="Welcome back to MoveSky"
      authType="login"
      reversedAuthPath="/sign-up"
      onSubmit={handleLoginUser}
    />
  );
}
