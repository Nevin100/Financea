"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFileInvoiceDollar,
  FaMoneyCheckAlt,
  FaChartBar,
  FaFileAlt,
  FaCog,
  FaUsers,
} from "react-icons/fa";
import { GoClockFill } from "react-icons/go";

interface SidebarProps {
  onLinkClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLinkClick }) => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <FaChartBar />, path: "/" },
    { name: "Invoices", icon: <FaFileInvoiceDollar />, path: "/invoices" },
    { name: "Payments", icon: <FaMoneyCheckAlt />, path: "/payments" },
    { name: "Expenses", icon: <FaFileAlt />, path: "/expenses" },
    { name: "Time Tracking", icon: <GoClockFill /> , path:"/time-tracking"}, 
    { name: "Clients", icon: <FaUsers />, path: "/clients" },
    { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
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
    </div>
  );
};

export default Sidebar;
