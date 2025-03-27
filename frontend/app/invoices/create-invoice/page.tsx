"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox";
import SkeletonLoader from "@/Components/SkeltonLoader";
import { Invoice } from "@/lib/types";



const InvoiceCreatorPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: "00001",
    issueDate: "2025-04-12",
    dueDate: "",
    billedTo: {
      name: "Studio Den",
      address: "305, 3rd Floor Orion Mall, Bengaluru, Karnataka, India - 560085",
      email: "info@studioden.com",
      phone: "+91 6666888999",
    },
    isRecurring: false,
    recurringPeriod: "Monthly",
    items: [
      { name: "Logo design", qty: 20, rate: 30, total: 600 },
      { name: "Brand Identity", qty: 10, rate: 50, total: 500 },
    ],
    discount: 5,
    tax: 30,
  });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { name: "", qty: 1, rate: 0, total: 0 }],
    });
  };

  const subtotal = invoice.items.reduce((acc, item) => acc + item.total, 0);
  const discountAmount = (subtotal * invoice.discount) / 100;
  const taxAmount = (subtotal * invoice.tax) / 100;
  const totalAmount = subtotal - discountAmount + taxAmount;

  return (
    <div className="flex flex-col lg:flex-row h-screen p-6 bg-gray-100">
      {/* Left: Invoice Form */}
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md h-auto lg:h-[74rem] relative md:gap-4">
        {/* Close Button */}
        <button
          onClick={() => router.push("/invoices")}
          className="absolute top-4 left-4 text-gray-600 hover:text-red-500 transition"
        >
          ✖
        </button>

        <h2 className="text-2xl md:text-3xl font-semibold text-center md:mb-8 pb-1">Create Invoice</h2>
        <hr />

        {/* Invoice Number & Dates */}
        <div className="mt-6 flex flex-col lg:flex-row md:gap-16">
          <div className="w-full lg:w-1/3">
            <label>Invoice Number:</label>
            {isLoading ? <SkeletonLoader rows={1} className="mb-4" /> : (
              <Input value={invoice.invoiceNumber} readOnly className="mt-1" />
            )}
          </div>
          <div className="w-full lg:w-1/3">
            <label>Issue On</label>
            {isLoading ? <SkeletonLoader rows={1} className="mb-4" /> : (
              <Input type="date" value={invoice.issueDate} readOnly className="mt-1" />
            )}
          </div>
        </div>

        {/* Billed To Section */}
        <div className="mt-6 text-lg">
          <h3 className="font-semibold text-[#6F38C9]">Billed To</h3>
          {isLoading ? <SkeletonLoader rows={1} className="mt-2" /> : (
            <div className="p-3 border border-gray-300 rounded-lg mt-2">
              <p className="font-medium">{invoice.billedTo.name}</p>
              <p className="text-sm text-gray-600">{invoice.billedTo.address}</p>
              <p className="text-sm text-gray-600">{invoice.billedTo.email}</p>
              <p className="text-sm text-gray-600">{invoice.billedTo.phone}</p>
            </div>
          )}
        </div>

        {/* Recurring Invoice Checkbox */}
        <div className="mt-4 flex items-center gap-2">
          {isLoading ? <SkeletonLoader rows={1} className="w-40" /> : (
            <>
              <Checkbox
                checked={invoice.isRecurring}
                onCheckedChange={(checked) => setInvoice({ ...invoice, isRecurring: Boolean(checked) })}
              />
              <label className="text-[#121212] text-md">Make this a recurring invoice</label>
            </>
          )}
        </div>

        {/* Invoice Items */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg">Invoice Items</h3>
          {isLoading ? <SkeletonLoader rows={3} className="mt-2" /> : (
            invoice.items.map((item, index) => (
              <div key={index} className="flex flex-col lg:flex-row gap-4 mt-2">
                <Input value={item.name} className="w-full lg:w-1/3" readOnly />
                <Input type="number" value={item.qty} className="w-full lg:w-1/6" readOnly />
                <Input type="number" value={item.rate} className="w-full lg:w-1/6" readOnly />
                <Input type="number" value={item.total} className="w-full lg:w-1/6" readOnly />
              </div>
            ))
          )}
          <Button onClick={addItem} className="mt-4 bg-[#6F38C9] text-white w-full lg:w-auto">+ Add Item</Button>
        </div>

        {/* Total Section */}
        <div className="mt-8 border-t pt-4 flex flex-col lg:flex-row justify-between items-start">
          <div className="w-full lg:w-1/2">
            <label className="font-semibold">Add Note</label>
            {isLoading ? <SkeletonLoader rows={2} className="mt-2" /> : (
              <Textarea placeholder="Add a note..." className="mt-1 w-full" />
            )}
          </div>
          <div className="w-full lg:w-1/3 text-right mt-4 lg:mt-0">
            <p className="text-gray-600 mt-3 ml-2">Sub Total: <span className="text-black font-semibold">${subtotal.toFixed(2)}</span></p>
            <p className="text-gray-600 mt-4">Discount: ${discountAmount.toFixed(2)}</p>
            <p className="text-gray-600 mt-4">Tax: ${taxAmount.toFixed(2)}</p>
            <hr className="my-2" />
            <p className="text-lg font-semibold mt-6">Total Amount <span className="text-black">${totalAmount.toFixed(2)}</span></p>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row gap-2">
          <Button className="w-full lg:w-auto">Save as Draft</Button>
          <Button className="w-full lg:w-auto bg-[#6F38C9] text-white">Send Now</Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreatorPage;
