const RecentExpenses = () => {
  const expenses = [
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
  ];

  return (
    <div className="bg-white p-5 rounded-xl shadow-md mt-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Expanse</h2>

      {/* Table Header */}
      <div className="flex justify-between pb-2 border-b text-gray-500 text-sm font-semibold">
        <span>Category</span>
        <span>Amount</span>
        <span>Date</span>
      </div>

      {/* Expense List */}
      <div>
        {expenses.map((expense, index) => (
          <div key={index} className="flex justify-between items-center border-b py-5 last:border-none">
            {/* Category with Icon */}
            <div className="flex items-center space-x-3">
              <span className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full">
                ✈️
              </span>
              <span className="text-lg text-gray-700">{expense.category}</span>
            </div>

            {/* Amount */}
            <span className="text-md font-bold">{expense.amount}</span>

            {/* Date */}
            <span className="text-gray-500 text-sm">{expense.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentExpenses;
