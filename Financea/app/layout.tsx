"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { Archivo } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout"; 
import AuthGuard from "@/Components/AuthGuard";
import { useEffect } from "react";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    document.title = "Instant Paid"
  }, []);
  
  return (
    <Provider store={store}>

    <html lang="en">
      <body className={`${archivo.variable} antialiased`}>
          <ClientLayout>
          <AuthGuard>{children}</AuthGuard>
          </ClientLayout> 
      </body>
    </html>
    </Provider>
  );
}
