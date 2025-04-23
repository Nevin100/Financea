import { z } from "zod";

export const createInvoiceZodSchema = z.object({
    invoiceNumber: z
        .string({ required_error: "Invoice number is required" })
        .min(1, "Invoice number is required"),

    issueDate: z
        .date({ required_error: "Issue date is required" }),

    dueDate: z
        .date()
        .optional(),

    clientId: z
        .string({ required_error: "Client selection is required" })
        .min(1, "Client selection is required"),
    clientEmail: z
        .string({ required_error: "Client Email is required.", })
        .email("Please enter a valid email address."),
    clientName: z
        .string({ required_error: "Client Name is required" }),

    clientMobile: z
        .coerce
        .number({ required_error: "Mobile Number is required" })
        .refine((val) => val.toString().length === 10, {
            message: "Mobile number must be exactly 10 digits",
        }),

    isRecurring: z.boolean({ required_error: "Please specify if this is a recurring invoice" }),

    recurringFrequency: z
        .enum(["Monthly", "Weekly", "Quarterly", "Yearly"])
        .optional(),

    recurringIssueDate: z
        .date()
        .optional(),

    recurringDueDate: z
        .date()
        .optional(),

    items: z
        .array(
            z.object({
                ishourly: z.boolean({ required_error: "Please specify if Hourly Rate" }),

                name: z
                    .string({ required_error: "Item name is required" })
                    .min(1, "Item name is required"),

                quantity: z
                    .coerce
                    .number({ required_error: "Quantity is required" })
                    .min(1, "Quantity must be at least 1"),

                rate: z
                    .coerce
                    .number({ required_error: "Rate is required" })
                    .min(0, "Rate cannot be negative"),
            })
        )
        .min(1, "At least one invoice item is required"),

    discountPercent: z
        .coerce
        .number({ required_error: "Discount is required" })
        .min(0)
        .max(100),

    taxPercent: z
        .coerce
        .number({ required_error: "Tax is required" })
        .min(0)
        .max(100),

    note: z
        .string()
        .optional(),

    terms: z
        .string()
        .optional(),

    subTotal: z.coerce.number().optional(),
    discountAmount: z.coerce.number().optional(),
    taxAmount: z.coerce.number().optional(),
    totalAmount: z.coerce.number().optional(),
});

export type createInvoiceFormType = z.infer<typeof createInvoiceZodSchema>;
