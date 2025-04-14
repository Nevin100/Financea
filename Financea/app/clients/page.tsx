/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "@/Components/ui/button";
import axios from "axios";

const ClientPage = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(res.data);
      } catch (err) {
        console.error("Error fetching clients", err);
      }
    };

    fetchClients();
  }, []);

  const filteredClients = clients.filter((client) => {
    const query = searchQuery.toLowerCase();
    return (
      client.clientName?.toLowerCase().includes(query) ||
      client.email?.toLowerCase().includes(query) ||
      client.mobile?.toString().includes(query) ||
      client.companyName?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="font-['Archivo'] p-4 sm:p-6 bg-white">
      {/* Top Actions Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/3 border px-4 py-2 rounded-md text-sm"
        />

        {/* Buttons */}
        <div className="flex flex-wrap justify-end gap-2">
          <Button className="border px-5 py-2 rounded-md text-white flex items-center text-sm">
            <FaDownload className="mr-2" /> Export
          </Button>
          <button className="border px-4 py-2 rounded-md flex items-center text-sm">
            Take Actions <IoIosArrowDown className="ml-1" />
          </button>
          <button className="border px-4 py-2 rounded-md text-sm">Last 15 days</button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-white border-b text-gray-600 font-medium">
            <tr>
              <th className="p-3">Charge</th>
              <th className="p-3">Status</th>
              <th className="p-3">Customer Info</th>
              <th className="p-3">Company Name</th>
              <th className="p-3">Issue Date</th>
              <th className="p-3">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="p-3 font-bold text-black">${client.serviceCharge}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
                    Paid
                  </span>
                </td>
                <td className="p-3">
                  <div className="font-medium text-gray-800">{client.clientName}</div>
                  <div className="text-xs text-gray-500">{client.email}</div>
                  <div className="text-xs text-gray-500">{client.mobile}</div>
                </td>
                <td className="p-3 text-gray-700">{client.companyName}</td>
                <td className="p-3">{new Date(client.createdAt).toLocaleString()}</td>
                <td className="p-3">{new Date(client.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredClients.map((client, i) => (
          <div key={i} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-lg">${client.serviceCharge}</div>
              <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">
                Paid
              </span>
            </div>
            <div className="text-sm font-medium">{client.clientName}</div>
            <div className="text-xs text-gray-500">{client.email}</div>
            <div className="text-xs text-gray-500 mb-2">{client.mobile}</div>
            <div className="text-sm mb-1">
              <span className="font-semibold">Issue:</span>{" "}
              {new Date(client.createdAt).toLocaleString()}
            </div>
            <div className="text-sm mb-1">
              <span className="font-semibold">Due:</span>{" "}
              {new Date(client.createdAt).toLocaleDateString()}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Company:</span> {client.companyName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientPage;
