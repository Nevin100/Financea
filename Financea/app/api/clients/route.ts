import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Client } from "@/lib/models/Clients.model";
import { clientSchema } from "@/utils/validations";

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const validation = clientSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: validation.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  try {
    const newClient = new Client(validation.data);
    await newClient.save();
    return NextResponse.json({ message: "Client saved successfully!" }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
