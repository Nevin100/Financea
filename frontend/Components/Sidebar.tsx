"use client"

import { FaFileInvoiceDollar, FaMoneyCheckAlt, FaChartBar, FaFileAlt, FaCog } from "react-icons/fa"
import Link from "next/link"

const PageArray = [
  { name: "Dashboard", icon: <FaChartBar />, path: "/" },
  { name: "Invoices", icon: <FaFileInvoiceDollar />, path: "/invoices" },
  { name: "Payments", icon: <FaMoneyCheckAlt />, path: "/payments" },
  { name: "Expenses", icon: <FaFileAlt />, path: "/expenses" },
  { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
]

const Sidebar = () => {
  return (
    <div className="h-full w-[250px] bg-white border-r border-gray-200">
      <h2 className="text-lg pl-4 pt-4 font-bold text-gray-700">Instant Paid</h2>
      <nav className="mt-4">
        <ul>
          {PageArray.map((item) => (
            <li key={item.name} className="flex items-center space-x-3 px-4 py-3 m-2 hover:bg-gray-100 transition">
              {item.icon}
              <Link href={item.path} className="text-gray-700 font-medium text-lg ml-2">{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
