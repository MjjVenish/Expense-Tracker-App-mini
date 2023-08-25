import { memo } from "react";
import SetIcons from "./SetIcons";
import { useNavigate } from "react-router-dom";

const Transaction = ({ datas }) => {
  const getDate = new Date(datas.date);
  const dayOfWeek = getDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const navigate = useNavigate();
  const handleSingle = (id) => {
    navigate(`/singleTranc/${id}`);
  };
  return (
    <div
      className={`flex hover-${datas.type}  captlized margin-tranc`}
      onClick={() => handleSingle(datas.id)}
    >
      <div className="flex-1 effect">
        <div className="flex item-center">
          <SetIcons title={datas.expense} />
          <h3 className="gap-ex">{datas.expense}</h3>
        </div>
        <p>
          Date: {datas.date} {dayOfWeek}
        </p>
      </div>
      <div className="flex-1 flex flex-dir align-end">
        <h2
          className={`${datas.type === "income" ? "income-rs" : "expense-rs"}`}
        >
          ₹{datas.type === "income" ? "" : "-"}
          {datas.money}.00 Rs
        </h2>
        <h3 style={{ color: "#fff" }}>Time:{datas?.addtime}</h3>
      </div>
    </div>
  );
};
export default memo(Transaction);
