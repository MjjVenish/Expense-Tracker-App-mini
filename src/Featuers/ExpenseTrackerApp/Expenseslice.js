import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../lib/axios/server";

const initialState = {
  expensedetails: [],
  isLoading: false,
  isError: false,
};

const fetcher = async (url) => {
  const res = await server.get(`/usersExpense`);
  const data = await res.data;
  return data.filter((details) => details.user.email === url.email);
};
const deleteExpense = async (id) => await server.delete(`/usersExpense/${id}`);

const postExpense = async (body) => await server.post(`/usersExpense`, body);

const editExpense = async ({ id, ...body }) =>
  await server.put(`/usersExpense/${id}`, body);

export const userThunk = createAsyncThunk("getUsers", fetcher);
export const deleteThunkData = createAsyncThunk("deleteUsers", deleteExpense);
export const postThunkData = createAsyncThunk("postExpense", postExpense);
export const editThunkData = createAsyncThunk("editExpense", editExpense);

const expenseSlice = createSlice({
  name: "expenseSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.fulfilled, (state, action) => {
        state.expensedetails = action.payload.reverse();
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
