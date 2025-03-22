"use client"


import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type chartData = {
    month: string;
    revenue: number;
    expense: number;
}


const data: chartData[] = [
    {
        month: 'Jan',
        revenue: 4000,
        expense: 2400,
    },
    {
        month: 'Feb',
        revenue: 3000,
        expense: 1398,
    },
    {
        month: 'March',
        revenue: 2000,
        expense: 9800,
    },
    {
        month: 'April',
        revenue: 2780,
        expense: 3908,
    },
    {
        month: 'May',
        revenue: 1890,
        expense: 4800,
    },
    {
        month: 'June',
        revenue: 2390,
        expense: 3800,
    },
    {
        month: 'July',
        revenue: 3490,
        expense: 4300,
    },
];

export default class Example extends PureComponent {

    render() {
        return (

            <div className="bg-white p-6 m-4 mt-[-0.15rem] rounded-xl shadow-md md:h-[440px] flex flex-col justify-between">
                {/* Title & Dropdown */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-black pb-6">Financial Analytics</h2>
                    <select className="border p-2 rounded-md text-gray-700 outline-none focus:outline-none">
                        <option>Quarterly</option>
                        <option>Monthly</option>
                    </select>
                </div>

                {/* Chart Section */}
                <div className="flex-grow flex items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart

                            width={500}
                            height={400}
                            data={data}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>


                            {/* <CartesianGrid strokeDasharray="3 3" /> */}

                            
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="expense" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

            </div>




        );
    }
}
