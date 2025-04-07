import { NextResponse } from "next/server";

const payments = [
    { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
    { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
    { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
    { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
    { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
    { email: "razib.rahman@gmail.com", status: "Paid", amount: "$120", dueDate: "14.03.2025" },
];

export async function GET() {


    // await delay(5000);

    return NextResponse.json(payments);

}