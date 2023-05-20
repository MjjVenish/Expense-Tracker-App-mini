import { createSlice } from "@reduxjs/toolkit";
const data = JSON.parse(localStorage.getItem("trancDetails"));
const initialState = { expensedetails: data };

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {
    income: (state, action) => {
      state.expensedetails.unshift(action.payload);
      localStorage.setItem(
        "trancDetails",
        JSON.stringify(state.expensedetails)
      );
    },
    deleteTranc: (state, action) => {
      state.expensedetails = state.expensedetails.filter(
        (detail) => detail.id !== action.payload
      );
      localStorage.setItem(
        "trancDetails",
        JSON.stringify(state.expensedetails)
      );
    },
  },
  editTranc: (state, action) => {
    state.expensedetails = state.expensedetails.map((expense) =>
      expense.id === action.payload
        ? console.log(state.expensedetails)
        : expense
    );
  },
});
export default expenseSlice.reducer;
export const { income, deleteTranc, editTranc } = expenseSlice.actions;
