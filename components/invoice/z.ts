import { z } from "zod";

export const TestSchema = z.object({
    invoiceNumber: z
        .string({ required_error: "Invoice number is required" })
        .min(1, "Invoice number is required"),

});

export type TestSchemaFormType = z.infer<typeof TestSchema>;
