import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../home";
import AddExpense from "../AddExpense";
import ExpenceDetails from "../ExpenseDetails";
import ProfilePage from "../Profile";
import FormPage from "../formPage";
import LoginPage from "../loginPage";
import LetsStartPage from "../Let'sStartPage";
import Overview from "../OverviewPage";
import SettingPage from "../SettingPage";

const AppRoutesExpense = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/addExpense/:category" element={<FormPage />} />
      <Route path="/addExpense" element={<AddExpense />} />
      <Route path="/details" element={<ExpenceDetails />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/lets" element={<LetsStartPage />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/profile/setting" element={<SettingPage />} />
    </Routes>
  );
};
export default AppRoutesExpense;
