"use client"
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Travel", value: 1200, fill: "#F9D923" },
  { name: "Travel", value: 1200, fill: "#F4A261" },
  { name: "Travel", value: 1200, fill: "#E76F51" },
  { name: "Travel", value: 1200, fill: "#E69F59" },
]

const totalExpense = 3500

const ExpensesChart = () => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-2xl">
      <h3 className="text-gray-600 font-semibold text-lg mb-3">Expense</h3>

      <div className="flex items-center">
        {/* Chart Container */}
        <div className="w-1/2 gap-4 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart innerRadius="50%" outerRadius="100%" data={data} startAngle={180} endAngle={0}>
              <Tooltip />
              <RadialBar background dataKey="value" />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Info */}
        <div className="w-1/2 flex flex-col items-start space-x-4 space-y-3 pl-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: item.fill }}></span>
              <p className="text-lg text-gray-700">{item.name}</p>
              <p className="text-lg font-bold text-gray-900">${item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Total Expense Info */}
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-gray-900">${totalExpense}</h2>
        <p className="text-xl text-gray-500">6% low from previous month</p>
      </div>
    </div>
  )
}

export default ExpensesChart

