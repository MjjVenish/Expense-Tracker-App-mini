import { memo } from "react";

const Transaction = ({ datas }) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <h3>{datas.expense}</h3>
        <p>{datas.date}</p>
      </div>
      <div className="flex-1">
        <h2 className={datas.type}>
          ₹{datas.type === "income" ? "+" : "-"}
          {datas.money}
        </h2>
        <h3>{datas.time_only}</h3>
      </div>
    </div>
  );
};
export default memo(Transaction);
