// "use client";

// import { useState, useEffect, Suspense } from "react";
import React, { Suspense } from "react";
import PaymentRequests from "@/Components/Dashboard/PayementRequests";
import RecentExpenses from "@/Components/Dashboard/RecentExpenses";
import FinancialAnalytics from "@/Components/Dashboard/FinancialAnalytics";
import NewCustomer from "@/Components/Dashboard/NewCustomer";
import ExpensesChart from "@/Components/Dashboard/ExpensesChart";
import FinancialMetrics from "@/Components/Dashboard/FinancialMetrics";

import { Select, SelectTrigger, SelectValue, SelectItem, SelectGroup, SelectContent, SelectLabel } from "@/Components/ui/select";
import { Archivo } from "next/font/google";
import { ExpensesChartLoading } from "@/Components/loading_ui/ExpensesChartLoading";
import FinancialAnalyticsLoading from "@/Components/loading_ui/FinancialAnalyticsLoading";
import FinancialMetricsLoading from "@/Components/loading_ui/FinancialMetricsLoading";
import PaymentRequestsLoading from "@/Components/loading_ui/PaymentRequestsLoading";
import RecentExpensesLoading from "@/Components/loading_ui/RecentExpensesLoading";
import NewCustomerLoading from "@/Components/loading_ui/NewCustomerLoading";

const archivo = Archivo({
  weight: "500",
  subsets: ["latin"],
});

const frquencyValues = {
  Quarterly: "Quarterly",
  Monthly: "Monthly",
  Yearly: "Yearly",
};

const Dashboard = async () => {


  return (
    <div>
      {/* ✅ Financial Analytics Header */}
      <div className={`${archivo.className} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <h1 className="md:text-3xl text-2xl text-gray-800 md:py-1">Financial Analytics</h1>
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
          <Suspense fallback={<FinancialAnalyticsLoading />}>
            <FinancialAnalytics />
          </Suspense>

        </div>
        <div>
          <Suspense fallback={<FinancialMetricsLoading />}>
            <FinancialMetrics />
          </Suspense>
        </div>
      </div>

      {/* ✅ Your Overview Section */}
      <div className="mt-[22px]">
        <h2 className="md:text-3xl text-2xl text-gray-800 font-medium md:py-1">Your Overview</h2>
      </div>

      {/* ✅ Payment Requests, Recent Expenses, New Customers & Expenses Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        <div className="flex flex-col w-full lg:col-span-1">
          <Suspense fallback={<PaymentRequestsLoading />}>
            <PaymentRequests />
          </Suspense>

        </div>
        <div className="flex flex-col w-full lg:col-span-1">
          <Suspense fallback={<RecentExpensesLoading />}>
            <RecentExpenses />
          </Suspense>
        </div>
        {/* Flex-col setup for the Dashboard */}
        <div className="flex flex-col w-full gap-4 md:mt-6">
          <div className="flex flex-col w-full lg:col-span-1">
            <Suspense fallback={<NewCustomerLoading />}>
              <NewCustomer />
            </Suspense>
          </div>
          <div className="flex flex-col w-full lg:col-span-1">
            <Suspense fallback={<ExpensesChartLoading />}>
              <ExpensesChart />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
