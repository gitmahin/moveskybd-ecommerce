import { AuthComp } from "../AuthComp";


export default function LoginPage() {
  return (
    <AuthComp title="Sign in" desc="Welcome back to MoveSky" authType="login" reversedAuthPath="/sign-up"   />
  );
}
