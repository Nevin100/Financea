const RecentExpenses = () => {
  const expenses = [
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Food", amount: "$120", date: "14.03.2025" },
    { category: "Fuel", amount: "$120", date: "14.03.2025" },
    { category: "Shopping", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Expenses</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Category"
        className="w-full p-3 mb-4 border rounded-md text-lg"
      />

      {/* Table Header */}
      <div className="flex justify-between py-3 border-b text-gray-500 font-semibold text-lg">
        <span>Category</span>
        <span>Amount</span>
        <span>Date</span>
      </div>

      {/* Table Rows */}
      <div>
        {expenses.map((expense, index) => (
          <div
            key={index}
            className="flex justify-between py-3 border-b text-lg space-y-1"
          >
            <span>{expense.category}</span>
            <span className="font-semibold">{expense.amount}</span>
            <span>{expense.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentExpenses;
