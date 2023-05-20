import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../home";
import AddExpense from "../AddExpense";
import ExpenceDetails from "../ExpenseDetails";
import ProfilePage from "../Profile";
import FormPage from "../formPage";
import LoginPage from "../loginPage";

const AppRoutesExpense = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addExpense/:category" element={<FormPage />} />
      <Route path="/addExpense" element={<AddExpense />} />
      <Route path="/details" element={<ExpenceDetails />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
export default AppRoutesExpense;
