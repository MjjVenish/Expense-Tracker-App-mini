import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "../Icons/icons";

const GoBack = ({ color }) => {
  const navigate = useNavigate();
  return (
    <FaArrowAltCircleLeft
      className={`absolute font-icon ${color && "bg-b"}`}
      onClick={() => navigate("/addExpense")}
    />
  );
};

export default GoBack;
