"use client"

import { FaBell } from "react-icons/fa"
import { FiMenu } from "react-icons/fi"
import { LuLogOut } from "react-icons/lu"
import { useDispatch } from "react-redux"
import { logout } from "@/lib/redux/Features/authSlice"; 
import { useRouter } from "next/navigation"

//Navbar component :
const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  //Handle Logout :
  const handleLogout = () => {
    dispatch(logout())
    router.push("/login") 
  }

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
        <button onClick={handleLogout}>
          <LuLogOut size={20} className="cursor-pointer" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
