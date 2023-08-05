import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { FcDeleteDatabase, FcEditImage } from "../Icons/icons";
import { useTracker } from "../utils/hooks/userContext";
import { useEffect, useState } from "react";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";
import { deleteExpense } from "../lib/axios/getdetails";
import DeleteOption from "../components/DeleteOption";

const userToken = localStorage.getItem("token");

const ExpenceDetails = () => {
  const { expenseData } = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, editExpense } = useTracker();
  const [options, setOptions] = useState({
    message: "Are You Sure Delete This Transcation",
    choice: false,
    id: "",
  });

  useEffect(() => {
    dispatch(userThunk(users?.loginName));
  }, []);

  const handleEdit = (tranc) => {
    editExpense(tranc);
    navigate(`/addExpense/${tranc.type}`);
  };

  const handleOption = async (value) => {
    if (value) {
      await deleteExpense(options.id).then((result) => {
        dispatch(userThunk(users?.loginName));
      });
      setOptions({ ...options, id: "", choice: false });
    } else setOptions({ ...options, id: "", choice: false });
  };

  const handleDelete = (id) => {
    setOptions({ ...options, choice: true, id });
  };
  return (
    <div className="h-full">
      {userToken ? (
        <>
          <ul>
            {expenseData?.map((tranc) => (
              <li key={tranc.id} className="captlized">
                <div>
                  <h3>{tranc?.expense}</h3>
                  <p>{tranc?.date}</p>
                </div>
                <div>
                  <FcEditImage onClick={() => handleEdit(tranc)} />
                  <FcDeleteDatabase
                    onClick={() => {
                      handleDelete(tranc.id);
                    }}
                  />
                </div>
                <h5 className={tranc?.type}>
                  ₹{tranc.type === "income" ? "+" : "-"}
                  {tranc?.money}
                </h5>
              </li>
            ))}
          </ul>
          {options.choice && (
            <DeleteOption options={options} handleOption={handleOption} />
          )}
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};
export default ExpenceDetails;
