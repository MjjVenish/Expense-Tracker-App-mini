import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../lib/axios/server";

const initialState = {
  expensedetails: [],
  user: null,
  isLoading: false,
  isError: false,
};
const fetcher = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3007/getUser", {
    method: "GET",
    headers: { token },
  });
  return await res.json();
};

export const userThunk = createAsyncThunk("getExpenseDp", fetcher);

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.fulfilled, (state, action) => {
        state.expensedetails = action.payload.userExpense;
        state.user = action.payload.loginUser;
        console.log(state.user);
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(userThunk.pending, (state, action) => {
        state.expensedetails = [];
        state.user = null;
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(userThunk.rejected, (state, action) => {
        state.expensedetails = [];
        state.user = null;
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default expenseSlice.reducer;
