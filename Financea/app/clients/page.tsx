/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@/Components/ui/button";

const ClientPage = () => {
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const dummy = [
      {
        name: "Razib Rahman",
        contact: "7005217621",
        email: "razibrahman@gmail.com",
        serviceCharge: "$120",
        itemDesc: "Branded Logo design",
        invoiceNo: "#000001",
        issueDate: "14.03.2025, 9:30 am",
        dueDate: "14.04.2025",
        status: "Paid",
      },
    ];
    setClients(Array(6).fill(dummy[0]));
  }, []);

  return (
    <div className="font-['Archivo'] p-4 sm:p-6 bg-white">
      {/* Top Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          <Button className="border px-5 py-2 rounded-md text-white flex items-center text-sm ">
            <FaDownload className="mr-2" /> Export
          </Button>
          <button className="border px-4 py-2 rounded-md flex items-center text-sm">
            Take Actions <IoIosArrowDown className="ml-1" />
          </button>
          <button className="border px-4 py-2 rounded-md text-sm">Last 15 days</button>
        </div>
      </div>

      {/* Filter Tabs */}
      {/* <div className="flex flex-wrap gap-2 mb-4">
        {["All Invoices", "Draft", "Overdue", "Paid", "Open"].map((tab) => (
          <button
            key={tab}
            className="px-3 py-1.5 text-sm border rounded-full text-gray-700 hover:bg-gray-100"
          >
            {tab}
          </button>
        ))}
      </div> */}

      {/* Desktop Table */}
      <div className="hidden md:block border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-white border-b text-gray-600 font-medium">
            <tr>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Customer Info</th>
              <th className="p-3">Item Description</th>
              <th className="p-3">Invoice No.</th>
              <th className="p-3">Issue Date</th>
              <th className="p-3">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3 font-bold text-black">{client.serviceCharge}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
                    {client.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="font-medium text-gray-800">{client.name}</div>
                  <div className="text-xs text-gray-500">{client.email}</div>
                </td>
                <td className="p-3 text-gray-700">{client.itemDesc}</td>
                <td className="p-3 text-gray-600">{client.invoiceNo}</td>
                <td className="p-3">{client.issueDate}</td>
                <td className="p-3">{client.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {clients.map((client, i) => (
          <div key={i} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-lg">{client.serviceCharge}</div>
              <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
                {client.status}
              </span>
            </div>
            <div className="text-sm font-medium">{client.name}</div>
            <div className="text-xs text-gray-500 mb-2">{client.email}</div>
            <div className="text-sm mb-1">
              <span className="font-semibold">Issue:</span> {client.issueDate}
            </div>
            <div className="text-sm mb-1">
              <span className="font-semibold">Due:</span> {client.dueDate}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Item:</span> {client.itemDesc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientPage;
