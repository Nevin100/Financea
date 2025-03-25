"use client"; // App Router ke liye zaroori hai

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // App Router mein useRouter() nahi chalega
import { FiMenu, FiX } from "react-icons/fi";
import { FaFileInvoiceDollar, FaMoneyCheckAlt, FaChartBar, FaFileAlt, FaCog } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Active route check karega

  const menuItems = [
    { name: "Dashboard", icon: <FaChartBar />, path: "/" },
    { name: "Invoices", icon: <FaFileInvoiceDollar />, path: "/invoices" },
    { name: "Payments", icon: <FaMoneyCheckAlt />, path: "/payments" },
    { name: "Expenses", icon: <FaFileAlt />, path: "/expenses" },
    { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <>
      {/* ✅ Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 fixed top-4 left-4 z-50 bg-white shadow-md rounded-md"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* ✅ Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-[250px] bg-white shadow-md p-4 transform transition-transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:block z-40`}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-6">Instant Paid</h2>
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md 
                ${pathname === item.path ? "bg-gray-100" : "hover:bg-gray-50"}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
