import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar/Navbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./globals.css";
import Providers from "./components/Providers";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

/*
const NotoSansArabic = Noto_Sans_Arabic({
  weight: ['400', '700'],
  subsets: ["arabic"]
})
*/

type RootLayoutProps = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html dir="ltr">
      <Providers>
        <body data-theme="light-theme" className={poppins.className}>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
