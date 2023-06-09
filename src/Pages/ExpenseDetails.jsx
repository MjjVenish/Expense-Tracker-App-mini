import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  editTranc,
  deleteThunkData,
  userThunk,
} from "../Featuers/ExpenseTrackerApp/Expenseslice";
import { Navigate, useNavigate } from "react-router-dom";
import { FcDeleteDatabase, FcEditImage } from "../Icons/icons";

const users = JSON.parse(localStorage.getItem("users"));

const ExpenceDetails = () => {
  const transactions = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(userThunk());
  }, []);

  const handleEdit = (tranc) => {
    dispatch(editTranc(tranc));
    navigate(`/addExpense/${tranc.type}`);
  };
  return (
    <div className="h-full">
      {users ? (
        <>
          <ul>
            {transactions?.map((tranc) => (
              <li key={tranc.id} className="captlized">
                <div>
                  <h3>{tranc?.category}</h3>
                  <p>{tranc?.date}</p>
                </div>
                <div>
                  <FcEditImage onClick={() => handleEdit(tranc)} />
                  <FcDeleteDatabase
                    onClick={() => {
                      dispatch(deleteThunkData(tranc.id));
                      dispatch(userThunk());
                    }}
                  />
                </div>
                <h5 className={tranc?.type}>
                  ${tranc.type === "income" ? "+" : "-"}
                  {tranc?.money}
                </h5>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};
export default ExpenceDetails;
