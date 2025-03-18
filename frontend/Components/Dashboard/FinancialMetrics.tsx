"use client";

import { useState } from "react";

const FinancialMetrics = () => {
  const [view, setView] = useState("Monthly");

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full h-[440px] flex flex-col">
      {/* View Toggle */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-black text-2xl font-normal">View in</p>
        <div className="flex space-x-2 bg-white p-2 rounded-lg">
          {["Monthly", "Quarterly", "Yearly"].map((option) => (
            <button
              key={option}
              className={`px-4 py-2 text-md font-medium rounded-md ${
                view === option ? "bg-violet-900 text-white" : "text-gray-700"
              }`}
              onClick={() => setView(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="flex flex-col flex-grow justify-center space-y-8 pr-3">
        {/* Total Revenue */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">$1,200</h2>
          <div className="text-right">
            <p className="text-gray-500 text-md">Total Revenue</p>
            <p className="text-green-600 text-md">↑ 23% from last month</p>
          </div>
        </div>

        {/* Total Expense */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">$500</h2>
          <div className="text-right">
            <p className="text-gray-500 text-md">Total Expense</p>
            <p className="text-red-600 text-md">↓ 10% from last month</p>
          </div>
        </div>

        {/* Total Profit */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">$500</h2>
          <div className="text-right">
            <p className="text-gray-500 text-md">Total Profit</p>
            <p className="text-green-600 text-md">↑ 23% from last month</p>
          </div>
        </div>

        {/* Outstanding Invoices */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">$500</h2>
          <div className="text-right">
            <p className="text-gray-500 text-md">Outstanding Invoices</p>
            <p className="text-gray-500 text-md">Across 3 invoices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialMetrics;
