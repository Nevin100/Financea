"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { month: "January", revenue: 60000, expense: -15000 },
  { month: "February", revenue: 35000, expense: -12000 },
  { month: "March", revenue: 50000, expense: -14000 },
  { month: "April", revenue: 62000, expense: -16000 },
  { month: "May", revenue: 30000, expense: -10000 },
];

const FinancialAnalytics = () => {
  return (
    <div className="bg-white p-6 m-4 mt-[-0.15rem] rounded-xl shadow-md md:h-[440px] flex flex-col justify-between">
      {/* Title & Dropdown */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-black pb-6">Financial Analytics</h2>
        <select className="border p-2 rounded-md text-gray-700 outline-none focus:outline-none">
          <option>Quarterly</option>
          <option>Monthly</option>
        </select>
      </div>

      {/* Chart Section */}
      <div className="flex-grow flex items-center">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 3 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${Math.abs(value)}`} />
            <Legend />
            <Bar dataKey="revenue" fill="#7C3AED" radius={[20, 10, 0, 0]} name="Revenue" />
            <Bar dataKey="expense" fill="#A78BFA" radius={[20, 10, 0, 0]} name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinancialAnalytics;

