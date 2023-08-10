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
    <div className="h-fit">
      <>
        <h1 className="captlized">{category}</h1>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="date"
            id="date"
            value={amount?.date}
            onChange={(e) =>
              setAmount({ ...amount, addTime: getTime(), date: e.target.value })
            }
          />
          <label htmlFor="">
            {category[0].toUpperCase() + category.slice(1)} Titile
            <input
              type="text"
              id="expenses"
              value={amount?.expense}
              onChange={(e) =>
                setAmount({ ...amount, id: uuid(), expense: e.target.value })
              }
            />
          </label>
          <label htmlFor="money">
            Amount
            <input
              type="number"
              id="money"
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
          </label>
          <label htmlFor="">
            trancation
            <input
              type="radio"
              name="tranc"
              id="cash"
              value={"Cash"}
              onChange={(e) =>
                setAmount({ ...amount, trancation: e.target.value })
              }
            />
            <label htmlFor="cash">Cash</label>
            <input
              type="radio"
              name="tranc"
              id="upi"
              value={"UPI"}
              onChange={(e) =>
                setAmount({ ...amount, trancation: e.target.value })
              }
            />
            <label htmlFor="upi">UPI</label>
            <input
              type="radio"
              name="tranc"
              id="other"
              value={"Others"}
              onChange={(e) =>
                setAmount({ ...amount, trancation: e.target.value })
              }
            />
            <label htmlFor="other">Others</label>
          </label>
          <input type="submit" value={edit ? "Update" : `Add ${category}`} />
        </form>
      </>
    </div>
  );
};
export default FormPage;
