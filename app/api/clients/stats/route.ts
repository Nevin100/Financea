/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/clients/stats/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Client } from "@/lib/models/Clients.model";
import connectDB from "@/lib/database/db_connection";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Find all clients by this user
    const clients = await Client.find({ user: userId });

    // Total count
    const totalClients = clients.length;

    // Group by week (for line chart)
    const clientsPerWeek: Record<string, number> = {};

    //total Charge : 
    const totalPayment = clients.reduce((sum, client) => sum + client.serviceCharge, 0);

    clients.forEach((client) => {
      const createdAt = new Date(client.createdAt);
      const weekStart = new Date(createdAt);
      weekStart.setDate(createdAt.getDate() - createdAt.getDay()); // Start of week (Sunday)
      const key = weekStart.toISOString().split("T")[0]; // YYYY-MM-DD
      clientsPerWeek[key] = (clientsPerWeek[key] || 0) + 1;
    });

    const chartData = Object.entries(clientsPerWeek).map(([date, value]) => ({
      name: date,
      value,
    })).sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    return NextResponse.json({ totalClients, totalPayment ,chartData });

  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error: " + err }, { status: 500 });
  }
}
