import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Transaction from "./TransactionsPage";

const AddExpense = () => {
  const navigate = useNavigate();
  const lastAdd = useSelector((store) => store.expenseTracker.expensedetails);
  return (
    <div className="">
      <div className="flex mt-2">
        <button
          onClick={() => navigate("/addExpense/income")}
          className="flex-1 ml-9 h-6 box-shade border-none bg-income"
        >
          <FaFileInvoiceDollar className="bg-green font-thin" />
          <h5 className="font-thin">Add income</h5>
        </button>
        <button
          onClick={() => navigate("/addExpense/expense")}
          className="flex-1 mr-9 h-6 box-shade border-none bg-expense"
        >
          <FaFileInvoiceDollar className="bg-red font-thin" />
          <h5 className="font-thin">Add expense</h5>
        </button>
      </div>
      <h1>Last Added</h1>
      {lastAdd?.map((add) => (
        <Transaction datas={add} key={add.id} />
      ))}
    </div>
  );
};
export default AddExpense;
