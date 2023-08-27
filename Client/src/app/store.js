import { configureStore } from "@reduxjs/toolkit";
import Expenseslice from "../Featuers/ExpenseTrackerApp/Expenseslice";

const store = configureStore({
  reducer: {
    expenseTracker: Expenseslice,
  },
});
export default store;
