/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import connectDB from "@/lib/database/db_connection";
import { Client } from "@/lib/models/Clients.model";
import { clientSchema } from "@/lib/helpers/validations";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const body = await req.json();

    const validation = clientSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const newClient = new Client({
      ...validation.data,
      user: userId,
    });

    await newClient.save();

    return NextResponse.json(
      { message: "Client saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in saving client:", error);
    return NextResponse.json(
      { error: "Server error or invalid token" },
      { status: 500 }
    );
  }
}

// GET method to fetch all clients for a user
export async function GET(req: Request) {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Fetch all clients belonging to the logged-in user
    const clients = await Client.find({ user: userId }).sort({ createdAt: -1 });

    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error("Error in fetching clients:", error);
    return NextResponse.json(
      { error: "Server error or invalid token" },
      { status: 500 }
    );
  }
}

//Delete Handler : 
export async function DELETE(req: Request) {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  await connectDB();

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const { clientIds } = await req.json();

    if (!Array.isArray(clientIds) || clientIds.length === 0) {
      return NextResponse.json(
        { error: "No client IDs provided" },
        { status: 400 }
      );
    }

    const deleteResult = await Client.deleteMany({
      _id: { $in: clientIds },
      user: userId,
    });

    return NextResponse.json(
      {
        message: `${deleteResult.deletedCount} client(s) deleted successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting clients:", error);
    return NextResponse.json(
      { error: "Server error or invalid token" },
      { status: 500 }
    );
  }
}