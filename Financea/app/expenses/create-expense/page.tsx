/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenseField,
  resetExpense,
} from "@/lib/redux/Features/expenseSlice";
import Image from "next/image";

const Page = () => {
  const dispatch = useDispatch();
  const expense = useSelector((state: any) => state.expense); 

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const { amount, currency, category, description, date } = expense;

    if (!amount || !category || !description || !currency || !date) {
      Swal.fire("Please fill all required fields!", "", "warning");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire("Created!", "Your expense has been added.", "success");
        dispatch(resetExpense());
      } else {
        Swal.fire("Error", data.message || "Something went wrong!", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Network error!", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-start justify-center px-4 pt-4 pb-8">
      
      {/* 👇 background layer added ONLY for blur effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />

      {/* blur container */}
      <div className="w-full min-h-screen flex items-start justify-center px-4 pt-4 pb-8">
        <div className="relative w-full max-w-xs z-10  sm:max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-2xl p-5 shadow-2xl transition-all h-auto">
          {/* Close Button */}
          <Link href={"/expenses"}>
            <button className="absolute top-3 right-3 text-gray-500 hover:text-black px-2 py-2 hover:bg-blue-100 cursor-pointer rounded-2xl text-xl">
              ✕
            </button>
          </Link>

          <h2 className="text-lg sm:text-xl font-semibold text-center mb-5">New Expense</h2>

          {/* Upload Receipt Box */}
          <label className="block text-md font-medium text-gray-500 mb-1">Receipt</label>
          <div className="w-full h-[100px] sm:h-[140px] bg-gray-100 hover:bg-blue-100 transition rounded-xl flex flex-col items-center justify-center cursor-pointer mb-5">
            <Image src={"/Expense/reciept.png"} alt="Add Reciept +" width={100} height={100} />
          </div>

          {/* Amount and Currency */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-md font-medium text-gray-500 mb-1">Amount</label>
              <input
                type="number"
                value={expense.amount}
                onChange={(e) => dispatch(setExpenseField({ field: "amount", value: parseFloat(e.target.value) || 0 }))}
                placeholder="Enter your amount"
                className="w-full border rounded-md px-3 py-2 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-500 mb-1">Currency</label>
              <select
                value={expense.currency}
                onChange={(e) => dispatch(setExpenseField({ field: "currency", value: e.target.value }))}
                className="w-full sm:w-[80px] border rounded-md px-2 py-2 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>INR</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <label className="block text-md font-medium text-gray-500 mb-1">Date</label>
          <input
            type="date"
            value={expense.date}
            onChange={(e) => dispatch(setExpenseField({ field: "date", value: e.target.value }))}
            className="w-full border rounded-md px-3 py-2 text-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
          />

          {/* Category */}
          <label className="block text-md font-medium text-gray-500 mb-1">Category</label>
          <select
            value={expense.category}
            onChange={(e) => dispatch(setExpenseField({ field: "category", value: e.target.value }))}
            className="w-full border rounded-md px-3 py-2 text-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select your category</option>
            <option>Travel</option>
            <option>Food</option>
            <option>Office</option>
          </select>

          {/* Description */}
          <label className="block text-md font-medium text-gray-500 mb-1">Description</label>
          <input
            type="text"
            value={expense.description}
            onChange={(e) => dispatch(setExpenseField({ field: "description", value: e.target.value }))}
            placeholder="What is it for?"
            className="w-full border rounded-md px-3 py-2 text-md mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-md font-semibold flex items-center justify-center"
          >
            {isSubmitting && (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            )}
            {isSubmitting ? "Creating..." : "Create Expense"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
