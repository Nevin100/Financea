import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoiceZodSchema, createInvoiceFormType } from "@/lib/zod/create_invoice_zod_schema";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const CreateInvoiceForm = () => {
    const form = useForm<createInvoiceFormType>({
        resolver: zodResolver(createInvoiceZodSchema),
        defaultValues: {
            invoiceNumber: "",
            issueDate: "",
            dueDate: "",
            clientId: "",
            isRecurring: false,
            recurringFrequency: "Monthly",
            recurringIssueDate: "",
            recurringDueDate: "",
            items: [
                {
                    name: "",
                    quantity: 1,
                    rate: 0,
                },
            ],
            discountPercent: 0,
            taxPercent: 0,
            note: "",
            terms: "",
            subTotal: 0,
            discountAmount: 0,
            taxAmount: 0,
            totalAmount: 0,
        },
    });



    console.log(form.formState.errors);




    async function onSubmit(values: createInvoiceFormType) {

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>


                <FormField
                    control={form.control}
                    name="invoiceNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Invoice Number</FormLabel>
                            <FormControl>
                                <Input className="w-[148px]" placeholder="1234" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateInvoiceForm;
