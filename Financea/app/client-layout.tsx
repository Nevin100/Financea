"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // ✅ Import usePathname hook
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname(); // ✅ Get current route

  // ✅ Hide sidebar and navbar on login and signup pages
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div className="flex h-screen">
      {!isAuthPage && (
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
      <div className="bg-gray-100 flex-1 flex flex-col md:mt-2">
        {!isAuthPage && <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />}

        <div
          className="flex-1 overflow-y-auto p-4 md:mt-2"
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
