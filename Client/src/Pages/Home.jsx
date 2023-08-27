import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Transaction from "../components/Transactions";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";
import TotalExpense from "../components/TotalExpense";

const HomePage = () => {
  const expenseData = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const [cash, setCash] = useState({ income: 0, expense: 0, total: 0 });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userThunk());
  }, []);

  return (
    <div className="flex-3 grid h-100">
      <TotalExpense expenseData={expenseData} setCash={setCash} cash={cash} />
      <h1 className="m-l" style={{ color: "#fff" }}>
        Transactions
      </h1>
      {expenseData?.map((money) => (
        <Transaction key={money.id} datas={money} />
      ))}
    </div>
  );
};
export default HomePage;
