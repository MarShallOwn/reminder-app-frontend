import { getLocalePartsFrom, locales } from "@/middleware";
import Navbar from "./components/Navbar/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export async function generateStaticParams() {
    return locales.map((locale) => getLocalePartsFrom({ locale }));
  }

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <html dir="ltr">
      <body data-theme="dark-theme">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
