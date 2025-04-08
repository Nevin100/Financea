import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/redux/Features/authSlice";
import clientReducer from "@/lib/redux/Features/clientSlice";
import expenseReducer from "@/lib/redux/Features/expenseSlice";

// Configure Redux store with auth reducer
export const store = configureStore({
  reducer: {
    auth: authReducer, 
    client: clientReducer,
    expense: expenseReducer,

  },
});

// Type definitions for Redux store:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
