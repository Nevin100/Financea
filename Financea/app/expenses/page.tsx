/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdEmail, MdPhone } from "react-icons/md";
import Link from "next/link";

const ExpensePage = () => {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const data = [
      {
        amount: "$120",
        status: "Paid",
        name: "Razib Rahman",
        email: "razib.rahman@gmail.com",
        description: "Branded Logo design",
        invoiceNo: "#000001",
        date: "14.03.2025, 9:30 am",
        due: "14.04.2025",
      },
    ];
    setInvoices(data.concat(Array(6).fill(data[0])));
    setLoading(false);
  }, []);

  return (
    <div className="font-['Archivo'] p-4 sm:p-6">
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
            SS
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold text-black">Subhankar Sarkar</h1>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <MdEmail className="text-base" />
              sarkarsubhankar@gmail.com
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-2">
              <MdPhone className="text-base" />
              7005217621
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <StatCard label="Total Invoices" value="32" growth="23%" />
        <StatCard label="Total Payment" value="$1,200" growth="23%" />
        <StatCard label="Outstanding Invoices" value="2" />
        <StatCard label="Outstanding Payment" value="$120" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 sm:gap-6 border-b mb-4 text-sm font-semibold text-gray-600">
        <div className="border-b-2 border-black pb-2 cursor-pointer">Invoices</div>
        <div className="cursor-pointer">Payments</div>
        <div className="cursor-pointer">Details</div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        {["All Invoices", "Draft", "Overdue", "Paid", "Open"].map((btn) => (
          <button
            key={btn}
            className={`px-4 py-1 rounded-lg border ${
              btn === "All Invoices" ? "bg-black text-white" : "text-black"
            }`}
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          <button className="border px-4 py-2 rounded-lg text-black flex items-center text-md">
            <FaDownload className="mr-2" /> Export
          </button>
          <button className="border px-4 py-2 rounded-lg text-black flex items-center text-md">
            Take Actions <IoIosArrowDown className="ml-2" />
          </button>
          <Link href="/expenses/create-expense">
            <button className="border px-4 py-2 rounded-lg bg-black text-white flex items-center text-md cursor-pointer">
              Create Expense +
            </button>
          </Link>
        </div>
        <select className="border px-4 py-2 rounded-lg text-sm w-full sm:w-auto">
          <option>Last 15 days</option>
        </select>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-white text-gray-600">
            <tr>
              <th className="p-3 font-medium whitespace-nowrap">Amount</th>
              <th className="p-3 font-medium whitespace-nowrap">Status</th>
              <th className="p-3 font-medium whitespace-nowrap">Customer Information</th>
              <th className="p-3 font-medium whitespace-nowrap">Item Description</th>
              <th className="p-3 font-medium whitespace-nowrap">Invoice No.</th>
              <th className="p-3 font-medium whitespace-nowrap">Issue Date</th>
              <th className="p-3 font-medium whitespace-nowrap">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              invoices.map((inv, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3 whitespace-nowrap">{inv.amount}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <div className="font-medium">{inv.name}</div>
                    <div className="text-gray-500 text-xs">{inv.email}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap">{inv.description}</td>
                  <td className="p-3 whitespace-nowrap">{inv.invoiceNo}</td>
                  <td className="p-3 whitespace-nowrap">{inv.date}</td>
                  <td className="p-3 whitespace-nowrap">{inv.due}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  growth,
}: {
  label: string;
  value: string;
  growth?: string;
}) => (
  <div className="bg-white rounded-2xl shadow border border-[#EEF0F4] p-5 flex flex-col justify-between min-h-[100px]">
    <div className="text-sm text-gray-500 font-medium">{label}</div>
    <div className="text-2xl font-bold text-black">{value}</div>
    {growth && (
      <div className="text-green-500 text-xs mt-1 flex items-center">
        <span className="text-lg">↑</span>&nbsp;{growth} from last month
      </div>
    )}
  </div>
);

export default ExpensePage;
