import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingle } from "../lib/axios/getdetails";
import { searchItem } from "../lib/axios/getdetails";
import { useSelector } from "react-redux";
import GoBack from "../components/GoBack";

const SinglePage = () => {
  const { id } = useParams();
  const users = useSelector((store) => store.expenseTracker.user);
  const [singleData, setSingleData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getSingle(id).then((res) => {
      const { datas } = res.data;
      setSingleData(datas);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqData = { data: search, user_id: users.id };
    const quaryString = new URLSearchParams(reqData).toString();
    searchItem(quaryString)
      .then((res) => {
        const { items } = res.data;
        console.log(items[0]);
        if (items[0]) {
          setSingleData(items);
        }
        setSearch("");
      })
      .catch((err) => console.error(err));
  };
  console.log(singleData);
  return (
    <div className="single-tranc h-fit">
      <div>
        <div className="flex just-arrond pad-ser">
          <div></div>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the Expenses............"
            />
            <input type="submit" value={"Search"} className="sin-ser" />
          </form>
        </div>
        <div className="flex just-arrond ">
          {singleData.map((data, i) => (
            <div
              key={i}
              className={`sig-box text-center flex flex-dir just  text-white captlized ${
                data.type === "income" ? "gre-sig" : "red-sig"
              }`}
            >
              <h1 className=" ">{data.expense}</h1>
              <h2>Date of Trancation:{data.date}</h2>
              <h3>Rupee:₹{data.money}.00</h3>
              <h3>trnscaction type:{data.trancation}</h3>
              <h3>Expense Type:{data.type}</h3>
            </div>
          ))}
          <div></div>
        </div>
      </div>
      <GoBack color={"o3rur39"} />
    </div>
  );
};

export default SinglePage;
