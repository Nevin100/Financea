"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LuLogOut } from "react-icons/lu";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/redux/Features/authSlice";

const Settings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = () => {
    setIsLoggingOut(true); // Show spinner

    // Optional UX delay for spinner animation
    setTimeout(() => {
      dispatch(logout());
      router.push("/login");
    }, 1500);
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full  bg-gray-100">

      {/* Logout Button */}
      <Button
        variant="outline"
        className="absolute md:top-[2rem] md:left-[2rem] sm:top-[1rem] sm:left-[1rem] flex items-center gap-4 px-8 py-5 text-lg font-medium text-gray-700 cursor-pointer"
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <ImSpinner2 className="w-4 h-4 animate-spin text-purple-600" />
        ) : (
          <>
            <LuLogOut className="w-4 h-4 transition-all duration-300" />
            Logout
          </>
        )}
      </Button>
    </div>
  )
}

export default Settings