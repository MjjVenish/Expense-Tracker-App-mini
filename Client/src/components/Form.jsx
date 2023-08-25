import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import { postExpense } from "../lib/axios/getdetails";
import { useDispatch, useSelector } from "react-redux";
import { useTracker } from "../utils/hooks/userContext";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";
import { updateExpense } from "../lib/axios/getdetails";

const FormPage = () => {
  const users = useSelector((store) => store.expenseTracker.user);
  console.log(users);
  const initial = {
    id: 1,
    user_id: null,
    expense: "",
    money: "",
    date: "",
    trancation: "",
    type: "",
    addTime: null,
  };
  const { category } = useParams();
  const [amount, setAmount] = useState(initial);
  const { edit, setEdit } = useTracker();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTime = () => {
    const hour = new Date().getHours();
    const mintius = new Date().getMinutes();
    const sec = new Date().getSeconds();
    const time = `${hour}:${mintius}:${sec}`;
    return time;
  };
  useEffect(() => {
    if (edit) setAmount(edit);
  }, [edit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hvdugudvduvh");
    if (
      amount.expense.length > 0 &&
      amount.date.length > 0 &&
      amount.trancation.length > 0
    ) {
      if (!edit) {
        await postExpense(amount)
          .then((result) => {
            dispatch(userThunk());
            navigate("/addExpense");
          })
          .catch((err) => console.log(err));
        console.log(amount);
      } else {
        await updateExpense(amount, edit.id)
          .then((res) => {
            setAmount(initial);
            setEdit(null);
            dispatch(userThunk());
            navigate("/addExpense");
          })
          .catch((err) => console.log(err));
      }
    }
  };
  return (
    <div className="h-fit border bg-form grid just item-center">
      <div className="absolute" style={{ top: "30px", left: "40px" }}>
        <button className="form-but" onClick={() => navigate("/addExpense")}>
          Back
        </button>
      </div>
      <div className="w-form bg-title just h-form border-white">
        <h1 className="captlized text-center">{category}</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-parent">
            <label htmlFor="date" className="form-label">
              Date*
            </label>
            <br />
            <input
              type="date"
              id="date"
              className="w-from-input "
              value={amount?.date}
              onChange={(e) =>
                setAmount({
                  ...amount,
                  addTime: getTime(),
                  date: e.target.value,
                })
              }
            />
          </div>
          <div className="form-parent">
            <label htmlFor="" className="form-label">
              {category[0].toUpperCase() + category.slice(1)} Titile*
            </label>
            <br />
            <input
              type="text"
              className="w-from-input "
              id="expenses"
              value={amount?.expense}
              onChange={(e) =>
                setAmount({ ...amount, id: uuid(), expense: e.target.value })
              }
            />
          </div>
          <div className="form-parent">
            <label htmlFor="money" className="form-label">
              Amount*
            </label>
            <input
              type="number"
              id="money"
              className="w-from-input "
              value={amount?.money}
              onChange={(e) =>
                setAmount({
                  ...amount,
                  money: e.target.value,
                  type: category,
                  user_id: users.id,
                })
              }
            />
          </div>
          <div className="form-parent">
            <label htmlFor="" className="">
              <label htmlFor="cash" className="radio-space">
                <input
                  type="radio"
                  name="tranc"
                  id="cash"
                  value={"Cash"}
                  onChange={(e) =>
                    setAmount({ ...amount, trancation: e.target.value })
                  }
                />
                Cash
              </label>
              <label htmlFor="upi" className="radio-space">
                <input
                  type="radio"
                  name="tranc"
                  id="upi"
                  value={"UPI"}
                  onChange={(e) =>
                    setAmount({ ...amount, trancation: e.target.value })
                  }
                />
                UPI
              </label>
              <label htmlFor="other" className="radio-space">
                <input
                  type="radio"
                  name="tranc"
                  id="other"
                  value={"Others"}
                  onChange={(e) =>
                    setAmount({ ...amount, trancation: e.target.value })
                  }
                />
                Others
              </label>
            </label>
          </div>
          <div className="flex just con-but">
            <input
              type="submit"
              className={`form-but`}
              value={edit ? "Update" : `Add ${category}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormPage;
