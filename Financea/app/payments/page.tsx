'use client'; // Important for client-side logic

import { useState } from 'react';
import axios from 'axios';
import { RzpPaymentLinkResponse } from '@/lib/types'; // Assuming the correct type
import { Button } from '@/Components/ui/button';
import { rzp_link_gen_route } from '@/lib/api-endpoints';

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null); // State to hold the payment link

  // Handle payment button click
  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1. Create an order on your backend API using axios
      const response = await axios.post(rzp_link_gen_route, {
        amount: 50000,
        currency: 'INR',
      });

      const order: RzpPaymentLinkResponse = response.data;  // Get order details from backend

      if (order.id) {
        // If the payment link is created, show the short URL
        setPaymentLink(order.short_url); // Set the payment link state

        // Optionally, you can show this payment link somewhere in your UI:
        alert(`Payment link created: ${order.short_url}`);
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
      <h1>Pay ₹500</h1>
      <Button className="cursor-pointer" onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Create Payment Link'}
      </Button>

      {/* Display payment link if available */}
      {paymentLink && (
        <div>
          <h2>Payment Link:</h2>
          <a href={paymentLink} target="_blank" rel="noopener noreferrer">
            Click here to pay
          </a>
        </div>
      )}
    </div>
  );
}
