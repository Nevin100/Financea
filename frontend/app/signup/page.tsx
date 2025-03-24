"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setEmailError("Invalid Email");
      return;
    }
    console.log("Login with:", { email, password });
  };

  return (
    <div className="flex justify-center shadow-white items-center md:mt-[3rem]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"> 
        <button className="absolute top-5 right-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L4 12" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 4L12 12" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        
        <div className="flex justify-center mb-6 py-2">
          <Image src="/FinanceaLogo.png" alt="Financea Logo" width={170} height={60} />
        </div>
          
        

        <h2 className="text-2xl font-semibold mb-1">Sign up</h2>
        <p className="text-lg text-gray-600 mb-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[#5C2FA8] font-medium text-lg">
            Log in
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="full-name" className="block text-xl mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5C2FA8]"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block text-xl mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full p-2.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-[#5C2FA8] ${
                emailError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="example@gmail.com"
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-xl mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#5C2FA8] pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4 mt-4">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>

          <button
            type="submit"
            className="w-full bg-[#5C2FA8] text-xl font-semibold text-white py-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
