import React from 'react'
import { Skeleton } from '../ui/skeleton'

export const ExpensesChartLoading = () => {
    return (
        <Skeleton className="bg-gray-300 p-5 rounded-lg shadow-md border border-gray-400 flex-1" />
    )
}
