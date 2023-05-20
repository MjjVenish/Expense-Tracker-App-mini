import React from "react";
import { useNavigate } from "react-router-dom";

const LetsStartPage = () => {
  const navigate = useNavigate();
  const names = JSON.parse(localStorage.getItem("users"));
  return (
    <div>
      <div>
        <h1 className="captlized">Hi {names?.username}</h1>
      </div>
      <div>
        <img src="https://openclipart.org/image/800px/306469" alt="" />
      </div>
      <div>
        <h1>Save your money with Expense Tracker</h1>
        <p>
          Save money! the more your money works for you,thr less you have to
          work for money
        </p>
      </div>
      <div>
        <button onClick={() => navigate("/addExpense")}>Let's Start</button>
      </div>
    </div>
  );
};
export default LetsStartPage;
