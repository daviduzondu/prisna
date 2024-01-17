import { Inter } from "next/font/google";
import Header from "@/components/root/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Prisna",
  description: "Your platform for everything event related.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} lg:mx-56 mx-4 mt-6`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
