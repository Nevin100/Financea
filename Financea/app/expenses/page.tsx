import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

const data = [
  {
    amount: "$120",
    category: "Travel",
    date: "14.03.2025, 9:30 am",
    description: "Branded Logo design",
    status: "Paid",
  },
  {
    amount: "$120",
    category: "Food",
    date: "14.03.2025, 8:30 am",
    description: "Branded Logo design",
    status: "Paid",
  },
  {
    amount: "$120",
    category: "Food",
    date: "14.03.2025, 8:30 am",
    description: "Branded Logo design",
    status: "Paid",
  },
  {
    amount: "$120",
    category: "Food",
    date: "14.03.2025, 8:30 am",
    description: "Branded Logo design",
    status: "Paid",
  },
  {
    amount: "$120",
    category: "Food",
    date: "14.03.2025, 8:30 am",
    description: "Branded Logo design",
    status: "Paid",
  },
  {
    amount: "$120",
    category: "Food",
    date: "14.03.2025, 8:30 am",
    description: "Branded Logo design",
    status: "Paid",
  },
  {
    amount: "$120",
    category: "Food",
    date: "14.03.2025, 8:30 am",
    description: "Branded Logo design",
    status: "Paid",
  },
];

const Expense = () => {
  return (
    <div className="w-full p-4 space-y-4">
      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-1">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl text-gray-500 pb-1">Total Expenses</h3>
              <p className="text-4xl font-bold">$1,200</p>
              <p className="text-xl text-green-500 mt-2">↑ 23% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-1">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl text-gray-500 pb-1">Top Category</h3>
              <p className="text-4xl font-bold">Rent</p>
              <p className="text-xl text-green-500 mt-2">↑ 23% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-1">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl text-gray-500 pb-1">Pending Approvals</h3>
              <p className="text-4xl font-bold">2</p>
              <p className="text-xl text-gray-400 mt-2">$125 pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-1">
            <div className="flex flex-col items-start">
              <h3 className="text-2xl text-gray-500 pb-1">This Month</h3>
              <p className="text-4xl font-bold">$1,20</p>
              <p className="text-xl text-gray-400 mt-2">$430 last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Input */}
      <div className="w-full mt-4">
        <input
          type="text"
          placeholder="Search expenses..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>

      {/* Filter Buttons using ShadCN */}
      <div className="flex flex-wrap gap-2 md:mt-2">
        <Button className="bg-white text-blue-400 text-lg border-3 ">All Expenses</Button>
        <Button className="bg-white text-blue-400 text-lg border-3 ">Draft</Button>
        <Button className="bg-white text-blue-400 text-lg border-3 ">Approved</Button>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block mt-4">
        <table className="w-full table-auto text-left border-1 mt-4 bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-100/30 text-gray-600">
            <tr>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Category</th>
              <th className="p-2">Date</th>
              <th className="p-2">Description</th>
              <th className="p-2">Recent</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-4 font-medium">{item.amount}</td>
                <td className="p-4 text-green-500">{item.status}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4">{item.date}</td>
                <td className="p-4">{item.description}</td>
                <td className="p-4">📄</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="bg-white border p-3 rounded-xl shadow-sm">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="accent-black" />
                <p className="font-semibold">{item.amount}</p>
              </div>
              <span className="text-sm text-green-500 font-medium">{item.status}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">{item.category}</div>
            <div className="text-sm text-gray-500">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expense;
