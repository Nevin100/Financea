"use client";

import { useState } from "react";

const payments = [
  { name: "Razib Rahman", email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
  { name: "Razib Rahman", email: "razib.rahman@gmail.com", status: "Overdue", amount: "$120", dueDate: "14.03.2025" },
  { name: "Razib Rahman", email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
  { name: "Razib Rahman", email: "razib.rahman@gmail.com", status: "Pending", amount: "$120", dueDate: "14.03.2025" },
  { name: "Razib Rahman", email: "razib.rahman@gmail.com", status: "Pending", amount: "$120", dueDate: "14.03.2025" },
  { name: "Razib Rahman", email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
];

const statusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-600",
  Overdue: "bg-red-100 text-red-600",
  Pending: "bg-yellow-100 text-yellow-600",
};

const PaymentRequests = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Filtered Payments List
  const filteredPayments =
    selectedStatus === "All"
      ? payments
      : payments.filter((payment) => payment.status === selectedStatus);

  return (
  

    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-semibold text-black mb-4">Payment Requests</h2>

      {/* Search & Filters */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border p-2 rounded-md w-1/3 text-gray-700"
        />
        <div className="flex space-x-2">
          <button className="bg-gray-200 px-4 py-2 rounded-lg text-black">Take Actions ▼</button>
          <select
            className="border px-4 py-2 rounded-lg text-black"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Payment List */}
      <div className="w-full">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-3 last:border-none"
            >
              <div>
                <p className="text-md font-semibold">{payment.name}</p>
                <p className="text-gray-500 text-sm">{payment.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[payment.status]}`}>
                {payment.status}
              </span>
              <p className="text-md font-semibold">{payment.amount}</p>
              <p className="text-gray-500">{payment.dueDate}</p>
              <button className="text-gray-500 hover:text-black">👁️</button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No payments found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentRequests;
