import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import { postExpense } from "../lib/axios/getdetails";
import { useDispatch } from "react-redux";
import { useTracker } from "../utils/hooks/userContext";
import { userThunk } from "../Featuers/ExpenseTrackerApp/Expenseslice";
import { updateExpense } from "../lib/axios/getdetails";

const FormPage = () => {
  const initial = {
    id: 1,
    expense: "",
    money: "",
    date: "",
    trancation: "",
    type: "",
    user_name: null,
  };
  const { category } = useParams();
  const [amount, setAmount] = useState(initial);
  const { users, edit, setEdit } = useTracker();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            dispatch(userThunk(users.loginName));
            navigate("/addExpense");
          })
          .catch((err) => console.log(err));
      } else {
        await updateExpense(amount, edit.id)
          .then((res) => {
            setAmount(initial);
            setEdit(null);
            dispatch(userThunk(users.loginName));
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
            onChange={(e) => setAmount({ ...amount, date: e.target.value })}
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
                  user_name: users.loginName,
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
