import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { postThunkData } from "../Featuers/ExpenseTrackerApp/Expenseslice";
import { getUsers } from "../lib/axios/getdetails";

const initial = {
  id: 1,
  category: "",
  money: "",
  date: "",
  trancation: "",
  type: "",
  user: null,
};
const FormPage = () => {
  const { category } = useParams();
  const [amount, setAmount] = useState(initial);
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getUsers().then(({ data }) => data.map((val) => setUsers(val)));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      amount.category.length &&
      amount.date.length &&
      amount.trancation.length > 0
    ) {
      dispatch(postThunkData({ ...amount, user: users }));
      navigate("/details");
      setAmount(initial);
    }
  };
  return (
    <div className="h-full">
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
              onChange={(e) =>
                setAmount({ ...amount, id: uuid(), category: e.target.value })
              }
            />
          </label>
          <label htmlFor="money">
            Amount
            <input
              type="number"
              id="money"
              value={amount.money}
              onChange={(e) =>
                setAmount({
                  ...amount,
                  money: e.target.value,
                  type: category,
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
          <input type="submit" value={`Add ${category}`} />
        </form>
      </>
    </div>
  );
};
export default FormPage;
