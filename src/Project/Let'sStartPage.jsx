import React from "react";
import { useNavigate } from "react-router-dom";

const LetsStartPage = () => {
  const navigate = useNavigate();
  const names = JSON.parse(localStorage.getItem("users"));
  return (
    <div className="grid just-algin bg-parent h-full">
      <div className="mt-2">
        <h1 className="captlized text-alin">Hi {names?.username}</h1>
      </div>
      <div className=" bg-gray text-alin rounded p-2 ">
        <img
          src="https://openclipart.org/image/800px/306469"
          alt=""
          className="w-h-200px"
        />
      </div>
      <div>
        <h1>Save your money with Expense Tracker</h1>
        <p>
          Save money! the more your money works for you,thr less you have to
          work for money
        </p>
      </div>
      <div className="text-alin mt-2">
        <button
          onClick={() => navigate("/addExpense")}
          className="px py rounded-2 bg-but border-none"
        >
          Let's Start
        </button>
      </div>
    </div>
  );
};
export default LetsStartPage;
