"use client";

import Link from "next/link";
import React, { useState, useEffect, Suspense, lazy } from "react";
import { FaSearch, FaDownload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

// Lazy Load Invoice Component
const InvoiceTable = lazy(() => import("./InvoiceTable"));

// Loader Component
const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="relative w-16 h-16 flex justify-center items-center">
      <div className="absolute w-full h-full border-4 border-gray-300 border-t-[#6F38C9] rounded-full animate-spin"></div>
    </div>
  </div>
);

const InvoicePage = () => {
  type Invoice = {
    name: string;
    email: string;
    invoiceNo: string;
    description: string;
    status: string;
    amount: string;
    date: string;
    dueDate: string;
  };

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedInvoices = localStorage.getItem("invoices");
    if (cachedInvoices) {
      setInvoices(JSON.parse(cachedInvoices));
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const fetchedInvoices = [
        {
          name: "Razib Rahman",
          email: "razib.rahman@gmail.com",
          invoiceNo: "#000001",
          description: "Branded Logo design",
          status: "Paid",
          amount: "$120",
          date: "14.03.2025",
          dueDate: "14.04.2025",
        },
        {
          name: "Razib Rahman",
          email: "razib.rahman@gmail.com",
          invoiceNo: "#000002",
          description: "Graphic Design",
          status: "Paid",
          amount: "$220",
          date: "15.03.2025",
          dueDate: "15.04.2025",
        },
        {
          name: "Razib Rahman",
          email: "razib.rahman@gmail.com",
          invoiceNo: "#000002",
          description: "Graphic Design",
          status: "Paid",
          amount: "$220",
          date: "15.03.2025",
          dueDate: "15.04.2025",
        },
        {
          name: "Razib Rahman",
          email: "razib.rahman@gmail.com",
          invoiceNo: "#000002",
          description: "Graphic Design",
          status: "Paid",
          amount: "$220",
          date: "15.03.2025",
          dueDate: "15.04.2025",
        },
        {
          name: "Razib Rahman",
          email: "razib.rahman@gmail.com",
          invoiceNo: "#000002",
          description: "Graphic Design",
          status: "Paid",
          amount: "$220",
          date: "15.03.2025",
          dueDate: "15.04.2025",
        },
        {
          name: "Razib Rahman",
          email: "razib.rahman@gmail.com",
          invoiceNo: "#000002",
          description: "Graphic Design",
          status: "Paid",
          amount: "$220",
          date: "15.03.2025",
          dueDate: "15.04.2025",
        },
      ];
      setInvoices(fetchedInvoices);
      localStorage.setItem("invoices", JSON.stringify(fetchedInvoices));
      setLoading(false);
    }, 1000); // Faster loading
  }, []);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mt-6 font-['Archivo']">
      {/* Buttons Section */}
      <div className="flex flex-wrap justify-end gap-3 sm:gap-4 mb-4">
        <Link href={"/invoices/create-invoice"}>
          <button className="bg-[#6F38C9] text-white px-4 py-2 rounded-lg text-md font-semibold cursor-pointer">
            + Create Invoice
          </button>
        </Link>
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

      {/* Lazy Loaded Invoice Table with Suspense */}
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<Loading />}>
          <InvoiceTable invoices={invoices} />
        </Suspense>
      )}
    </div>
  );
};

export default InvoicePage;
