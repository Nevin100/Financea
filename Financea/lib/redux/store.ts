import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/redux/Features/authSlice";

// Configure Redux store with auth reducer
export const store = configureStore({
  reducer: {
    auth: authReducer, 
  },
});

// Type definitions for Redux store:
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
