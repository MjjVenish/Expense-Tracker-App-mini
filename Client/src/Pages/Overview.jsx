import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Transaction from "../components/Transactions";
import { Navigate } from "react-router-dom";
import {
  BsFileEarmarkArrowDownFill,
  BsFileEarmarkArrowUpFill,
} from "../Icons/icons";
import { useTracker } from "../utils/hooks/userContext";
import { overViewData, searchItem } from "../lib/axios/getdetails";

const userToken = localStorage.getItem("token");

const Overview = () => {
  const { expenseData } = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const [balance, setBalnce] = useState({ income: 0, expense: 0 });
  const { users } = useTracker();
  const [isData, setIsData] = useState([]);
  const [search, setSearch] = useState({ data: "", data: "" });

  const handleChange = (e) => {
    const requsetData = {
      option: "date",
      user_name: users.loginName,
      value: e.target.value,
    };
    setSearch({ ...search, date: e.target.value });
    overViewData(requsetData).then((res) => setIsData(res.datas));
  };

  const handleSearch = (e) => {
    const reqData = { data: e.target.value, user_name: users.loginName };
    const quaryString = new URLSearchParams(reqData).toString();
    searchItem(quaryString).then((result) => {
      const { items } = result.data;
      setIsData(items);
    });
    setSearch({ ...search, data: e.target.value });
  };

  const filterButton = (type, value) => {
    const requsetData = { option: type, user_name: users.loginName, value };
    overViewData(requsetData).then((res) => setIsData(res.datas));
  };
  useEffect(() => {
    setIsData(expenseData);
  }, []);

  useEffect(() => {
    const income = isData
      ?.filter((bal) => bal.type === "income")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc, 0);

    const expense = isData
      ?.filter((bal) => bal.type === "expense")
      ?.map((tran) => Number(tran.money))
      ?.reduce((cur, acc) => cur + acc, 0);
    setBalnce({ income, expense });
  }, [isData]);

  return (
    <div className="h-full">
      {userToken ? (
        <>
          <div>
            <h3>Total Income</h3>
            <div>
              <BsFileEarmarkArrowDownFill />
              <h2>₹{balance.income}</h2>
            </div>
          </div>
          <div>
            <h3>Total Expense</h3>
            <div>
              <BsFileEarmarkArrowUpFill />
              <h2>₹{balance.expense}</h2>
            </div>
          </div>
          <div>
            <button onClick={() => filterButton("type", "income")}>
              Income
            </button>
            <button onClick={() => filterButton("type", "expense")}>
              Expense
            </button>
            <button onClick={() => filterButton("trancation", "UPI")}>
              UPI
            </button>
            <button onClick={() => filterButton("trancation", "Cash")}>
              Cash
            </button>
            <button onClick={() => filterButton("trancation", "Others")}>
              Others
            </button>
            <input type="date" value={search.data} onChange={handleChange} />
            <input
              type="search"
              value={search.data}
              onChange={handleSearch}
              placeholder="search....."
            />
          </div>
          {isData?.map((type) => (
            <Transaction datas={type} key={type.id} />
          ))}
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};
export default Overview;
