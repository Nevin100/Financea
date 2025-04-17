import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExpenseState {
  amount: number;
  currency: string;
  category: string;
  description: string;
  date: string;
}

const initialState: ExpenseState = {
  amount: 0,
  currency: "INR",
  category: "",
  description: "",
  date: new Date().toISOString().split("T")[0], // Default today
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpenseField: <K extends keyof ExpenseState>(
      state: ExpenseState,
      action: PayloadAction<{ field: K; value: ExpenseState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetExpense: () => initialState,
  },
});

export const { setExpenseField, resetExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
