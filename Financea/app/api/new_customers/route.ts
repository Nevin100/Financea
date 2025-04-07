import { NextResponse } from "next/server";


const data = [
    { name: "Jul 1", value: 400 },
    { name: "Jul 8", value: 300 },
    { name: "Jul 15", value: 500 },
    { name: "Jul 22", value: 280 },
    { name: "Jul 29", value: 590 },
    { name: "Aug 5", value: 350 },
    { name: "Aug 12", value: 400 },
    { name: "Aug 19", value: 500 },
    { name: "Aug 26", value: 450 },
    { name: "Aug 29", value: 600 },
];

export async function GET() {


    // await delay(2000);

    return NextResponse.json(data);

}