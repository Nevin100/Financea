import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientState {
  clientName: string;
  companyName: string;
  email: string;
  mobile: string;
  address: string;
  postal: string;
  state: string;
  country: string;
  serviceCharge: number;  
  website: string;
}

const initialState: ClientState = {
  clientName: "",
  companyName: "",
  email: "",
  mobile: "",
  address: "",
  postal: "",
  state: "",
  country: "USA",
  serviceCharge: 0, 
  website: "",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientField: <K extends keyof ClientState>(
      state: ClientState,
      action: PayloadAction<{ field: K; value: ClientState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetClient: () => initialState,
  },
});

export const { setClientField, resetClient } = clientSlice.actions;
export default clientSlice.reducer;
