/* eslint-disable @typescript-eslint/no-explicit-any */

export type InvoiceItem = {
    name: string;
    qty: number;
    rate: number;
    total: number;
};

export type BilledTo = {
    name: string;
    address: string;
    email: string;
    phone: string;
};

export type Invoice = {
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    billedTo: BilledTo;
    isRecurring: boolean;
    recurringPeriod: "Daily" | "Weekly" | "Monthly" | "Yearly"; // You can adjust options as needed
    items: InvoiceItem[];
    discount: number; // Percentage
    tax: number; // Percentage
};


export interface RzpPaymentLinkResponse {
    accept_partial: boolean;
    amount: number;
    amount_paid: number;
    cancelled_at: number;
    created_at: number;
    currency: string;
    customer: {
        contact: string;
        email: string;
        name: string;
    };
    description: string;
    expire_by: number;
    expired_at: number;
    first_min_partial_amount: number;
    id: string;
    notes: {
        message: string;
    };
    notify: {
        email: boolean;
        sms: boolean;
        whatsapp: boolean;
    };
    payments: any; // You can replace `any` with a more specific type if needed
    reference_id: string;
    reminder_enable: boolean;
    reminders: any[]; // Replace `any` if you know the reminder structure
    short_url: string;
    status: string;
    updated_at: number;
    upi_link: boolean;
    user_id: string;
    whatsapp_link: boolean;
    // "created" is shown here, but you can extend with other possible statuses
}


// types.ts
export type Item = {
    desc: string;
    qty: number;
    price: number;
};

