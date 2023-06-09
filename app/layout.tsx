import { Poppins } from "next/font/google";
import { getLocalePartsFrom, locales } from "@/middleware";

import Navbar from "./components/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});


type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Reminder App",
  description: "Reminder App Description Section",
};

export async function generateStaticParams() {
  return locales.map((locale) => getLocalePartsFrom({ locale }));
}

export default function RootLayout({ children }: RootLayoutProps) {
  
  return (
    <html dir="ltr">
      <body data-theme="light-theme" className={poppins.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
