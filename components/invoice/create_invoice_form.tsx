"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInvoiceZodSchema, createInvoiceFormType } from "@/lib/zod/create_invoice_zod_schema";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { fetchClients } from "@/lib/helpers/create_invoice/fetchClients";
import BilledToClientDetails from "./billed_to_client_details";

export interface Client {
    _id: string;
    clientName: string;
    companyName: string;
    email: string;
    mobile: string;
}



const CreateInvoiceForm = () => {
    const [issueDatePopoverOpen, setIssueDatePopoverOpen] = useState(false);
    const [dueDatePopoverOpen, setDueDatePopoverOpen] = useState(false);
    const [clients, setClients] = useState<Client[]>([]);

    const form = useForm<createInvoiceFormType>({
        resolver: zodResolver(createInvoiceZodSchema),
        defaultValues: {
            invoiceNumber: "",
            issueDate: undefined,
            dueDate: undefined,
            clientId: "",
            isRecurring: false,
            recurringFrequency: "Monthly",
            recurringIssueDate: undefined,
            recurringDueDate: undefined,
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

    //For fetching clients
    useEffect(() => {

        fetchClients(setClients);

    }, []);

    useEffect(() => {
        console.log(clients);
    }, [clients]);
    // console.log(form.formState.errors);

    async function onSubmit(values: createInvoiceFormType) {
        // handle submit

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="lg:pr-[100px]">

                {/* Inovice Number & Issue date section */}
                <section className="flex justify-between">
                    <FormField
                        control={form.control}
                        name="invoiceNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Invoice Number</FormLabel>
                                <FormControl>
                                    <Input className="w-[148px]" placeholder="Eg. 1234" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="issueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Issue On</FormLabel>
                                <Popover open={issueDatePopoverOpen} onOpenChange={setIssueDatePopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date);
                                                setIssueDatePopoverOpen(false); // Close popover on selection
                                            }}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>

                {/* Bill to & Due date section */}
                <section className="mt-[33px] flex justify-between">
                    <FormField
                        control={form.control}
                        name="clientId"
                        render={({ field }) => (
                            <FormItem >
                                <FormLabel>Bill To</FormLabel>
                                <Select

                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-[187px] cursor-pointer  ">
                                            <SelectValue placeholder="Select a client" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {clients.map((client) => (
                                            <SelectItem key={client._id} value={client._id}>
                                                {client.clientName} ({client.companyName})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Due On</FormLabel>
                                <Popover open={dueDatePopoverOpen} onOpenChange={setDueDatePopoverOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date);
                                                setDueDatePopoverOpen(false); // Close popover on selection
                                            }}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </section>



                {/* Billed to client details */}
                <section className="mt-[33px]">
                    <BilledToClientDetails />
                </section>


                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
};

export default CreateInvoiceForm;


