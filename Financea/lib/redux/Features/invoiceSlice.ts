// redux/invoiceApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const invoiceApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query: (invoiceData) => ({
        url: '/api/invoices',
        method: 'POST',
        body: invoiceData,
      }),
    }),
    getInvoices: builder.query({
      query: () => ({
        url: '/api/invoices',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
} = invoiceApi;
