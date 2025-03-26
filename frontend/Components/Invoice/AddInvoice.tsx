"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";

const InvoiceCreator = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: "00001",
    issueDate: "12.04.2025",
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
      <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md h-auto lg:h-[56rem] mb-5">
        <h2 className="text-xl font-semibold">Create Invoice</h2>
        <div className="mt-4">
          <label>Invoice Number</label>
          <Input value={invoice.invoiceNumber} readOnly className="mt-1" />
        </div>
        <div className="mt-4 flex flex-col lg:flex-row gap-4">
          <div>
            <label>Issue On</label>
            <Input type="date" value={invoice.issueDate} readOnly className="mt-1" />
          </div>
          <div>
            <label>Due Date</label>
            <Input type="date" value={invoice.dueDate} readOnly className="mt-1" />
          </div>
        </div>

        <div className="mt-4 mb-4">
          <h3 className="font-semibold">Billed To</h3>
          <p className="mt-1 font-medium">{invoice.billedTo.name}</p>
          <p className="text-sm text-gray-600">{invoice.billedTo.address}</p>
          <p className="text-sm text-gray-600">{invoice.billedTo.email}</p>
          <p className="text-sm text-gray-600">{invoice.billedTo.phone}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Invoice Items</h3>
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
            <p className="text-gray-600">Sub Total <span className="text-black font-semibold">${subtotal.toFixed(2)}</span></p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-600">Discount (%)</p>
              <Input type="number" value={invoice.discount} className="w-16 text-center" readOnly />
              <span className="text-black font-semibold">${discountAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-600">Tax (%)</p>
              <Input type="number" value={invoice.tax} className="w-16 text-center" readOnly />
              <span className="text-black font-semibold">${taxAmount.toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <p className="text-lg font-semibold">Total Amount <span className="text-black">${totalAmount.toFixed(2)}</span></p>
          </div>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row gap-2">
          <Button className="w-full lg:w-auto">Save as Draft</Button>
          <Button className="w-full lg:w-auto bg-[#6F38C9] text-white">Send Now</Button>
        </div>
      </div>

      {/* Right: Invoice Preview */}
      <div className="w-full lg:w-1/3 p-6 hidden lg:block">
        <h2 className="text-lg font-semibold text-center lg:text-left">Preview</h2>
        <div className="bg-white p-4 rounded-lg shadow-md mt-4 h-[300px] lg:h-[500px] flex items-center justify-center">
          Invoice Preview Here
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreator;
