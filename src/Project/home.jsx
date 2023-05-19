import React, { useEffect, useState } from "react";
import {
  BsFileEarmarkArrowUpFill,
  BsFileEarmarkArrowDownFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";

const HomePage = () => {
  const balance = useSelector((store) => store.expenseTracker.expensedetails);
  const [cash, setCash] = useState({ income: 0, expense: 0, total: 0 });
  console.log(balance);
  useEffect(() => {
    const income = balance
      ?.filter((bal) => bal.type === "income")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc);
    setCash({ ...cash, income });

    const expense = balance
      ?.filter((bal) => bal.type === "expense")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc);
    setCash({ ...cash, expense });

    const total = income - expense;
    setCash({ ...cash, total });
  }, []);
  return (
    <div>
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
    </div>
  );
};
export default HomePage;
