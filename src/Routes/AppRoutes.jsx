import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import FormPage from "../components/Form";
import LetsStartPage from "../components/Start";
import SettingPage from "../Pages/Setting";
import SuspenseWrapper from "../container/SuspenseWrapper";
import PageWrapper from "../container/PageWrapper";
const HomePage = lazy(() => import("../Pages/Home"));
const AddExpense = lazy(() => import("../Pages/AddExpense"));
const ExpenceDetails = lazy(() => import("../Pages/ExpenseDetails"));
const ProfilePage = lazy(() => import("../Pages/Profile"));
const LoginPage = lazy(() => import("../Pages/Login"));
const Overview = lazy(() => import("../Pages/Overview"));
const Register = lazy(() => import("../Pages/Register"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SuspenseWrapper>
            <PageWrapper>
              <HomePage />
            </PageWrapper>
          </SuspenseWrapper>
        }
      />
      <Route path="/addExpense/:category" element={<FormPage />} />
      <Route
        path="/addExpense"
        element={
          <SuspenseWrapper>
            <PageWrapper>
              <AddExpense />
            </PageWrapper>
          </SuspenseWrapper>
        }
      />
      <Route
        path="/details"
        element={
          <SuspenseWrapper>
            <PageWrapper>
              <ExpenceDetails />
            </PageWrapper>
          </SuspenseWrapper>
        }
      />
      <Route
        path="/profile"
        element={
          <SuspenseWrapper>
            <PageWrapper>
              <ProfilePage />
            </PageWrapper>
          </SuspenseWrapper>
        }
      />
      <Route
        path="/login"
        element={
          <SuspenseWrapper>
            <LoginPage />
          </SuspenseWrapper>
        }
      />
      <Route path="/lets" element={<LetsStartPage />} />
      <Route
        path="/overview"
        element={
          <SuspenseWrapper>
            <PageWrapper>
              <Overview />
            </PageWrapper>
          </SuspenseWrapper>
        }
      />
      <Route path="/profile/setting" element={<SettingPage />} />
      <Route
        path="/register"
        element={
          <SuspenseWrapper>
            <Register />
          </SuspenseWrapper>
        }
      />
    </Routes>
  );
};
export default AppRoutes;
