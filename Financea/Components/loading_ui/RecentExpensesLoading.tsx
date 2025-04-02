import React from 'react'
import { Skeleton } from '../ui/skeleton'

const RecentExpensesLoading = () => {
    return (
        <Skeleton className="bg-white p-5 rounded-xl shadow-md mt-6 md:h-[34.3rem] border-gray-200 h-[300px] " />
    )
}

export default RecentExpensesLoading