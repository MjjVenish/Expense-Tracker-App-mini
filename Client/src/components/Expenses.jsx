import {
  BsFileEarmarkArrowDownFill,
  BsFileEarmarkArrowUpFill,
} from "../Icons/icons";

const Expenses = ({ income, expense }) => {
  return (
    <div className="flex m-ei">
      <div className="income flex-1 box-total flex flex-dir just">
        <div>
          <BsFileEarmarkArrowUpFill />
        </div>
        <h4>Income</h4>
        <h3>₹{income}.00 Rs</h3>
      </div>
      <div className="expense flex-1 box-total flex flex-dir just m-i">
        <div>
          <BsFileEarmarkArrowDownFill />
        </div>
        <h4>Expense</h4>
        <h3>₹{expense}.00 Rs</h3>
      </div>
    </div>
  );
};

export default Expenses;
