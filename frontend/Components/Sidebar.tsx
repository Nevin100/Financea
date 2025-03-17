"use client"

import { useState } from "react";
import { FaFileInvoiceDollar, FaMoneyCheckAlt, FaChartBar, FaFileAlt, FaCog } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import  Link  from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const PageArray = [
    { name: "Dashboard", icon: <FaChartBar />, path: "/" },
    { name: "Invoices", icon: <FaFileInvoiceDollar />, path: "/invoices" },
    { name: "Payments", icon: <FaMoneyCheckAlt />, path: "/payments" },
    { name: "Expenses", icon: <FaFileAlt />, path: "/expenses" },
    { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ]

  return (
    <div className={`h-screen ${isOpen ? "w-64" : "w-16"} bg-white border-r border-gray-200 transition-all duration-300`}>
      <div className="flex items-center justify-between p-4">
        {isOpen && <h2 className="text-lg pl-2 pt-2 font-bold text-gray-700">Instant Paid</h2>}
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          <FiMenu size={24} />
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          {PageArray.map((item) => (
            <li key={item.name} className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition">
              {item.icon}
              {isOpen && <Link href={item.path} className="text-gray-700 font-medium">{item.name}</Link>}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
