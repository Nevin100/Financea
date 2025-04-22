/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GoX } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useCreateInvoiceMutation } from "@/lib/redux/Features/invoiceSlice";
import Swal from "sweetalert2";
import { Archivo } from "next/font/google";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CreateInvoiceForm from "@/components/invoice/create-invoice-form";


interface Client {
  _id: string;
  clientName: string;
  companyName: string;
  email: string;
  mobile: string;
}

const archivo = Archivo({
  weight: "500",
  subsets: ["latin"],
});

const InvoiceCreatorPage = () => {
  const router = useRouter();

  return (
    <div className={`${archivo.className} `}>
      <Card className="w-full lg:w-2/3 bg-white p-6 rounded-none  ">


        <CardHeader className="flex items-center gap-3">
          <GoX size={24} />
          <div className="w-px h-6 bg-[#B5B5B5]" />
          <CardTitle className="text-[17px]">Create Invoice</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent>
          <CreateInvoiceForm />
        </CardContent>


      </Card>
    </div>
  );
};

export default InvoiceCreatorPage;
