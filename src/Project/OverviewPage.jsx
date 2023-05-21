import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BsFileEarmarkArrowUpFill,
  BsFileEarmarkArrowDownFill,
} from "react-icons/bs";
import Transaction from "./TransactionsPage";
import { Navigate } from "react-router-dom";

const Overview = () => {
  const transation = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const [balance, setBalnce] = useState({ income: 0, expense: 0 });
  const [types, setTypes] = useState(transation);
  const users = JSON.parse(localStorage.getItem("users"));
  useEffect(() => {
    const income = transation
      ?.filter((bal) => bal.type === "income")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc);

    const expense = transation
      ?.filter((bal) => bal.type === "expense")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc);
    setBalnce({ income, expense });
  }, [transation]);
  const filterOption = (val) => {
    const typeOf = transation.filter((tranc) => tranc.type === val);
    setTypes(typeOf);
  };
  return (
    <div>
      {users ? (
        <>
          {" "}
          <div>
            <h3>Total Income</h3>
            <div>
              <BsFileEarmarkArrowDownFill />
              <h2>{balance.income}</h2>
            </div>
          </div>
          <div>
            <h3>Total Expense</h3>
            <div>
              <BsFileEarmarkArrowUpFill />
              <h2>{balance.expense}</h2>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                filterOption("income");
              }}
            >
              Income
            </button>
            <button onClick={() => filterOption("expense")}>Expense</button>
          </div>
          {types?.map((type) => (
            <Transaction datas={type} key={type.id} />
          ))}
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};
export default Overview;
