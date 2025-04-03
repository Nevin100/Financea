import { NextResponse } from "next/server";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const expenses = [
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
    { category: "Travel", amount: "$120", date: "14.03.2025" },
];


export async function GET() {


    // await delay(5000);
    console.log("Fetching expenses (5000 delay)...");

    return NextResponse.json(expenses);

}