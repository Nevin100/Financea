/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx'; // Import the xlsx library !! 

const ClientPage = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]); 
  const [filteredClients, setFilteredClients] = useState<any[]>([]); 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //Fetching Clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/clients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClients(res);
        setFilteredClients(res); 
      } catch (err) {
        console.error("Error fetching clients", err);
      }
    };

    fetchClients();
  }, []);

  const filterLast15Days = () => {
    const today = new Date();
    const last15Days = new Date(today.setDate(today.getDate() - 15));

    const recentClients = clients.filter(client => {
      const clientDate = new Date(client.createdAt);
      return clientDate >= last15Days;
    });

    setFilteredClients(recentClients);
    setCurrentPage(1); // Reset to first page
  };

  const searchClients = () => {
    const query = searchQuery.toLowerCase();
    return filteredClients.filter((client) => {
      return (
        client.clientName?.toLowerCase().includes(query) ||
        client.email?.toLowerCase().includes(query) ||
        client.mobile?.toString().includes(query) ||
        client.companyName?.toLowerCase().includes(query)
      );
    });
  };

  const paginatedClients = () => {
    const allClients = searchClients();
    const start = (currentPage - 1) * itemsPerPage;
    return allClients.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(searchClients().length / itemsPerPage);

  const toggleSelectAll = () => {
    if (selectedClients.length === paginatedClients().length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(paginatedClients().map((c) => c._id));
    }
  };

  const toggleSelectClient = (id: string) => {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    if (selectedClients.length === 0) {
      Swal.fire({
        title: "No clients selected!",
        text: "Please select at least one client to delete.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete selected expenses?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    });

    if (!confirmResult.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete("/api/clients", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { clientIds: selectedClients },
      });

      console.log(res);
      setClients(clients.filter((client) => !selectedClients.includes(client._id)));
      setFilteredClients(filteredClients.filter((client) => !selectedClients.includes(client._id)));
      setSelectedClients([]);
      Swal.fire({
        title: "Deleted!",
        text: "Selected clients have been deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err: any) {
      console.error("Error deleting clients", err);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while deleting clients.",
      });
    }
  };

  const handleExport = () => {
    const data = searchClients().map(client => ({
      'Client Name': client.clientName,
      'Email': client.email,
      'Mobile': client.mobile,
      'Company Name': client.companyName,
      'Service Charge': client.serviceCharge,
      'Status': 'Paid', 
      'Issue Date': new Date(client.createdAt).toLocaleString(),
      'Due Date': new Date(client.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clients');
    XLSX.writeFile(wb, 'clients_data.xlsx');
  };

  const renderPagination = () => (
    <div className="flex justify-center items-center mt-6 gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 border rounded hover:bg-gray-200 ${currentPage === i + 1 ? "bg-gray-800 text-white" : ""}`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="font-['Archivo'] p-4 sm:p-6 bg-white">
      {/* Search + Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search clients..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset page
          }}
          className="w-full sm:w-1/3 border px-4 py-2 rounded-md text-sm"
        />
        <div className="flex flex-wrap justify-end gap-2">
          <Button onClick={handleExport} className="border px-5 py-2 rounded-md text-white flex items-center text-sm cursor-pointer hover:bg-gray-800">
            <FaDownload className="mr-2" /> Export
          </Button>
          <button onClick={filterLast15Days} className="border px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-gray-800 hover:text-white">
            Last 15 days
          </button>
          <button onClick={handleDelete} className="border px-5 py-2 rounded-md text-red-500 flex items-center text-sm cursor-pointer hover:bg-red-500 hover:text-white">
            Delete Selected
          </button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-white border-b text-gray-600 font-medium">
            <tr>
              <th className="p-3">
                <input type="checkbox" checked={paginatedClients().length > 0 && selectedClients.length === paginatedClients().length} onChange={toggleSelectAll} className="accent-purple-600" />
              </th>
              <th className="p-3">Charge</th>
              <th className="p-3">Status</th>
              <th className="p-3">Customer Info</th>
              <th className="p-3">Company Name</th>
              <th className="p-3">Issue Date</th>
              <th className="p-3">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedClients().map((client) => (
              <tr key={client._id} className="border-t hover:bg-gray-150">
                <td className="p-3">
                  <input type="checkbox" checked={selectedClients.includes(client._id)} onChange={() => toggleSelectClient(client._id)} className="accent-purple-600" />
                </td>
                <td className="p-3 font-bold text-black">${client.serviceCharge}</td>
                <td className="p-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">Paid</span>
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
        {paginatedClients().map((client, i) => (
          <div key={i} className="border rounded-lg p-4 shadow-sm relative">
            <input type="checkbox" checked={selectedClients.includes(client._id)} onChange={() => toggleSelectClient(client._id)} className="absolute bottom-2 right-2 h-4 w-4 accent-purple-600" />
            <div className="flex justify-between items-center mb-2 pr-6">
              <div className="font-bold text-lg">${client.serviceCharge}</div>
              <span className="bg-green-100 text-green-800 px-2 py-1 text-xs rounded-full">Paid</span>
            </div>
            <div className="text-sm font-medium">{client.clientName}</div>
            <div className="text-xs text-gray-500">{client.email}</div>
            <div className="text-xs text-gray-500 mb-2">{client.mobile}</div>
            <div className="text-sm mb-1"><span className="font-semibold">Issue:</span> {new Date(client.createdAt).toLocaleString()}</div>
            <div className="text-sm mb-1"><span className="font-semibold">Due:</span> {new Date(client.createdAt).toLocaleDateString()}</div>
            <div className="text-sm">{client.companyName}</div>
          </div>
        ))}
      </div>

      {renderPagination()} {/* Pagination component call */}
    </div>
  );
};

export default ClientPage;
