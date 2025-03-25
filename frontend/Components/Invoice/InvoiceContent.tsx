"use client";

import { useState } from "react";
import { FaSearch, FaDownload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const invoices = [
  { 
    name: "Razib Rahman", 
    email: "razib.rahman@gmail.com", 
    invoiceNo: "#000001", 
    description: "Branded Logo design", 
    status: "Paid", 
    amount: "$120", 
    date: "14.03.2025", 
    dueDate: "14.04.2025" 
  },
  { 
    name: "Razib Rahman", 
    email: "razib.rahman@gmail.com", 
    invoiceNo: "#000002", 
    description: "Graphic Design", 
    status: "Paid", 
    amount: "$220", 
    date: "15.03.2025", 
    dueDate: "15.04.2025" 
  },
  { 
    name: "Razib Rahman", 
    email: "razib.rahman@gmail.com", 
    invoiceNo: "#000002", 
    description: "Graphic Design", 
    status: "Paid", 
    amount: "$220", 
    date: "15.03.2025", 
    dueDate: "15.04.2025" 
  },{ 
    name: "Razib Rahman", 
    email: "razib.rahman@gmail.com", 
    invoiceNo: "#000002", 
    description: "Graphic Design", 
    status: "Paid", 
    amount: "$220", 
    date: "15.03.2025", 
    dueDate: "15.04.2025" 
  }
];

const InvoiceContent = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mt-6 font-['Archivo']">
      
      {/* Buttons Section */}
      <div className="flex flex-wrap justify-end gap-3 sm:gap-4 mb-4">
        <button className="bg-[#6F38C9] text-white px-4 py-2 rounded-lg text-md font-semibold">
          + Create Invoice
        </button>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-md font-semibold">
          Add Expense
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4">
        <div className="relative w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by name or email"
            className="border p-2 rounded-md w-full text-gray-700 pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="border px-4 py-2 rounded-lg text-black flex items-center">
            Take Actions <IoIosArrowDown className="ml-2" />
          </button>

          <button className="border px-4 py-2 rounded-lg text-black flex items-center">
            <FaDownload className="mr-2" /> Export
          </button>

          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4" />
            <span>Select all</span>
          </label>

          <select
            className="border px-4 py-2 rounded-lg text-black"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Table / Card View */}
      <div className="w-full overflow-x-auto">
        {/* Desktop Table */}
        <table className="w-full border-collapse hidden sm:table">
          <thead>
            <tr className="border-b text-gray-500 font-semibold text-md">
              <th className="text-left py-2 px-4">Key Detail</th>
              <th className="text-left py-2 px-4">Invoice No.</th>
              <th className="text-left py-2 px-4">Item Description</th>
              <th className="text-left py-2 px-4">Status</th>
              <th className="text-left py-2 px-4">Amount</th>
              <th className="text-left py-2 px-4">Date</th>
              <th className="text-left py-2 px-4">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4">
                  <p className="font-semibold">{invoice.name}</p>
                  <p className="text-gray-500 text-sm">{invoice.email}</p>
                </td>
                <td className="py-3 px-4 font-semibold">{invoice.invoiceNo}</td>
                <td className="py-3 px-4">{invoice.description}</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {invoice.status}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold">{invoice.amount}</td>
                <td className="py-3 px-4">{invoice.date}</td>
                <td className="py-3 px-4">{invoice.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile Card Layout */}
        <div className="block sm:hidden">
          {invoices.map((invoice, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md mb-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{invoice.name}</p>
                  <p className="text-gray-500 text-sm">{invoice.email}</p>
                </div>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {invoice.status}
                </span>
              </div>
              <p className="text-gray-700 mt-2">Invoice No: {invoice.invoiceNo}</p>
              <p className="text-gray-700">Item: {invoice.description}</p>
              <p className="text-gray-700">Amount: {invoice.amount}</p>
              <p className="text-gray-500 text-sm">Date: {invoice.date}</p>
              <p className="text-gray-500 text-sm">Due Date: {invoice.dueDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceContent;
