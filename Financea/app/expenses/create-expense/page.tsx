'use client'

import { useState } from "react"
import  Link  from "next/link";

const Page = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString("en-GB"))

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-start justify-center px-4 pt-4 pb-8">
      <div className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white rounded-2xl p-6 md:p-8 shadow-xl transition-all">
        {/* Close Button */}
        <Link href={"/expenses"}>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl">
            ✕
          </button>
        </Link>

        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">New Expense</h2>

        {/* Upload Receipt Box */}
        <div className="w-full h-[120px] md:h-[280px] bg-gray-100 hover:bg-gray-200 transition rounded-xl flex flex-col items-center justify-center cursor-pointer mb-6">
          <svg className="w-6 h-6 md:w-7 md:h-7 text-gray-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-sm md:text-base text-gray-500">Add Receipt</p>
        </div>

        {/* Amount and Currency */}
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <input
            type="number"
            placeholder="Enter your amount"
            className="flex-1 border rounded-md px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="md:w-[100px] border rounded-md px-3 py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>INR</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>

        {/* Date */}
      <div className="w-full border rounded-md px-4 py-3 text-sm md:text-base mb-5 flex justify-between items-center">
  <input
    type="date"
    value={new Date(selectedDate).toISOString().split("T")[0]}
    onChange={(e) => setSelectedDate(new Date(e.target.value).toLocaleDateString("en-GB"))}
    className="w-full focus:outline-none bg-transparent text-gray-700"
  />
  <svg
    className="w-5 h-5 text-gray-500 ml-2 shrink-0"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 002-2v-7H3v7a2 2 0 002 2z" />
  </svg>
</div>


        {/* Category */}
        <select className="w-full border rounded-md px-4 py-3 text-sm md:text-base mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Select your category</option>
          <option>Travel</option>
          <option>Food</option>
          <option>Office</option>
        </select>

        {/* Description */}
        <input
          type="text"
          placeholder="What is it for?"
          className="w-full border rounded-md px-4 py-3 text-sm md:text-base mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm md:text-base font-semibold">
          Create Expense
        </button>
      </div>
    </div>
  )
}

export default Page
