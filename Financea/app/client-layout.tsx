"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; 
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); 

  // ✅ Conditions to hide sidebar
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isFullWidthPage = pathname === "/invoices/create-invoice"; 

  return (
    <div className="flex h-screen">
      {/* Hide Sidebar for Auth and Full Width Pages */}
      {!isAuthPage && !isFullWidthPage && (
        <>
          {/* Desktop Sidebar */}
          <div className="w-[250px] hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 md:hidden z-40"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-[250px] bg-white border-r border-gray-200 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform md:hidden z-50 shadow-lg`}
          >
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="bg-gray-100 flex-1 flex flex-col">
        {/* Show Navbar for all pages except Auth Pages */}
        {!isAuthPage && <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

        <div
          className={`flex-1 overflow-y-auto p-4 ${
            isFullWidthPage ? "w-full max-w-none" : "md:mt-2"
          }`} // ✅ Full width for create-invoice page
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
