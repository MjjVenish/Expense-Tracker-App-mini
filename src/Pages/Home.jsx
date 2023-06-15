import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../lib/axios/getdetails";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";
import Transaction from "../components/Transactions";
import {
  BsFileEarmarkArrowDownFill,
  BsFileEarmarkArrowUpFill,
} from "../Icons/icons";

const HomePage = () => {
  const balance = useSelector((store) => store.expenseTracker.expensedetails);
  const [cash, setCash] = useState({ income: 0, expense: 0, total: 0 });
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const income = balance
      ?.filter((bal) => bal.type === "income")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc, 0);

    const expense = balance
      ?.filter((bal) => bal.type === "expense")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc, 0);

    const total = income - expense;
    setCash({ total, income, expense });
  }, [balance]);
  useEffect(() => {
    getUsers().then(({ data }) => data.map((user) => setUsers(user)));
  }, []);
  useEffect(() => {
    if (users) dispatch(userThunk(users));
  }, [users]);
  return (
    <div className="h-full">
      <div>
        <h3>Total balance</h3>
        <h1>{cash.total}</h1>
        <div>
          <BsFileEarmarkArrowUpFill />
          <h4>Income</h4>
          <h3>{cash.income}</h3>
        </div>
        <div>
          <BsFileEarmarkArrowDownFill />
          <h4>Expense</h4>
          <h3>{cash.expense}</h3>
        </div>
        <h4>Expense</h4>
      </div>
      <h1>Transactions</h1>
      {balance?.map((money) => (
        <Transaction key={money.id} datas={money} />
      ))}
    </div>
  );
};
export default HomePage;
