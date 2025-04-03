import { NextResponse } from "next/server";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


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
    console.log("Fetching payment requests (5000 delay)...");

    return NextResponse.json(payments);

}