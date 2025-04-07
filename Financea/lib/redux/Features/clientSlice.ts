import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ClientState {
  clientName: string
  companyName: string
  email: string
  mobile: string
  address: string
  postal: string
  state: string
  country: string
  serviceCharge: string
  website: string
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
  serviceCharge: "",
  website: "",
}

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientField: (
      state,
      action: PayloadAction<{ field: keyof ClientState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value
    },
    resetClient: () => initialState,
  },
})

export const { setClientField, resetClient } = clientSlice.actions
export default clientSlice.reducer
