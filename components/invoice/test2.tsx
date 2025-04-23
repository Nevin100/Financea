"use client";

import { IoAddCircle } from "react-icons/io5";
import { GoX } from "react-icons/go";
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Checkbox } from "../ui/checkbox";
import { useFieldArray } from "react-hook-form";
import { Separator } from "../ui/separator";
import { uptoTwoDecimalPlaces } from "@/lib/helpers/create_invoice/uptoTwoDecimalPlaces";
import { TestSchema, TestSchemaFormType } from "./z";



export enum RecurringFrequency {
    Monthly = "Monthly",
    Weekly = "Weekly",
    Quarterly = "Quarterly",
    Yearly = "Yearly",
}
export interface Client {
    _id: string;
    clientName: string;
    companyName: string;
    email: string;
    mobile: string;
    address: string;
    postal: string;
    state: string;
    country: string;
    website: string;
    serviceCharge: number;
    user: string;
    createdAt: string;
    updatedAt: string;
}



const TestFrom = () => {


    const form = useForm<TestSchemaFormType>({
        resolver: zodResolver(TestSchema),
        defaultValues: {
            invoiceNumber: ""
        },
    });



    console.log(form.formState.errors);

    async function onSubmit(values: TestSchemaFormType) {
        // Check if values are undefined or missing
        if (!values) {
            console.error("Items are missing or not an array!");
            return;
        }

        // Continue with form submission logic
        console.log(values);
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
                                    <Input className="w-[240px]" placeholder="Eg. 1234" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                </section>



                <footer>
                    <Button type="submit">
                        submit
                    </Button>
                </footer>
            </form>
        </Form>
    );
};

export default TestFrom;


