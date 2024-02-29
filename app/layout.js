"use client";
import { createContext, useContext } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { auth } from "@/lib/firebase/config";
import { AuthContext } from "@/lib/context/AuthContext";
import { AuthProvider, useAuth } from "@/lib/context/AuthContext";
import Header from "@/components/root/header";
import AddListing from "@/components/root/add-listing";
import { useSearchParams } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  // console.log(params)
  // const {user, loading, error} = useContext(AuthContext);

  const searchParams = useSearchParams();
  const showModal = searchParams.get("add");
  console.log(showModal);
  return (
      <html lang="en">
      <AuthProvider>
        <body className={`${inter.className}  w-[100vw] overflow-x-hidden`}>
        <div className="lg:mx-56 mx-4 mt-6">
          <Header />
          {children}
          <Toaster position="top-center" richColors />
        </div>
        </body>
      </AuthProvider>
      </html>
  );
}