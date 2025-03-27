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
