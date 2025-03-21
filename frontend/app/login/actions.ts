"use server";

import { z } from "zod";
import { createSession } from "../lib/session";
import {redirect } from "next/navigation"

const testUser = {
    id: "1",
    email: "faltudimu@gmail.com",
    password: "Faltu@1234",
}


// Password validation regex
const passwordSchema = z
    .string()
    .min(10, 'Password must be at least 10 characters long')
    .refine((val) => /[A-Z]/.test(val), {
        message: 'Password must contain at least one uppercase letter',
    })
    .refine((val) => /[a-z]/.test(val), {
        message: 'Password must contain at least one lowercase letter',
    })
    .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: 'Password must contain at least one special character',
    });



const loginSchema = z.object({

    email: z
        .string()
        .email({ message: "Invalid email" })
        .trim(),

    password: passwordSchema

});


export async function login(prevState: any, formData: FormData) {

    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,

        };
    }

    const { email, password } = result.data;

    if(email !== testUser.email || password !== testUser.password) {
        return {
            errors: {
                email: ["Invalid email or password"],
            }
        }
    }


    await createSession(testUser.id);

    
    redirect("/");


}


export async function logout() { }