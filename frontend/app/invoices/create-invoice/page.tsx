"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Checkbox } from "@/Components/ui/checkbox"; 

const InvoiceCreatorPage = () => {
  const router = useRouter();
  const [invoice, setInvoice] = useState({
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
        <hr/>
        <div className="mt-6 flex flex-col lg:flex-row md:gap-16">
          <div className="w-full lg:w-1/3">
            <label>Invoice Number:</label>
            <Input type="date" value={invoice.issueDate} readOnly className="mt-1" />
          </div>
          <div className="w-full lg:w-1/3">
            <label>Issue On</label>
            <Input type="date" value={invoice.dueDate} readOnly className="mt-1" />
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row md:gap-16">
          <div className="w-full lg:w-1/3">
            <label>Bill to </label>
            <Input type="date" value={invoice.issueDate} readOnly className="mt-1" />
          </div>
          <div className="w-full lg:w-1/3">
            <label>Due Date</label>
            <Input type="date" value={invoice.dueDate} readOnly className="mt-1" />
          </div>
        </div>

        <div className="mt-6 text-lg">
          <h3 className="font-semibold text-[#6F38C9]">Billed To</h3>
          <div className="p-3 border border-gray-300 rounded-lg mt-2">
            <p className="font-medium">{invoice.billedTo.name}</p>
            <p className="text-sm text-gray-600">{invoice.billedTo.address}</p>
            <p className="text-sm text-gray-600">{invoice.billedTo.email}</p>
            <p className="text-sm text-gray-600">{invoice.billedTo.phone}</p>
          </div>
        </div>

        {/* ✅ Recurring Invoice Checkbox */}
        <div className="mt-4 flex items-center gap-2">
          <Checkbox
            checked={invoice.isRecurring}
            onCheckedChange={(checked) => setInvoice({ ...invoice, isRecurring: checked })}
          />
          <label className="text-[#121212] text-md">Make this a recurring invoice</label>
        </div>

        {/* ✅ Recurring Period Dropdown (Only if checkbox is checked) */}
        {invoice.isRecurring && (
          <div className="mt-4">
            <label className="text-[#121212]">Recurring Period</label>
            <select
              value={invoice.recurringPeriod}
              onChange={(e) => setInvoice({ ...invoice, recurringPeriod: e.target.value })}
              className="mt-1 md:w-[114px] border rounded p-2 md:ml-2"
            >
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
        )}

        {invoice.isRecurring && (
          <div className="mt-4 flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/2">
              <label>Issue On</label>
              <Input type="date" value={invoice.issueDate} readOnly className="mt-1" />
            </div>
            <div className="w-full lg:w-1/2">
              <label>Due Date</label>
              <Input type="date" value={invoice.dueDate} readOnly className="mt-1" />
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-semibold text-lg">Invoice Items</h3>
          {invoice.items.map((item, index) => (
            <div key={index} className="flex flex-col lg:flex-row gap-4 mt-2">
              <Input value={item.name} className="w-full lg:w-1/3" placeholder="Item name" readOnly />
              <Input type="number" value={item.qty} className="w-full lg:w-1/6" placeholder="Qty" readOnly />
              <Input type="number" value={item.rate} className="w-full lg:w-1/6" placeholder="Rate" readOnly />
              <Input type="number" value={item.total} className="w-full lg:w-1/6" placeholder="Total" readOnly />
            </div>
          ))}
          <Button onClick={addItem} className="mt-4 bg-[#6F38C9] text-white w-full lg:w-auto">+ Add Item</Button>
        </div>

        {/* Subtotal, Discount, Tax & Total Amount */}
        <div className="mt-8 border-t pt-4 flex flex-col lg:flex-row justify-between items-start">
          <div className="w-full lg:w-1/2">
            <label className="font-semibold">Add Note</label>
            <Textarea placeholder="Add a note..." className="mt-1 w-full" />
            <label className="font-semibold mt-4 block">Terms & Conditions</label>
            <Textarea
              className="mt-1 w-full"
              value="Please pay within 15 days from the date of invoice, overdue interest @ 14% will be charged on delayed payments."
              readOnly
            />
          </div>
          <div className="w-full lg:w-1/3 text-right mt-4 lg:mt-0">
            <p className="text-gray-600 mt-3 ml-2">Sub Total:  <span className="text-black font-semibold">${subtotal.toFixed(2)}</span></p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-600 mt-4">Discount (%)</p>
              <Input type="number" value={invoice.discount} className="w-16 text-center mt-4" readOnly />
              <span className="text-black font-semibold">${discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-600 mt-4">Tax (%)</p>
              <Input type="number" value={invoice.tax} className="w-16 text-center mt-4" readOnly />
              <span className="text-black font-semibold">${taxAmount.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <p className="text-lg font-semibold mt-6">Total Amount <span className="text-black">${totalAmount.toFixed(2)}</span></p>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row gap-2">
          <Button className="w-full lg:w-auto">Save as Draft</Button>
          <Button className="w-full lg:w-auto bg-[#6F38C9] text-white">Send Now</Button>
        </div>
      </div>

      {/* Right: Preview Section */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md mt-6 lg:mt-0 lg:ml-6">
        <h3 className="text-xl font-semibold text-center">Invoice Preview</h3>
        {/* Your preview content */}
      </div>
    </div>
  );
};

export default InvoiceCreatorPage;
