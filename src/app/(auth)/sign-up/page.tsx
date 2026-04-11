import React from "react";
import { AuthComp } from "../AuthComp";

export default function SignupPage() {
  return (
    <AuthComp
      title="Sign up"
      desc="Create your MoveSky account"
      authType="signup"
      reversedAuthPath="/sign-in"
      showConfirmPassInput
      showNameInput
    />
  );
}
