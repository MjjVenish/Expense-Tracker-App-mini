import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FcEditImage, FcDeleteDatabase } from "react-icons/fc";
import { deleteTranc, editTranc } from "../app/Expenseslice";
import { useNavigate } from "react-router-dom";

const ExpenceDetails = () => {
  const transactions = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleEdit = (tranc) => {
    navigate(`/addExpense/${tranc.type}`);
    dispatch(editTranc(tranc.id));
  };
  return (
    <div>
      <ul>
        {transactions.map((tranc) => (
          <li key={tranc.id} className="captlized">
            <div>
              <h3>{tranc?.category}</h3>
              <p>{tranc?.date}</p>
            </div>
            <div>
              <FcEditImage onClick={() => handleEdit(tranc)} />
              <FcDeleteDatabase
                onClick={() => dispatch(deleteTranc(tranc.id))}
              />
            </div>
            <h5 className={tranc.type}>
              ${tranc.type === "income" ? "+" : "-"}
              {tranc?.money}
            </h5>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ExpenceDetails;
