
"use client";

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

  const [metrics, setMetrics] = useState({
    totalInvoices: 32,
    totalPayment: 1200,
    outstandingInvoices: 2,
    outstandingPayment: 120,
  });

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

  // 🛠 Add these states and handlers in your InvoicePage component
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allInvoiceIds = invoices.map((inv) => inv.invoiceNo);
      setSelectedInvoices(allInvoiceIds);
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleCheckboxChange = (invoiceNo: string) => {
    if (selectedInvoices.includes(invoiceNo)) {
      setSelectedInvoices(selectedInvoices.filter((id) => id !== invoiceNo));
    } else {
      setSelectedInvoices([...selectedInvoices, invoiceNo]);
    }
  };


  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md mt-6 font-['Archivo']">
      {/* Top Metrics */}
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
            <input
              type="checkbox"
              className="w-4 h-4"
              checked={selectAll}
              onChange={handleSelectAll}
            />
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
          <InvoiceTable
            invoices={invoices}
            selectedInvoices={selectedInvoices}
            handleCheckboxChange={handleCheckboxChange}
          />

        </Suspense>
      )}
    </div>
  );
};

export default InvoicePage;
