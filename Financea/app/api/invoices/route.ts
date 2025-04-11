/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Invoice from "@/lib/models/Invoice.model";
// import { invoiceSchema } from "@/utils/validations";
import jwt from "jsonwebtoken";
import { invoiceSchema } from "@/utils/validations";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  try {
    await connectDB();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let userId: string;
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      userId = decoded.userId;
    } catch (err: any) {
      return NextResponse.json({ message: err }, { status: 403 });
    }


    const body = await req.json();


    const validatedBody = invoiceSchema.parse(body.data);

    const newInvoice = await Invoice.create({
      user: userId,
      client: validatedBody.clientId,
      invoiceNumber: validatedBody.invoiceNumber,
      issueDate: validatedBody.issueDate,
      dueDate: validatedBody.dueDate,
      items: validatedBody.items,
      discount: validatedBody.discount,
      tax: validatedBody.tax,
      isRecurring: validatedBody.isRecurring,
      recurringPeriod: validatedBody.recurringPeriod,
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error: any) {
    console.error("Invoice Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
