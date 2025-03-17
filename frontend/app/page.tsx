import Sidebar from "@/Components/Sidebar";
import { FaFileInvoice } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-violet-900 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition">
              <FaFileInvoice />
              <span>Create Invoice</span>
            </button>
            <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
              <IoMdWallet/>

              <span>Add Expense</span>
            </button>
          </div>
        </div>
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Financial Analytics</h2>
          <p className="text-gray-500 mt-1">Revenue vs Expense Chart</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
