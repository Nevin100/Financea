import { NextRequest } from 'next/server'
import { Invoice_Interface } from '../../models/invoice_model'

export async function GET(
    request: NextRequest,

    { params }: { params: Promise<{ invoice_id: string }> }

) {

    const invoice_id = (await params).invoice_id   //search in the database for 

    

    console.log(process.env.SECRET_KEY);
    



    const dummy_invoice: Invoice_Interface = {
        invoice_id: 'invoice_id',
        client_id: 'client_id',
        amount: 100.00,
        generated_at: '2021-01-01',
        due_date: new Date('2021-01-31'),  // Date object YYYY-MM-DD
        next_payment_date: new Date('2021-02-01'),
        payment_status: 'pending',
        currency: 'USD',
    }




    return new Response(JSON.stringify(dummy_invoice), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })

}