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


export interface RzpOrderResponse {
    amount: number;
    amount_due: number;
    amount_paid: number;
    attempts: number;
    created_at: number;
    currency: "INR";  // You can extend this if you plan to support other currencies
    entity: "order";
    id: string;
    notes: {
        message: string;
    };
    offer_id: string | null;
    receipt: string;
    status: "created" | string;  // "created" is shown here, but you can extend with other possible statuses
}

