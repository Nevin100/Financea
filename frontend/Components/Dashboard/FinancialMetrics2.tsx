"use client";

import { useState } from "react";
import FinMetricCard from "./FinMetricCard";

const FinancialMetrics2 = () => {
    const [view, setView] = useState("Monthly");

    return (
        <div className="bg-white px-[31px] py-[26px] rounded-[16px] shadow-md w-full h-[440px] flex flex-col">
            <FinMetricCard
                title="Total Revenue"
                amount={1200}
                incDecPercentage={23}
                isIncreased={true}
                text="from last month"
            />

            <Divider />

            <FinMetricCard
                title="Total Expense"
                amount={500}
                incDecPercentage={10}
                isIncreased={false}
                text="from last month"
            />

            <Divider />


            <FinMetricCard
                title="Total Profit"
                amount={500}
                incDecPercentage={27}
                isIncreased={true}
                text="from last month"
            />

            <Divider />


            <FinMetricCard
                title="Total Profit"
                amount={500}
                incDecPercentage={27}
                isIncreased={true}
                text="from last month"
            />
        </div>
    );
};

export default FinancialMetrics2;



export const Divider = () => {
    return (
        <div className="border-t border-gray-300 my-2"></div>
    )
}


