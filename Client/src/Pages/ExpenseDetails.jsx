import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { FcDeleteDatabase, FcEditImage } from "../Icons/icons";
import { useTracker } from "../utils/hooks/userContext";
import { useEffect, useState } from "react";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";
import { deleteExpense } from "../lib/axios/getdetails";
import DeleteOption from "../components/DeleteOption";
import TotalExpense from "../components/TotalExpense";

const userToken = localStorage.getItem("token");

const ExpenceDetails = () => {
  const expenseData = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const [cash, setCash] = useState({ income: 0, expense: 0, total: 0 });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { editExpense } = useTracker();
  const [options, setOptions] = useState({
    message: "Are You Sure Delete This Transcation",
    choice: false,
    id: "",
    use: "Delete",
  });

  useEffect(() => {
    dispatch(userThunk());
  }, []);

  const handleEdit = (tranc) => {
    editExpense(tranc);
    navigate(`/addExpense/${tranc.type}`);
  };

  const handleOption = async (value) => {
    if (value) {
      await deleteExpense(options.id).then((result) => {
        dispatch(userThunk());
      });
      setOptions({ ...options, id: "", choice: false });
    } else setOptions({ ...options, id: "", choice: false });
  };

  const handleDelete = (id) => {
    setOptions({ ...options, choice: true, id });
  };
  return (
    <div className="h-fit flex-3">
      {userToken ? (
        options.choice ? (
          <DeleteOption options={options} handleOption={handleOption} />
        ) : (
          <>
            <TotalExpense
              expenseData={expenseData}
              setCash={setCash}
              cash={cash}
            />
            <ul className="grid grid-col gap">
              {expenseData?.map((tranc) => (
                <li
                  key={tranc.id}
                  className={`captlized list-none flex flex-dir border text-center w-56 just ${
                    tranc.type === "income" ? "bg-g" : "bg-r"
                  }`}
                >
                  <div className="flex just">
                    <h3>{tranc?.expense}--</h3>
                    <h3 className={tranc?.type + `-lab`}>
                      ₹{tranc.type === "income" ? "" : "-"}
                      {tranc?.money}.00 Rs
                    </h3>
                  </div>
                  <p>Date:{tranc?.date}</p>
                  <div className="flex just details-but">
                    <button onClick={() => handleEdit(tranc)}>
                      <FcEditImage /> Edit
                    </button>
                    <button onClick={() => handleDelete(tranc.id)}>
                      <FcDeleteDatabase /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};
export default ExpenceDetails;
