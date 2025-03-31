import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User.model";
import { signupSchema } from "@/utils/validations";

//SignUp API : 
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input using Zod
    const parsedData = signupSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.errors }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = new User({
      ...body,
      password: hashedPassword
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server issue" + error }, { status: 500 });
  }
}
