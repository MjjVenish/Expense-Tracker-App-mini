import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../lib/axios/server";

const initialState = {
  expensedetails: [],
  isLoading: false,
  isError: false,
  user: null,
};

const fetcher = async (name) => {
  const res = await server.get(`/getExpense/${name}`);
  const data = await res.data;
  return data;
};

export const userThunk = createAsyncThunk("getExpenseDp", fetcher);

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.fulfilled, (state, action) => {
        state.expensedetails = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(userThunk.pending, (state, action) => {
        state.expensedetails = [];
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(userThunk.rejected, (state, action) => {
        state.expensedetails = [];
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default expenseSlice.reducer;
