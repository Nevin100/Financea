import { z } from "zod";

//Signup Schema Validation : 
export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 5 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//Login Schema Validation : 
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

//client Schema Validation : 
export const clientSchema = z.object({
  clientName: z.string().min(2, "Client name is required"),
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email"),
  mobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be 10 digits"),
  address: z.string().min(5, "Address is required"),
  postal: z.string().min(4, "Postal code is required"),
  state: z.string().min(2, "State/Province is required"),
  country: z.enum(["USA", "India", "UK"]),
  serviceCharge: z.string().min(1, "Service charge is required"),
  website: z.string().url("Invalid URL"),
});