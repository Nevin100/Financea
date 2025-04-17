// lib/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/redux/Features/authSlice";
import clientReducer from "@/lib/redux/Features/clientSlice";
import expenseReducer from "@/lib/redux/Features/expenseSlice";
import { invoiceApi } from "@/lib/redux/Features/invoiceSlice";

// Configure Redux store with reducers and middleware
export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    expense: expenseReducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(invoiceApi.middleware), 
});

// Type definitions for Redux store:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
