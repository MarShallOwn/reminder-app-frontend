import Providers from "../components/Providers";
import classes from "./Login.module.css";

type LoginLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Login Page",
  description: "Login Page to login users to the system",
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <main className={classes.mainContainer}>
      <h1>Login</h1>
      <Providers>{children}</Providers>
    </main>
  );
}
