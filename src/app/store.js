import { configureStore } from "@reduxjs/toolkit";
import Expenseslice from "./Expenseslice";

const store = configureStore({
  reducer: {
    expenseTracker: Expenseslice,
  },
});
export default store;
