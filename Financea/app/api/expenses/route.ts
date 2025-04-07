import { NextResponse } from "next/server";




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

    return NextResponse.json(expenses);

}