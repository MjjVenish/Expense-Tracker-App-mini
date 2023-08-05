import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Transaction from "../components/Transactions";
import {
  BsFileEarmarkArrowDownFill,
  BsFileEarmarkArrowUpFill,
} from "../Icons/icons";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";
import { useTracker } from "../utils/hooks/userContext";

const HomePage = () => {
  const { expenseData } = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const [cash, setCash] = useState({ income: 0, expense: 0, total: 0 });
  const { users } = useTracker();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userThunk(users?.loginName));
  }, []);

  useEffect(() => {
    const income = expenseData
      ?.filter((bal) => bal.type === "income")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc, 0);

    const expense = expenseData
      ?.filter((bal) => bal.type === "expense")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc, 0);

    const total = income - expense;
    setCash({ total, income, expense });
  }, [expenseData]);

  return (
    <div className="h-full">
      <div>
        <h3>Total balance</h3>
        {cash.total && <h1>₹{cash?.total}</h1>}
        <div>
          <BsFileEarmarkArrowUpFill />
          <h4>Income</h4>
          <h3>₹{cash.income}</h3>
        </div>
        <div>
          <BsFileEarmarkArrowDownFill />
          <h4>Expense</h4>
          <h3>₹{cash.expense}</h3>
        </div>
        <h4>Expense</h4>
      </div>
      <h1>Transactions</h1>
      {expenseData?.map((money) => (
        <Transaction key={money.id} datas={money} />
      ))}
    </div>
  );
};
export default HomePage;
