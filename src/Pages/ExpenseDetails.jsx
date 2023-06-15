import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteThunkData,
  userThunk,
} from "../Featuers/ExpenseTrackerApp/Expenseslice";
import { Navigate, useNavigate } from "react-router-dom";
import { getUsers } from "../lib/axios/getdetails";
import { FcDeleteDatabase, FcEditImage } from "../Icons/icons";
import useTracker from "../hooks/CustomHook";

const users = JSON.parse(localStorage.getItem("users"));

const ExpenceDetails = () => {
  const { editTrancation } = useTracker();
  const transactions = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usersdata, setUsersdata] = useState(null);
  useEffect(() => {
    getUsers().then(({ data }) => data.map((user) => setUsersdata(user)));
  }, []);
  useEffect(() => {
    if (usersdata) dispatch(userThunk(usersdata));
  }, [usersdata]);

  const handleEdit = (tranc) => {
    editTrancation(tranc);
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
                      dispatch(userThunk(usersdata));
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
