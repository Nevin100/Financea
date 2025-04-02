const payments = [
  { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
  { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
  { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
  { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
  { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
  { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
];

const statusColors: Record<string, string> = {
  Paid: "bg-green-100 text-green-600",
  Overdue: "bg-red-100 text-red-600",
  Pending: "bg-yellow-100 text-yellow-600",
};

const PaymentRequests = () => {

  return (
    <div className="bg-white p-5 rounded-xl shadow-md mt-6 md:h-[34.3rem]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-black">Payment Requests</h2>
        <select className="border px-3 py-1.5 rounded-lg text-black text-sm">
          <option>All Status</option>
        </select>
      </div>

      {/* Table Header */}
      <div className="flex justify-between pb-2 border-b text-gray-500 text-sm font-semibold">
        <span>Key Detail</span>
        <span className="w-24 ml-[9rem]">Date</span>
        <span>Status</span>
      </div>

      {/* Payment List */}
      <div className="w-full">
        {
          payments.map((payment, index) => (
            <div key={index} className="flex justify-between items-center border-b py-4 last:border-none md:gap-0 gap-3">
              <div>
                <p className="text-sm font-bold">{payment.amount}</p>
                <p className="text-gray-500 text-sm">{payment.email}</p>
              </div>
              <p className="text-gray-600 text-sm text-center w-24">{payment.dueDate}</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[payment.status]}`}>
                {payment.status}
              </span>
            </div>
          ))


        }
      </div>
    </div>
  );
};

export default PaymentRequests;
