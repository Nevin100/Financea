import React from 'react'
import { Skeleton } from '../ui/skeleton'

const PaymentRequestsLoading = () => {
    return (
        <Skeleton className="bg-gray-300 p-5 rounded-lg shadow-md border border-gray-400 h-[300px] md:h-[500px]" />

    )
}

export default PaymentRequestsLoading