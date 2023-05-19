import React from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/addExpense/income")}>
        <FaFileInvoiceDollar />
        <h5>Add income</h5>
      </button>
      <button onClick={() => navigate("/addExpense/expense")}>
        <FaFileInvoiceDollar />
        <h5>Add expense</h5>
      </button>
    </div>
  );
};
export default AddExpense;
