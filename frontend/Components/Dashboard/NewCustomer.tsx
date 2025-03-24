"use client";

import { LineChart, Line, ResponsiveContainer, XAxis } from "recharts"

const data = [
  { name: "Jul 1", value: 400 },
  { name: "Jul 8", value: 300 },
  { name: "Jul 15", value: 500 },
  { name: "Jul 22", value: 280 },
  { name: "Jul 29", value: 590 },
  { name: "Aug 5", value: 350 },
  { name: "Aug 12", value: 400 },
  { name: "Aug 19", value: 500 },
  { name: "Aug 26", value: 450 },
  { name: "Aug 29", value: 600 },
]

const NewCustomer = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 h-full">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-md font-medium">New Customer</h3>
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-600 border-green-100">
          Open
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold">1,543</div>
        <div className="h-[80px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" hide />
              <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
          <span>Jul 31</span>
          <span>Aug 29</span>
        </div>
      </div>
    </div>
  )
}

export default NewCustomer;

