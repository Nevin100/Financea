"use client"

import { FaBell } from "react-icons/fa"
import { IoAddCircle } from "react-icons/io5"
import { FiMenu } from "react-icons/fi"
import Link from "next/link"

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-2 shadow-md">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="md:hidden text-gray-700">
          <FiMenu size={24} />
        </button>
        <div>
          <p className="text-sm font-semibold text-gray-500">Good Morning,</p>
          <h2 className="text-lg font-bold text-gray-800">Riya Paul</h2>
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <FaBell className="text-gray-600 text-lg cursor-pointer" />
          <span className="absolute top-[-2px] right-[-3px] w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </div>
        <Link href={"/invoices/create-invoice"}>
          <IoAddCircle className="text-[#6F38C9] cursor-pointer" size={36} />
        </Link>
      </div>
    </div>
  )
}

export default Navbar

{/* <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-700 font-semibold">R</span>
          </div>
          <div className="text-gray-800">
            <h3 className="text-sm font-medium">Riya Paul</h3>
            <p className="text-xs text-gray-500">riya.paul@gmail.com</p>
          </div>
        </div> */}
