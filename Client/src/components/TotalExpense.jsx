import { useEffect } from "react";
import Expenses from "./Expenses";

const TotalExpense = ({ expenseData, setCash, cash }) => {
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
    <div className="grid mar-total just ">
      <div className="flex">
        <div
          className={`${
            cash.total > 0 ? "income" : "expense"
          } box-total flex flex-dir flex-1 mar-to just `}
        >
          <h3>Total balance</h3>
          {cash.total && <h1>₹{cash?.total}.00 Rs</h1>}
        </div>
      </div>
      <Expenses income={cash.income} expense={cash.expense} />
    </div>
  );
};

export default TotalExpense;
