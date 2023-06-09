import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../lib/axios/server";

const initialState = {
  expensedetails: [],
  isLoading: false,
  isError: false,
};
console.log(initialState);
const fetcher = async () => {
  const res = await server.get("/usersExpense");
  return await res.data;
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
  reducers: {
    editTranc: (state, action) => {
      state.expensedetails.map((expense) =>
        expense.id === action.payload.id ? console.log(action.payload) : expense
      );
    },
    userDetails: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.fulfilled, (state, action) => {
        const users = JSON.parse(localStorage.getItem("users"));
        state.expensedetails = action.payload
          .reverse()
          .filter((load) => load.user.email === users.email);
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
export const { editTranc, userDetails } = expenseSlice.actions;
