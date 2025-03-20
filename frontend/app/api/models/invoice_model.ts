// Purpose: Model for the invoice object.

export interface Invoice_Interface {
    invoice_id: string,
    client_id: string,
    amount: number,
    generated_at: string,
    due_date: Date,
    next_payment_date: Date,
    payment_status: string,
    currency: string,
}
