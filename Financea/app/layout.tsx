"use client";

import { Archivo } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout"; // ✅ Import client component

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout> 
      </body>
    </html>
  );
}
