import { useNavigate } from "react-router-dom";
import money from "../assets/image/money.png";

const LetsStartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="grid just bg-parent h-fit">
      <div className="mt-2">
        <h1 className="captlized text-alin">Hi Welcome</h1>
      </div>
      <div className=" bg-gray text-center rounded p-2 ">
        <img src={money} alt="" className="w-h-200px" />
      </div>
      <div className="text-center welcome">
        <h1>Save your money with Expense Tracker</h1>
        <p>
          Save money! the more your money works for you,thr less you have to
          work for money
        </p>
      </div>
      <div className="text-alin mt-2">
        <button
          onClick={() => {
            navigate("/addExpense");
          }}
          className="px py rounded-2 bg-but border-none"
        >
          Let's Start
        </button>
      </div>
    </div>
  );
};
export default LetsStartPage;
