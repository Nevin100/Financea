"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { Archivo } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout"; // ✅ Import client component
import AuthGuard from "@/Components/AuthGuard";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
