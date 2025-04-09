import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Expense from "@/lib/models/Expenses.model";
import { expenseSchema } from "@/utils/validations";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const body = await req.json();
    const parsed = expenseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }

    const newExpense = new Expense({
      ...parsed.data,
      user: decoded.userId,
    });

    const savedExpense = await newExpense.save();
    return NextResponse.json({ message: "Expense created", expense: savedExpense });
  } catch (error) {
    return NextResponse.json({ error: "Server Error: " + error }, { status: 500 });
  }
}

// 👇 GET handler 
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const expenses = await Expense.find({ user: decoded.userId }).sort({ createdAt: -1 });

    const formatted = expenses.map((exp) => ({
      category: exp.category,
      amount: `${exp.currency} ${exp.amount}`,
      date: new Date(exp.date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      icon: "💸", // Default icon
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: "Server Error: " + error }, { status: 500 });
  }
}
