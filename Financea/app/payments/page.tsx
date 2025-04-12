'use client'; // Important for client-side logic

import { useState } from 'react';
import axios from 'axios';
import { RzpOrderResponse } from '@/lib/types';
// import Razorpay from 'razorpay';
import { Button } from '@/Components/ui/button';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any; // Make Razorpay available globally
  }
}

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  // Handle payment button click
  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Create an order on your backend API using axios
      const response = await axios.post('/api/rzp', {
        amount: 50000,
        currency: 'INR',
      });

      const order: RzpOrderResponse = response.data;  // Get order details from backend



      if (order.id) {

        // 2. Open Razorpay Checkout modal

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,  // Your Razorpay public key
          amount: order.amount,         // Total amount (in paise)
          currency: order.currency,     // Currency
          order_id: order.id,           // Razorpay order ID
          handler: function (response: any) {  // Explicitly typing `response` as `any`
            alert('Payment Successful!');
            console.log(response);  // You can log or send the response to your backend here
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9876543210',
          },
          theme: {
            color: '#F37254',  // Customize button color
          },
        };

        // Ensure Razorpay is available on the window
        const rzp1 = new (window as any).Razorpay(options);
        rzp1.open();
      } else {
        alert('Failed to create order.');
      }
    } catch (error) {
      console.error('Error during payment creation:', error);
      alert('An error occurred. Please try again.');
    }

    setLoading(false);  // Reset loading state
  };

  return (
    <div>
      <Script type="text/javascript" src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <h1>Pay ₹500</h1>
      <Button className='cursor-pointer' onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>
    </div>
  );
}
