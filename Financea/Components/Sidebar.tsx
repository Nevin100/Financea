/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaChartBar,
  FaFileAlt,
  FaCog,
  FaUsers
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/Features/authSlice";
import { Button } from "@/Components/ui/button";
import { LuLogOut } from "react-icons/lu";
import { ImSpinner2 } from "react-icons/im";

interface SidebarProps {
  onLinkClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLinkClick }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login"); // navigate to login page
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaChartBar />, path: "/" },
    { name: "Invoices", icon: <FaFileInvoiceDollar />, path: "/invoices" },
    { name: "Payments", icon: <FaMoneyCheckAlt />, path: "/payments" },
    { name: "Expenses", icon: <FaFileAlt />, path: "/expenses" },
    { name: "Clients", icon: <FaUsers />, path: "/clients" },
    { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
    { name: "Settings", icon: <FaCog />, path: "/settings" }
  ];

  return (
    <div className="h-full w-[250px] bg-white shadow-md p-5 font-['Archivo',sans-serif] flex flex-col justify-between relative">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-8">Instant Paid</h2>
        <nav className="flex flex-col space-y-6">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => {
                // Close sidebar on mobile
                if (onLinkClick && window.innerWidth < 768) {
                  onLinkClick();
                }
              }}
              className={`flex items-center space-x-4 text-gray-700 p-3 rounded-md 
                ${pathname === item.path ? "bg-gray-100" : "hover:bg-gray-50"}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-base font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="absolute bottom-[9rem] left-[3rem] flex items-center gap-2 px-6 py-5 text-lg font-medium text-gray-700"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        <LuLogOut className="w-4 h-4 transition-all duration-300" />
        {isLoggingOut ? (
          <ImSpinner2 className="w-4 h-4 animate-spin text-purple-600" />
        ) : (
          "Logout"
        )}
      </Button>
    </div>
  );
};

export default Sidebar;
