"use client";

import { useState } from "react";
import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar - Fixed Left */}
      <div className="w-[250px] hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar - Sliding Menu */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-white border-r border-gray-200 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:hidden`}
      >
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="bg-gray-100 flex-1 flex flex-col md:mt-2">
        {/* Navbar - Fixed Top with Hamburger for Mobile */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:mt-2">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
