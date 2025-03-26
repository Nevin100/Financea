import PaymentRequests from "@/Components/Dashboard/PayementRequests";
import RecentExpenses from "@/Components/Dashboard/RecentExpenses";
import FinancialAnalytics2 from "@/Components/Dashboard/FinancialAnalytics2";
import NewCustomer from "@/Components/Dashboard/NewCustomer";
import ExpensesChart from "@/Components/Dashboard/ExpensesChart";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectContent, SelectLabel } from "@/Components/ui/select";
import FinancialMetrics2 from "@/Components/Dashboard/FinancialMetrics2";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  weight: "500",
  subsets: ["latin"],
});

const frquencyValues = {
  Quarterly: "Quarterly",
  Monthly: "Monthly",
  Yearly: "Yearly",
};

const Dashboard = () => {
  return (
    <div>
      {/* ✅ Financial Analytics Header */}
      <div className={`${archivo.className} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <h1 className="text-[24px] sm:text-[28px] text-gray-800">Financial Analytics</h1>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Quarterly" />
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

      {/* ✅ Analytics & Metrics Section */}
      <div className="mt-[22px] grid grid-cols-1 lg:grid-cols-3 gap-[14px]">
        <div className="col-span-1 lg:col-span-2">
          <FinancialAnalytics2 />
        </div>
        <div>
          <FinancialMetrics2 />
        </div>
      </div>

      {/* ✅ Your Overview Section */}
      <div className="mt-[22px]">
        <h2 className="md:text-3xl text-2xl text-gray-800 font-medium">Your Overview</h2>
      </div>

      {/* ✅ Payment Requests & Recent Expenses (2x1 Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col w-full">
          <PaymentRequests />
        </div>
        <div className="flex flex-col w-full">
          <RecentExpenses />
        </div>
      </div>

      {/* ✅ New Customers & Expenses Chart (Side by Side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col w-full">
          <NewCustomer />
        </div>
        <div className="flex flex-col w-full">
          <ExpensesChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
