import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Transaction from "../components/Transactions";
import { Navigate } from "react-router-dom";
import { overViewData, searchItem } from "../lib/axios/getdetails";
import Expenses from "../components/Expenses";
import { FcSearch } from "../Icons/icons";

const userToken = localStorage.getItem("token");

const Overview = () => {
  const expenseData = useSelector(
    (store) => store.expenseTracker.expensedetails
  );
  const users = useSelector((store) => store.expenseTracker.user);

  const [balance, setBalnce] = useState({ income: 0, expense: 0 });
  const [isData, setIsData] = useState([]);
  const [search, setSearch] = useState({ data: "", data: "" });

  const handleChange = (e) => {
    const requsetData = {
      option: "date",
      user_id: users.id,
      value: e.target.value,
    };
    setSearch({ ...search, date: e.target.value });
    overViewData(requsetData).then((res) => setIsData(res.datas));
  };

  const handleSearch = (e) => {
    const reqData = { data: e.target.value, user_id: users.id };
    const quaryString = new URLSearchParams(reqData).toString();
    searchItem(quaryString).then((result) => {
      const { items } = result.data;
      setIsData(items);
    });
    setSearch({ ...search, data: e.target.value });
  };

  const filterButton = (type, value) => {
    const requsetData = { option: type, user_id: users.id, value };
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
    <div className=" flex-3 flex just">
      {userToken ? (
        <div className="mar-total">
          <Expenses income={balance.income} expense={balance.expense} />
          <div className="flex border flex-dir just wh-filter">
            <div className="relative">
              <FcSearch className="absolute search-icon" />
              <input
                type="search"
                className="search-input"
                value={search.data}
                onChange={handleSearch}
                placeholder="Search your Expenses........."
              />
            </div>
            <div>
              <h1 style={{ color: "#fff" }}>Filter Options</h1>
            </div>
            <div className="">
              <button
                className="fill-but"
                onClick={() => filterButton("type", "income")}
              >
                Income
              </button>
              <button
                className="fill-but"
                onClick={() => filterButton("type", "expense")}
              >
                Expense
              </button>
              <button
                className="fill-but"
                onClick={() => filterButton("trancation", "UPI")}
              >
                UPI
              </button>
              <button
                className="fill-but"
                onClick={() => filterButton("trancation", "Cash")}
              >
                Cash
              </button>
              <button
                className="fill-but"
                onClick={() => filterButton("trancation", "Others")}
              >
                Others
              </button>
              <input
                className="fill-but"
                type="date"
                value={search.data}
                onChange={handleChange}
              />
            </div>
          </div>
          {isData?.map((type, index) => (
            <Transaction datas={type} key={index} />
          ))}
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </div>
  );
};
export default Overview;
