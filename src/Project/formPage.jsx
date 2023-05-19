import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import { income, deleteTranc } from "../app/Expenseslice";

const initial = {
  id: 1,
  category: "",
  money: "",
  date: "",
  trancation: "",
  type: "",
};
const FormPage = () => {
  // const editTrancsation = useSelector((store) => store.expenseTracker.edit);
  const { category } = useParams();
  const [amount, setAmount] = useState(initial);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setAmount(editTrancsation);
  // }, [editTrancsation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      amount.category.length &&
      amount.date.length &&
      amount.trancation.length > 0
    ) {
      setAmount(initial);
      navigate("/details");
      dispatch(income(amount));
    }
  };
  return (
    <div>
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
              setAmount({ ...amount, money: e.target.value, type: category })
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
      {/* <button onClick={() => localStorage.removeItem("trancDetails")}>
        delete
      </button> */}
    </div>
  );
};
export default FormPage;
