import { memo } from "react";
import SetIcons from "./SetIcons";
import { useNavigate } from "react-router-dom";

const Transaction = ({ datas }) => {
  const navigate = useNavigate();
  const handleSingle = (id) => {
    console.log(id);
    navigate(`/singleTranc/${id}`);
  };
  return (
    <div
      className={`flex hover-${datas.type}`}
      onClick={() => handleSingle(datas.id)}
    >
      <div className="flex-1 effect">
        <SetIcons title={datas.expense} />
        <h3>{datas.expense}</h3>
        <p>{datas.date}</p>
      </div>
      <div className="flex-1">
        <h2 className={datas.type}>
          ₹{datas.type === "income" ? "+" : "-"}
          {datas.money}.00
        </h2>
        <h3>{datas?.addtime}</h3>
      </div>
    </div>
  );
};
export default memo(Transaction);
