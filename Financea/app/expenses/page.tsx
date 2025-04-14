/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import axios from "axios";

interface ExpenseType {
  amount: string;
  category: string;
  date: string;
  description: string;
  status?: string;
  icon: string;
}


const Expense = () => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const [metrics, setMetrics] = useState({
      totalInvoices: 32,
      totalPayment: 1200,
      outstandingInvoices: 2,
      outstandingPayment: 120,
  });
  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setExpenses(res.data);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const q = query.toLowerCase();
    return (
      expense.amount.toLowerCase().includes(q) ||
      expense.category.toLowerCase().includes(q) ||
      expense.date.toLowerCase().includes(q) ||
      expense.description?.toLowerCase().includes(q) ||
      expense.status?.toLowerCase().includes(q) ||
      expense.icon.toLowerCase().includes(q)
    );
  });

  const toggleCheckbox = (idx: number) => {
    if (selected.includes(idx)) {
      setSelected(selected.filter((i) => i !== idx));
    } else {
      setSelected([...selected, idx]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
    } else {
      const all = filteredExpenses.map((_, i) => i);
      setSelected(all);
      setSelectAll(true);
    }
  };

  useEffect(() => {
    const allSelected = filteredExpenses.length > 0 && selected.length === filteredExpenses.length;
    setSelectAll(allSelected);
  }, [selected, filteredExpenses]);

  return (
    <div className="w-full p-4 space-y-4">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 font-['Archivo']">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-xl text-gray-500">Total Invoices</p>
          <h3 className="text-3xl font-bold">{metrics.totalInvoices}</h3>
          <p className="text-md text-green-600 mt-1">↑ 23% from last month</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-xl text-gray-500">Total Payment</p>
          <h3 className="text-3xl font-bold">${metrics.totalPayment}</h3>
          <p className="text-md text-green-600 mt-1">↑ 23% from last month</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-xl text-gray-500">Outstanding Invoices</p>
          <h3 className="text-3xl font-bold">{metrics.outstandingInvoices}</h3>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-xl text-gray-500">Outstanding Payment</p>
          <h3 className="text-3xl font-bold">${metrics.outstandingPayment}</h3>
        </div>
      </div>

      {/* Search Input & Filters */}
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4">
        <input
          type="text"
          placeholder="Search expenses..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400 bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <Button className="bg-white text-purple-400 text-lg border-3">All Expenses</Button>
          <Button className="bg-white text-purple-400 text-lg border-3">Draft</Button>
          <Button className="bg-white text-purple-400 text-lg border-3">Approved</Button>
        </div>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block mt-4">
        <table className="w-full table-auto text-left border-1 mt-4 bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-100/30 text-gray-600 ml-6">
            <tr>
              <th className="p-2 py-3">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  className="accent-purple-600"
                />
              </th>
              <th className="p-2 py-3">Amount</th>
              <th className="p-2 py-3">Status</th>
              <th className="p-2 py-3">Category</th>
              <th className="p-4 py-3">Date</th>
              <th className="p-2 py-3">Recent</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selected.includes(idx)}
                    onChange={() => toggleCheckbox(idx)}
                    className="accent-purple-600"
                  />
                </td>
                <td className="p-6 font-medium">{item.amount}</td>
                <td className="p-6 text-green-500">{item.status || "Paid"}</td>
                <td className="p-6">{item.category}</td>
                <td className="p-6">{item.date}</td>
                <td className="p-6">{item.icon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-2">
        {filteredExpenses.map((item, idx) => (
          <div key={idx} className="bg-white border p-3 rounded-xl shadow-sm">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-black"
                  checked={selected.includes(idx)}
                  onChange={() => toggleCheckbox(idx)}
                />
                <p className="font-semibold">{item.amount}</p>
              </div>
              <span className="text-sm text-green-500 font-medium">{item.status || "Paid"}</span>
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
