import Sidebar from "@/Components/Sidebar";
import FinancialAnalytics from "@/Components/Dashboard/FinancialAnalytics";
import FinancialMetrics from "@/Components/Dashboard/FinancialMetrics";
import PaymentRequests from "@/Components/Dashboard/PayementRequests";
import RecentExpenses from "@/Components/Dashboard/RecentExpenses";
import { FaFileInvoice } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import FinancialAnalytics2 from "@/Components/Dashboard/FinancialAnalytics2";

import {
  Select, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectContent, SelectLabel
} from "@/Components/ui/select";
import FinancialMetrics2 from "@/Components/Dashboard/FinancialMetrics2";

import { Archivo } from 'next/font/google'

const archivo = Archivo({
  weight: '500',
  subsets: ['latin'],

})


const frquencyValues = {
  Quarterly: 'Quarterly',
  Monthly: 'Monthly',
  Yearly: 'Yearly'
}

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Left */}
      <div className="w-[250px] bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Main Content - Right */}
      <div className="flex-1 bg-gray-100 p-6">

        {/* Header */}
        <div className={`${archivo.className} flex items-center justify-between`}>

          <h1 className={` text-[28px] text-gray-800`}>Financial Analytics</h1>

          {/* Create Invoice & Add Expense Buttons */}
          {/* <div className="flex space-x-4 pt-2">
            <button className="flex items-center space-x-2 bg-violet-900 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition">
              <FaFileInvoice />
              <span>Create Invoice</span>
            </button>
            <button className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
              <IoMdWallet />
              <span>Add Expense</span>
            </button>
          </div> */}


          {/* Options for frequency */}
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Frequency</SelectLabel>
                <SelectItem value={frquencyValues.Monthly}>{frquencyValues.Monthly}</SelectItem>
                <SelectItem value={frquencyValues.Quarterly}>{frquencyValues.Quarterly}</SelectItem>
                <SelectItem value={frquencyValues.Yearly}>{frquencyValues.Yearly}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

        </div>

        {/* Analytics & Metrics */}
        <div className="mt-[22px] grid grid-cols-3 gap-[14px]">
          <div className="col-span-2"><FinancialAnalytics2 /></div>
          <div ><FinancialMetrics2 /></div>
        </div>

        {/* Payment Requests & Recent Expenses */}
        <div className="mt-10 grid grid-cols-2 gap-6">
          <PaymentRequests />
          <RecentExpenses />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
