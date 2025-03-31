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
