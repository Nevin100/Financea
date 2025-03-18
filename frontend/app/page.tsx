import Sidebar from "@/Components/Sidebar";
import FinancialAnalytics from "@/Components/Dashboard/FinancialAnalytics.tsx"; 
import { FaFileInvoice } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import FinancialMetrics from "@/Components/Dashboard/FinancialMetrics";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-black">Dashboard</h1>
          <div className="flex space-x-4 pt-2">
            <button className="flex items-center space-x-2 bg-violet-900 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition">
              <FaFileInvoice />
              <span>Create Invoice</span>
            </button>
            <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
              <IoMdWallet />
              <span>Add Expense</span>
            </button>
          </div>
        </div>

        {/* Add Financial Analytics Component Here */}
        <div className="mt-10 flex gap-6">
          <div className="w-1/2">
            <FinancialAnalytics />
          </div>
          <div className="w-1/2">
          <FinancialMetrics/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
