import { useState, useEffect } from "react";
import RecentExpensesLoading from "../loading_ui/RecentExpensesLoading";

const RecentExpenses = () => {
  const [expenses, setExpenses] = useState<{ category: string; amount: string; date: string; icon: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("/api/expenses"); // Call Next.js API
        if (!response.ok) throw new Error("Failed to fetch expenses");

        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) return <RecentExpensesLoading />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white p-5 rounded-xl shadow-md mt-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-black mb-4">Recent Expenses</h2>

      {/* Table Header */}
      <div className="flex justify-between pb-2 border-b text-gray-500 text-sm font-semibold">
        <span>Category</span>
        <span>Amount</span>
        <span>Date</span>
      </div>

      {/* Expense List */}
      <div>
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <div key={index} className="flex justify-between items-center border-b py-5 last:border-none">
              {/* Category with Icon */}
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-full">
                  {expense.icon}
                </span>
                <span className="text-lg text-gray-700">{expense.category}</span>
              </div>

              {/* Amount */}
              <span className="text-md font-bold">{expense.amount}</span>

              {/* Date */}
              <span className="text-gray-500 text-sm">{expense.date}</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No expenses found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentExpenses;
