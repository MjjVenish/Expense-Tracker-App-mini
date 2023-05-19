import { createSlice } from "@reduxjs/toolkit";
const initialState = { expensedetails: [] };

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {
    income: (state, action) => {},
    expense: (state, action) => {},
  },
});
export default expenseSlice.reducer;
export const { income, expense } = expenseSlice.actions;
